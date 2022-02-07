#!/usr/bin/env python3

import os
import sys
import glob
import json
import urllib.parse
import subprocess

ANALYZER_PATH = "../js-analyzer"
PAGES_PATH = os.path.join(os.path.dirname(__file__), "pages")
DEBUG = True

def run_analyzer(page_dir):
    analyzer_process = subprocess.Popen(
        ['./run-on-page.sh', ANALYZER_PATH, page_dir],
        stdout=subprocess.PIPE
    )
    analyzer_deps = json.load(analyzer_process.stdout)
    analyzer_status = analyzer_process.wait()
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

def check_pages(pages_jsons):
    reference_dep_count = 0
    found_dep_count = 0
    for sample_file in pages_jsons:
        page_dir = sample_file[:-5]
        with open(sample_file, encoding='utf8') as f:
            sample_info = json.load(f)
        reference_deps = sample_info['deps']
        analyzer_deps = run_analyzer(page_dir)

        reference_dep_count += len(reference_deps)
        for reference_dep in reference_deps:
            if have_dep(analyzer_deps, reference_dep):
                found_dep_count += 1
                if DEBUG:
                    print("FOUND", reference_dep['method'], reference_dep['url'])
            elif DEBUG:
                    print("MISSED", reference_dep['method'], reference_dep['url'])
    print("Score: %d of %d (%.1f%%)" % (found_dep_count, reference_dep_count, 100 * found_dep_count / reference_dep_count))

def main():
    if len(sys.argv) < 2:
        pages_jsons = glob.glob(PAGES_PATH + '/*.json')
    else:
        pages_jsons = sys.argv[1:]
        for i in range(len(pages_jsons)):
            if not pages_jsons[i].endswith('.json'):
                pages_jsons[i] += '.json'
    check_pages(pages_jsons)


if __name__ == "__main__":
    main()
