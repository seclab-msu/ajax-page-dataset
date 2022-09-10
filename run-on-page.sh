#!/bin/bash -e

set -o pipefail

(cd "$2" && tar cf - -- * ) | "$1/run-analyzer-tar" /dev/stdin --no-html-deps --no-dynamic-deps
