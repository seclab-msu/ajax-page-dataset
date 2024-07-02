#!/usr/bin/env python3

import os
import re
import sys
import glob
import json
import asyncio
import argparse
import traceback
import urllib.parse
import shlex
import subprocess
import time

from stats import Stats
from colorprint import red, green

DEFAULT_ANALYZER_PATH = "../js-analyzer"
PAGES_PATH = os.path.join(os.path.dirname(__file__), "pages")
DEBUG = True
ANALYZER_RETRIES = 3
ANALYZER_OUTPUT_START_TIMEOUT = 15
ANALYZER_TIMEOUT = 17 * 60

async def pipe_stderr(initial_data, stream):
    buf = initial_data
    while buf:
        sys.stdout.buffer.write(buf)
        buf = await stream.read(4096)

async def kill_analyzer(analyzer_process):
    print('Killing analyzer with SIGTERM', file=sys.stderr)
    analyzer_process.terminate()
    try:
        await asyncio.wait_for(analyzer_process.wait(), 2)
    except asyncio.TimeoutError:
        print(
            'SIGTERM did not kill analyzer, using SIGKILL',
            file=sys.stderr
        )
        analyzer_process.kill()
        await asyncio.wait_for(analyzer_process.wait(), 5)

async def await_analyzer_output_start(stream):
    buf = b''
    while b'Navigating to URL:' not in buf:
        data = await stream.read(1000)
        buf += data
        if not data and b'Navigating to URL:' not in buf:
            raise Exception(
                "Analyzer did not output 'Navigating to URL:' and died, its "+
                "output was " + buf.decode('utf8', errors='replace')
            )
    return buf

pipe_tasks = set()

async def run_analyzer(page_dir, cmd):
    analyzer_process = await asyncio.create_subprocess_exec(
        *shlex.split(cmd), page_dir,
        stdin=subprocess.DEVNULL,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    try:
        time_started = time.time()
        try:
            stderr_beginning = await asyncio.wait_for(
                await_analyzer_output_start(analyzer_process.stderr),
                timeout=ANALYZER_OUTPUT_START_TIMEOUT
            )
        except asyncio.TimeoutError:
            print(
                'Timed out waiting for the first byte from analyzer',
                file=sys.stderr
            )
            raise

        pipe_stderr_task = asyncio.create_task(
            pipe_stderr(stderr_beginning, analyzer_process.stderr)
        )
        pipe_tasks.add(pipe_stderr_task)
        pipe_stderr_task.add_done_callback(pipe_tasks.discard)

        try:
            output = await asyncio.wait_for(
                analyzer_process.stdout.read(),
                timeout=ANALYZER_TIMEOUT
            )
        except asyncio.TimeoutError:
            print(
                'Timed out waiting for analyzer to output data',
                file=sys.stderr
            )
            raise
        analyzer_deps = json.loads(output)
        analyzer_status = await analyzer_process.wait()
        if analyzer_status != 0:
            print(
                "Analyzer exited with nonzero status for",
                page_dir,
                file=sys.stderr
            )
    finally:
        if analyzer_process.returncode is None:
            print(
                'Analyzer process is still running at the end of run_analyzer()',
                file=sys.stderr
            )
            await kill_analyzer(analyzer_process)
        execution_time = time.time() - time_started

    return analyzer_deps, execution_time

async def run_analyzer_retry(page_dir, cmd):
    r = ANALYZER_RETRIES
    while r:
        try:
            return await run_analyzer(page_dir, cmd)
        except asyncio.TimeoutError:
            print(f'Running analyzer for {page_dir} timed out', file=sys.stderr)
            r -= 1
            if r:
                print(f'will retry ({r} left)', file=sys.stderr)
            else:
                raise

def frozen_keyvalue(x):
    return map(lambda el: list(el.items()), x)

def compare_unordered_keyvalue_ignoreemptyval(reference, found):
    if reference is None:
        return True
    if found is None:
        return False
    for ref_kv in reference:
        is_found = False
        for found_kv in found:
            if found_kv["name"] == ref_kv["name"]:
                if ref_kv["value"] == "" or ref_kv["value"] == found_kv["value"]:
                    if "type" not in ref_kv or ("type" in found_kv and ref_kv["type"] == found_kv["type"]):
                        is_found = True
                        break
        if not is_found:
            return False
    return True

def contains(reference, found):
    if reference is None:
        return True
    for el in reference:
        if el not in found:
            return False
    return True

def match_jsons(reference, found):
    if isinstance(reference, list):
        return match_lists(reference, found)
    elif isinstance(reference, dict):
        return match_dicts(reference, found)
    elif reference is None and found is None:
        return True
    else:
        return match_primitives(reference, found)

def match_lists(reference, found):
    if not isinstance(found, list):
        return False
    if len(reference) != len(found):
        return False
    for r in reference:
        match = False
        for f in found:
            if match_jsons(r, f): # NOTE(asterite): list order is ignored here, but I guess it's OK
                match = True
        if not match:
            return False
    return True

def match_dicts(reference, found):
    if not isinstance(found, dict):
        return False
    if len(reference) != len(found):
        return False
    for k, v in reference.items():
        if k not in found:
            return False
        if not match_jsons(v, found[k]):
            return False
    return True

def match_primitives(reference, found):
    if reference in ['', 0, False]:
        return reference == '' or found == '' or type(reference) is type(found)
    return reference == found


def match_post_data(reference, found):
    if reference is None:
        return True
    if found is None:
        return False

    ref_mime = reference.get('mimeType')

    if ref_mime is not None:
        ref_mime = ref_mime.split('; charset=')[0]

    found_mime = found.get('mimeType')

    if found_mime is not None:
        found_mime = found_mime.split('; charset=')[0]

    if ref_mime != found_mime:
        return False
    ref_params = reference.get('params')
    if ref_params is None:
        if "json" in ref_mime:
            try:
                ref_json = json.loads(reference.get('text'))
                found_json = json.loads(found.get('text'))
            except Exception as e:
                print(e, file=sys.stderr)
                return False
            print(ref_json, found_json)
            return match_jsons(ref_json, found_json)
        return reference.get('text') == found.get('text')
    found_params = found.get('params')
    return compare_unordered_keyvalue_ignoreemptyval(ref_params, found_params)

def match_url_path(ref, found, path_ignore_multislash=False):
    if ref == found:
        return True
    if path_ignore_multislash:
        found = found[:2] + re.sub('/+', '/', found[2:])
    ref_pattern = '^' + re.escape(ref).replace('UNKNOWN', '[^/]*') + '$'
    return re.match(ref_pattern, found) != None

def match_dep(found_dep, reference_dep, dep_attributes):
    if found_dep['method'] != reference_dep['method']:
        return False
    if reference_dep['url']:
        ref_parsed = urllib.parse.urlparse(reference_dep['url'])
        found_parsed = urllib.parse.urlparse(found_dep['url'])
        ref_parsed = ref_parsed._replace(query='', scheme='')
        found_parsed = found_parsed._replace(query='', scheme='')
        path_ignore_multislash = 'path_ignore_multislash' in dep_attributes
        if not match_url_path(ref_parsed.geturl(), found_parsed.geturl(), path_ignore_multislash):
            return False
    qs_matches = compare_unordered_keyvalue_ignoreemptyval(
        reference_dep.get('queryString'),
        found_dep.get('queryString')
    )
    if not qs_matches:
        return False
    if not contains(reference_dep.get('headers'), found_dep.get('headers')):
        return False
    return match_post_data(reference_dep.get('postData'), found_dep.get('postData'))

def have_dep(found_deps, want_dep, dep_attributes=[]):
    for found_dep in found_deps:
        if match_dep(found_dep, want_dep, dep_attributes):
            return True
    return False

run_failed = []

async def check_page_worker(q, stats, cmd):
    while True:
        page_dir, sample_info = await q.get()
        tags = sample_info.get('tags', [])
        reference_deps = sample_info['deps']
        attributes = sample_info.get('attributes', [])

        try:
            analyzer_deps, execution_time = await run_analyzer_retry(page_dir, cmd)
        except Exception:
            global run_failed
            print('failed running on', page_dir, file=sys.stderr)
            traceback.print_exc()
            run_failed.append(page_dir)
            q.task_done()
            continue

        sample_name = page_dir.split('/')[-1]
        stats.save_found(sample_name, len(analyzer_deps))

        for reference_dep in reference_deps:
            dep_found = have_dep(analyzer_deps, reference_dep, attributes)
            stats.inc_total(sample_name, tags)
            stats.store_raw_result(
                sample_name,
                {
                    'method': reference_dep['method'],
                    'url': reference_dep['url'],
                    'postData': reference_dep.get('postData')
                },
                dep_found
            )
            if dep_found:
                stats.succeed(sample_name, tags)
                if DEBUG:
                    print(green("FOUND") + '\t' + reference_dep['method'], reference_dep['url'])
            else:
                all_matched = False
                if DEBUG:
                    print(red("MISSED") + '\t' + reference_dep['method'], reference_dep['url'], reference_dep.get('postData'))

        precision = stats.get_precision(sample_name)
        coverage = stats.get_coverage(sample_name)
        print('Execution time for %s: %s' % (sample_name, time.strftime("%H:%M:%S", time.gmtime(execution_time))))
        if precision == None:
            print('Precision for %s: N/A' % (sample_name))
        else:
            print('Precision for %s: %.2f%%' % (sample_name, precision * 100))
        print('Coverage for %s: %.2f%%' % (sample_name, coverage * 100))

        stats.store_properties(sample_name, {
            'precision': precision,
            'coverage': coverage,
            'time': execution_time,
        })

        q.task_done()

async def check_pages(pages_jsons, n_workers, cmd, tags_stat_cfg):
    samples = []
    for sample_file in pages_jsons:
        page_dir = sample_file[:-5]
        with open(sample_file, encoding='utf8') as f:
            sample_info = json.load(f)
        samples.append((page_dir, sample_info))

    sample_infos = [samp[1] for samp in samples]
    stats = Stats(sample_infos)

    q = asyncio.Queue(20)

    for _ in range(n_workers):
        asyncio.create_task(check_page_worker(q, stats, cmd))

    for page_dir, sample_info in samples:
        await q.put((page_dir, sample_info))

    await q.join()

    if run_failed:
        print('Some of the analyzer processed failed!', run_failed, file=sys.stderr)
        exit(1)

    stats.print_stats(tags_stat_cfg)
    stats.dump_raw_results()

def main():
    parser = argparse.ArgumentParser()

    parser.add_argument('-p', type=int, default=6)
    parser.add_argument(
        '--analyzer-path',
        type=str,
        default=DEFAULT_ANALYZER_PATH
    )
    parser.add_argument(
        '--tag',
        type=str,
        action='append',
        help='Print stats for given tags (use `--tag all` to print all the statistics)'
    )
    parser.add_argument(
        '--cmd',
        type=str,
        help='Command to run on the dataset'
    )
    parser.add_argument('pages', nargs='*')

    args = parser.parse_args()

    if args.tag != None:
        for i, tag in enumerate(args.tag):
            if '+' in tag:
                args.tag[i] = tuple(part.strip() for part in tag.split('+'))

    cmd = f'./run-on-page.sh {args.analyzer_path}'
    if args.cmd != None:
        cmd = args.cmd

    if len(args.pages) == 0:
        pages_jsons = glob.glob(PAGES_PATH + '/*.json')
    else:
        pages_jsons = args.pages[:]
        for i in range(len(pages_jsons)):
            if not pages_jsons[i].endswith('.json'):
                pages_jsons[i] += '.json'
    asyncio.run(check_pages(pages_jsons, args.p, cmd, args.tag))


if __name__ == "__main__":
    main()
