import json
from collections import defaultdict

STAT_TAG_COMBINATIONS = [("clients", "bugbounty")]

class StatCount:
    __slots__ = ["total", "success"]

    def __init__(self):
        self.total = 0
        self.success = 0

    def inc_total(self):
        self.total += 1

    def succeed(self):
        self.success += 1

    def cov_score(self):
        return float(self.success) / self.total if self.total != 0 else 0

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

    def __score(self, stat_func):
        if len(self.apps) == 0:
            return 0
        return float(sum(stat_func(st) for st in self.apps.values())) / len(self.apps)

    def cov_score(self):
        return self.__score(lambda st: st.cov_score())

    def strict_page_coverage(self):
        return self.__score(lambda st: st.fully_covered())

    def cov_1_score(self):
        return self.__score(lambda st: st.cov_score() >= 0.01)

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

    def print_stats(self):
        for key, stat in self.stats.items():
            if key != 'total':
                if isinstance(key, tuple):
                    key = ' + '.join(key)
                print("Stat for", key)
                stat.print_stat()
                print()
        print("TOTAL:")
        self.stats["total"].print_stat()

    def store_raw_result(self, page_name, dep_id, result):
        page_name = page_name.split('/')[-1]
        if page_name not in self.raw_results:
            self.raw_results[page_name] = []
        self.raw_results[page_name].append({
            "dep": dep_id,
            "result": result
        })

    def dump_raw_results(self):
        with open('stats.json', 'w') as f:
            json.dump(self.raw_results, f)
