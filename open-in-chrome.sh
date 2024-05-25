#!/bin/bash -e

set -o pipefail

URL=`jq -r < "$1".json '.url'`

../js-analyzer/open-tar-in-chrome <(cd "$1" && tar cvf - -- *) "$URL"