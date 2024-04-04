#!/usr/bin/env python3

import sys
import json

KNOWN_CHANGED = set([ # TODO: most of the time this set should be empty
    ('POST', 'https://www.eldorado.ru/esp/prx-partners/v1/spa/rr/apptracking/addToBasket/'),
    ('GET', 'https://www.eldorado.ru/sem/v3/a408/products?ids=590103375%2C71674786%2C30067223%2C30067202%2C30067844%2C30067949%2C30067941%2C590154553%2C590107546%2C590147755%2C30067434%2C71662566%2C71675488%2C71658987%2C590148364'),
    ('GET', 'https://www.eldorado.ru/esp/prx-partners/v1/spa/rr/externalapi/partnerRecommendations/personalComposite/?sessionExternalId=pe5i2ikww-unmx0ejvg10jcznbgrt_lkhxhu&stockId=5354691'),
    ('GET', 'https://www.eldorado.ru/sem/v3/a408/categories/krasota-i-zdorove/?level=20&haveAvailableProducts=true&hideCategory=false')
])

def is_new_format_stats(stats):
    return isinstance(stats, dict)

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
    if is_new_format_stats(p):
        p = p['deps']

    c = current[sample_name]
    if is_new_format_stats(c):
        c = c['deps']

    for i in range(len(p)):
        if p[i]['dep'] != c[i]['dep']:
            if (p[i]['dep']['method'], p[i]['dep']['url']) in KNOWN_CHANGED:
                continue
            print("dep differs: was", p[i]['dep'], 'now', c[i]['dep'], file=sys.stderr)
            exit(1)
        if p[i]['result'] and not c[i]['result']:
            not_covered.append(p[i]['dep'])
        if c[i]['result'] and not p[i]['result']:
            print('new dep!', c[i])

if len(not_covered) > 0:
    print('Coverage decreased! DEPs not covered:')
    for dep in not_covered:
        print(dep)
    exit(1)
else:
    print('OK')
