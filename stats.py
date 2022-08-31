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

    def percent(self):
        return (self.success * 100) / self.total

    def __str__(self):
        return "%d of %d (%.1f%%)" % (self.success, self.total, self.percent())


class Stat:
    __slots__ = ["dep", "app"]

    def __init__(self):
        self.dep = StatCount()
        self.app = StatCount()

    def print_stat(self):
        print("Score (deps):", str(self.dep))
        print("Score (apps):", str(self.app))

class Stats:
    __slots__ = ["stats"]

    def __init__(self, pages_jsons):
        self.stats = {
            "total": Stat()
        }
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

    def inc_app(self, tags):
        for stat in self.get_relevant(tags):
            stat.app.inc_total()

    def inc_dep(self, tags):
        for stat in self.get_relevant(tags):
            stat.dep.inc_total()

    def succeed_app(self, tags):
        for stat in self.get_relevant(tags):
            stat.app.succeed()

    def succeed_dep(self, tags):
        for stat in self.get_relevant(tags):
            stat.dep.succeed()

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