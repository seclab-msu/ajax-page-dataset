import json
import time
from collections import defaultdict

STAT_TAG_COMBINATIONS = [("clients", "bugbounty")]

class StatCount:
    __slots__ = ["total", "success", "found"]

    def __init__(self):
        self.total = 0
        self.success = 0

    def inc_total(self):
        self.total += 1

    def succeed(self):
        self.success += 1

    def save_found(self, count):
        self.found = count

    def cov_score(self):
        return float(self.success) / self.total if self.total != 0 else 0

    def precision_score(self):
        return float(self.success) / self.found if self.found != 0 else None

    def percent(self):
        return self.cov_score() * 100

    def fully_covered(self):
        return self.total == self.success

    def __str__(self):
        if self.total != 0:
            return "%d of %d (%.1f%%)" % (self.success, self.total, self.percent())
        else:
            return "%d of %d" % (self.success, self.total)

class Stat:
    __slots__ = ["apps"]

    def __init__(self):
        self.apps = defaultdict(StatCount)

    def inc_total(self, app):
        self.apps[app].inc_total()

    def succeed(self, app):
        self.apps[app].succeed()

    def save_found(self, app, count):
        return self.apps[app].save_found(count)

    def __score(self, stat_func):
        total = 0
        count_apps = len(self.apps)
        for st in self.apps.values():
            res = stat_func(st)
            if res != None:
                total += res
            else:
                count_apps -= 1

        return float(total) / count_apps if count_apps != 0 else 0

    def cov_score(self):
        return self.__score(lambda st: st.cov_score())

    def coverage(self, app):
        return self.apps[app].cov_score()

    def precision(self, app):
        return self.apps[app].precision_score()

    def strict_page_coverage(self):
        return self.__score(lambda st: st.fully_covered())

    def cov_1_score(self):
        return self.__score(lambda st: st.cov_score() >= 0.01)

    def precision_score(self):
        return self.__score(lambda st: st.precision_score())

    def cov_20_score(self):
        return self.__score(lambda st: st.cov_score() >= 0.20)

    def print_stat(self):
        other_scores = [
            ('COV_1', self.cov_1_score),
            ('COV_20', self.cov_20_score),
            ('STRICT_PAGE_COVERAGE', self.strict_page_coverage),
        ]

        for name, stat_fn in other_scores:
            print("%s: %.1f%%" % (name, (stat_fn() * 100)))

        print("Score (COV): %.1f%%" % (self.cov_score() * 100))

class Stats:
    __slots__ = ["stats", "raw_results"]

    def __init__(self, pages_jsons):
        self.stats = {
            "total": Stat()
        }
        self.raw_results = {}
        for sample_file in pages_jsons:
            for tag in sample_file.get("tags", []):
                self.stats[tag] = Stat()
        for comb in STAT_TAG_COMBINATIONS:
            self.stats[comb] = Stat()

    def get_relevant(self, tags):
        yield self.stats["total"]

        for tag in tags:
            if tag in self.stats:
                yield self.stats[tag]
            for comb in STAT_TAG_COMBINATIONS:
                if tag in comb:
                    yield self.stats[comb]

    def inc_total(self, app, tags):
        for stat in self.get_relevant(tags):
            stat.inc_total(app)

    def succeed(self, app, tags):
        for stat in self.get_relevant(tags):
            stat.succeed(app)

    def print_stats(self, tags_stat_cfg):
        print("-------------------------------")
        print("Average precision: %.2f%%" % (self.average_precision() * 100))
        print("Average execution time: %s" % self.average_time())
        print("Longest execution time on %s: %s" % self.max_time())
        if tags_stat_cfg != None:
            for key, stat in self.stats.items():
                if key != 'total' and (
                    key in tags_stat_cfg or
                    tags_stat_cfg == ['all']
                ):
                    if isinstance(key, tuple):
                        key = ' + '.join(key)
                    print("Stat for", key)
                    stat.print_stat()
                    print()
        print("TOTAL:")
        self.stats["total"].print_stat()

    def store_raw_result(self, page_name, dep_id, result):
        if page_name not in self.raw_results:
            self.raw_results[page_name] = {'deps': []}
        elif 'deps' not in self.raw_results[page_name]:
            self.raw_results[page_name]['deps'] = []

        self.raw_results[page_name]['deps'].append({
            "dep": dep_id,
            "result": result
        })

    def average_time(self):
        time_sec = sum(app['timeSeconds'] for app in self.raw_results.values()) / len(self.raw_results)
        return time.strftime("%H:%M:%S", time.gmtime(time_sec))

    def max_time(self):
        (name, raw_result) = max(self.raw_results.items(), key=lambda k: k[1]['timeSeconds'])
        return (name, raw_result['time'])

    def save_found(self, page_name, count):
        self.stats['total'].save_found(page_name, count)

    def store_properties(self, page_name, props):
        if page_name not in self.raw_results:
            self.raw_results[page_name] = {}

        for name, value in props.items():
            if name == 'time':
                self.raw_results[page_name]['timeSeconds'] = props[name]
                self.raw_results[page_name][name] = time.strftime("%H:%M:%S", time.gmtime(props['time']))
            else:
                self.raw_results[page_name][name] = props[name]

    def average_precision(self):
        return self.stats['total'].precision_score()

    def get_precision(self, page_name):
        return self.stats['total'].precision(page_name)

    def get_coverage(self, page_name):
        return self.stats['total'].coverage(page_name)

    def dump_raw_results(self):
        with open('stats.json', 'w') as f:
            json.dump(self.raw_results, f)
