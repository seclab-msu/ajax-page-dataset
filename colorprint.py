import os

COLOR_PRINT = os.isatty(1)

class colors:
    OKGREEN = "\33[38;5;35m"
    FAIL = '\33[38;5;1m'
    WHITE = '\u001B[37m'
    ENDC = '\033[0m'

def green(s):
    if COLOR_PRINT:
        return colors.OKGREEN + s + colors.ENDC
    return s

def red(s):
    if COLOR_PRINT:
        return colors.FAIL + s + colors.ENDC
    return s

def white(s):
    if COLOR_PRINT:
        return colors.WHITE + s + colors.ENDC
    return s
