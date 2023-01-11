#!/usr/bin/env python3

import sys
import json

previous_fname = sys.argv[1]
current_fname = sys.argv[2]

with open(previous_fname, encoding='utf8') as p_f:
    previous = json.load(p_f)

with open(current_fname, encoding='utf8') as c_f:
    current = json.load(c_f)

not_covered = []

for sample_name in previous:
    if sample_name not in current:
        print("sample missing:", sample_name, file=sys.stderr)
        exit(1)
    p = previous[sample_name]
    c = current[sample_name]

    for i in range(len(p)):
        if p[i]['dep'] != c[i]['dep']:
            print("dep differs: was", p[i]['dep'], 'now', c[i]['dep'], file=sys.stderr)
            exit(1)
        if p[i]['result'] and not c[i]['result']:
            not_covered.append(p[i]['dep'])

if len(not_covered) > 0:
    print('Coverage decreased! DEPs not covered:')
    for dep in not_covered:
        print(dep)
else:
    print('OK')
