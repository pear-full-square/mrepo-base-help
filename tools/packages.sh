#!/bin/sh
# A package's product repository kept updated from here: its folder,
# <org>/<package>/, written over the repository's main and pushed (the
# modules have tools/products.sh; a package's repository holds the package
# as it is here, its assembled modules/ and their third-party code
# included). Product repositories are created by the human.
#   sh tools/packages.sh -m "<what changed>" <org>/<package>...     from
#       this repository's main; fully qualified, an organisation of
#       tools/lib/orgs.js; its repository github.com/<org>/<package>
#   PACKAGES   where the repositories' clones are kept, <org>/<package>
#              (the folder beside this repository by default); one that is
#              not there is cloned
# For each package: its clone brought up to its main, emptied, the folder
# copied in, committed when anything changed (the message, then the commit
# of this repository it was written from) and pushed. One line a package.
# In a cloud session the repository has to be attached to the session first.
set -eu
dev=$(cd "$(dirname "$0")/.." && pwd)
[ "${1:-}" = -m ] && [ $# -ge 3 ] || { echo 'sh tools/packages.sh -m "<what changed>" <org>/<package>...' >&2; exit 2; }
msg=$2; shift 2
home=${PACKAGES:-$(dirname "$dev")}
from=$(git -C "$dev" rev-parse --short main)
for p in "$@"; do
  case "$p" in */*/*|/*|*/) echo "$p: not <org>/<package>"; exit 2 ;; */*) ;; *) echo "$p: not fully qualified (<org>/<package>)"; exit 2 ;; esac
  "$dev/tools/bare" -e "import { orgOf } from '$dev/tools/lib/orgs.js'; if (!orgOf('${p%%/*}')) { console.log('${p}: not an organisation of tools/lib/orgs.js'); Bare.exit(2) }" || exit 2
  [ -f "$dev/$p/package.json" ] || { echo "$p: no package here"; exit 2; }
  clone=$home/$p
  [ -d "$clone/.git" ] || { mkdir -p "$(dirname "$clone")"; git clone -q --depth 1 "https://github.com/$p" "$clone"; }
  git -C "$clone" pull -q --ff-only origin main 2>/dev/null || true
  (cd "$clone" && git rm -rq --ignore-unmatch . >/dev/null 2>&1 || true)
  cp -a "$dev/$p/." "$clone/"
  git -C "$clone" add -A
  if git -C "$clone" diff --cached --quiet; then echo "$p: up to date"; continue; fi
  git -C "$clone" commit -q -m "$msg; written from splectrum/splectrum-dev-env-3-mycelium@$from"
  git -C "$clone" push -q origin HEAD:main 2>&1 | grep -v 'negotiation\|acknowledgments' || true
  echo "$p: $(git -C "$clone" rev-parse --short HEAD)"
done
