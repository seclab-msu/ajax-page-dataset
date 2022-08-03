#!/usr/bin/env python3

import sys
import json

from check import have_dep
from colorprint import red, green

DEBUG = True

def dep_summary(d):
    res = d['method'] + '\t' + d['url']
    if 'postData' in d and d['postData']:
        pd = d['postData']
        if 'text' in pd and pd['text']:
            res += '\t[' + pd['text'][:40] + ']'
    return res



def main():
    want = sys.argv[1]
    got = sys.argv[2]

    with open(want, encoding='utf8') as want_file:
        want_data = json.load(want_file)['deps']
    with open(got, encoding='utf8') as got_file:
        got_data = json.load(got_file)
    reference_dep_count = len(want_data)
    found_dep_count = 0
    for reference_dep in want_data:
        if have_dep(got_data, reference_dep):
            found_dep_count += 1
            if DEBUG:
                print(green("FOUND") + '\t' + dep_summary(reference_dep))
        elif DEBUG:
                print(red("MISSED") + '\t' + dep_summary(reference_dep))
    print("Score: %d of %d (%.1f%%)" % (found_dep_count, reference_dep_count, 100 * found_dep_count / reference_dep_count))


if __name__ == "__main__":
    main()
