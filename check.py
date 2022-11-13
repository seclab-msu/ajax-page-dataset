#!/usr/bin/env python3

import os
import sys
import glob
import json
import asyncio
import argparse
import urllib.parse
import subprocess

from stats import Stats
from colorprint import red, green

ANALYZER_PATH = "../js-analyzer"
PAGES_PATH = os.path.join(os.path.dirname(__file__), "pages")
DEBUG = True

async def run_analyzer(page_dir):
    analyzer_process = await asyncio.create_subprocess_exec(
        './run-on-page.sh', ANALYZER_PATH, page_dir,
        stdin=subprocess.DEVNULL,
        stdout=subprocess.PIPE,
        stderr=None
    )
    output, _ = await analyzer_process.communicate()
    analyzer_deps = json.loads(output)
    analyzer_status = await analyzer_process.wait()
    if analyzer_status != 0:
        print("Analyzer exited with nonzero status", file=sys.stderr)
    return analyzer_deps

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


def match_dep(found_dep, reference_dep):
    if found_dep['method'] != reference_dep['method']:
        return False
    if reference_dep['url']:
        ref_parsed = urllib.parse.urlparse(reference_dep['url'])
        found_parsed = urllib.parse.urlparse(found_dep['url'])
        ref_parsed = ref_parsed._replace(query='', scheme='')
        found_parsed = found_parsed._replace(query='', scheme='')
        if ref_parsed.geturl() != found_parsed.geturl():
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

def have_dep(found_deps, want_dep):
    for found_dep in found_deps:
        if match_dep(found_dep, want_dep):
            return True
    return False

async def check_page_worker(q, stats):
    while True:
        page_dir, sample_info = await q.get()
        tags = sample_info.get('tags', [])
        stats.inc_app(tags)
        reference_deps = sample_info['deps']
        analyzer_deps = await run_analyzer(page_dir)

        all_matched = True
        for reference_dep in reference_deps:
            stats.inc_dep(tags)
            if have_dep(analyzer_deps, reference_dep):
                stats.succeed_dep(tags)
                if DEBUG:
                    print(green("FOUND") + '\t' + reference_dep['method'], reference_dep['url'])
            else:
                all_matched = False
                if DEBUG:
                    print(red("MISSED") + '\t' + reference_dep['method'], reference_dep['url'], reference_dep.get('postData'))
        if all_matched:
            stats.succeed_app(tags)
        q.task_done()

async def check_pages(pages_jsons, n_workers):
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
        asyncio.create_task(check_page_worker(q, stats))

    for page_dir, sample_info in samples:
        await q.put((page_dir, sample_info))

    await q.join()

    stats.print_stats()

def main():
    parser = argparse.ArgumentParser()

    parser.add_argument('-p', type=int, default=6)
    parser.add_argument('pages', nargs='*')

    args = parser.parse_args()

    if len(args.pages) == 0:
        pages_jsons = glob.glob(PAGES_PATH + '/*.json')
    else:
        pages_jsons = args.pages[:]
        for i in range(len(pages_jsons)):
            if not pages_jsons[i].endswith('.json'):
                pages_jsons[i] += '.json'
    asyncio.run(check_pages(pages_jsons, args.p))


if __name__ == "__main__":
    main()
