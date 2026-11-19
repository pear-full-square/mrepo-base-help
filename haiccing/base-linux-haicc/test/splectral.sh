#!/bin/sh
# Splectral as an app platform, end to end: an install with the docs
# mrepo and Splectral; a component, the help viewer, installed in two
# halves (boot/deploy, then splectral/install), its service started, its
# pages asked over HTTP as a browser asks them; what it refuses; stopped,
# torn down; nothing left. Each step timed, the pages too.
#   sh test/splectral.sh [--keep]
#     --keep    the temporary folder left as it is, its runtimes running (printed)
#   SOURCES     as for run.sh, the splectral packages' bundles in it too; without one: skipped
# One line a check (ok, not ok), the count last; exit 0 passed, 1 failed.
set -u
here=$(cd "$(dirname "$0")" && pwd)
pkg=$(cd "$here/.." && pwd)
keep=no
[ "${1:-}" = --keep ] && keep=yes
. "$pkg/pins"
SOURCES=${SOURCES:-$pkg/../../sources}
for f in "$HAICC_ORG/$APP_PACKAGE.bundle" "$HAICC_ORG/base-package-splectral.bundle" splectral/base-component-help-viewer.bundle "$BARE_FILE"; do
  [ -f "$SOURCES/$f" ] || { echo "skipped: no $f in $SOURCES (SOURCES: a sources folder)"; exit 0; }
done
SOURCES=$(cd "$SOURCES" && pwd)
n=0; failed=0
ok () { n=$((n + 1)); echo "ok $n - $1"; }
no () { n=$((n + 1)); failed=$((failed + 1)); echo "not ok $n - $1"; [ -z "${2:-}" ] || echo "  # $2"; }
is () { if [ "$1" = "$2" ]; then ok "$3"; else no "$3" "got: $1; expected: $2"; fi; }
has () { case "$1" in *"$2"*) ok "$3" ;; *) no "$3" "got: $(printf '%s' "$1" | head -c 400); expected in it: $2" ;; esac; }
ms () { echo $(( $(date +%s%N) / 1000000 )); }
T=$(mktemp -d "${TMPDIR:-/tmp}/haicc-splectral.XXXXXX")
H=$T/home
TIMES=$T/times
cleanup () {
  if [ "$keep" = yes ]; then echo "kept: $T"; return; fi
  PATH=$T/bin:$PATH HAICC_HOME=$H haicc boot/teardown >/dev/null 2>&1
  case "$T" in "${TMPDIR:-/tmp}"/haicc-splectral.*) rm -rf "$T" ;; esac
}
trap cleanup EXIT
haicc () { PATH=$T/bin:$PATH HAICC_HOME=$H HAICC_TIMEOUT=240 "$T/bin/haicc" "$@" 2>&1; }
step () { s=$(ms); out=$(haicc "$@"); r=$?; echo "$label $(( $(ms) - s ))" >> "$TIMES"; return $r; }
# a page as a browser asks it: its status, then its body (PAGE), timed
get () { s=$(ms); code=$(curl -s -o "$T/page" -w '%{http_code}' --max-time 60 "$URL$1"); echo "page $(( $(ms) - s ))" >> "$TIMES"; PAGE=$(cat "$T/page" 2>/dev/null); }

sh "$pkg/haicc-install.sh" --home="$H" --bin="$T/bin" >/dev/null
haicc sources link "$SOURCES" >/dev/null; haicc prereq >/dev/null
label=boot; step boot/deploy; is $? 0 "haicc boot/deploy"
label=docs; step --output . boot/deploy docs haiccing/base-component-docs; has "$out" '"deployed":"docs"' "the docs mrepo deployed"
label=splectral; step --output . boot/deploy splectral haiccing/base-package-splectral --flags continuation=start; has "$out" '"state":"started"' "Splectral deployed and in service"
out=$(haicc --output splectral splectral/status)
URL=$(printf '%s' "$out" | sed -n 's/.*"url":"\([^"]*\)".*/\1/p')
has "$URL" "http://127.0.0.1:" "its server: $URL"

# the component, the first half: haicc's, a plain service-managed mrepo deployed by Splectral
label=base; step --output splectral boot/deploy help haiccing/base-package-service; has "$out" '"mrepo":"local/help"' "the first half: a plain mrepo deployed by Splectral, local/help"
# the second half: Splectral's, the component's packages laid on top
label=install; step --output splectral splectral/install help splectral/base-component-help-viewer; has "$out" '"installed":"help"' "the second half: the component installed"
has "$out" '"laid":["runtime/hooks/start.haicc","runtime/hooks/stop.haicc"]' "its start and stop hooks laid by the mrepo itself"
has "$out" '"packages":["splectral/base-component-help-viewer"]' "its package, splectral's: itself only"
F=$H/work/mrepos/local/help
[ -f "$F/splectral/component.json" ] && [ -d "$F/splectral/inbox" ] && [ -d "$F/splectral/outbox" ] && ok "Splectral's side of its folder: its record, its inbox and outbox" || no "Splectral's side of its folder"
is "$(ls "$F/packages/splectral" 2>/dev/null)" "" "none of its packages in the mrepo's own packages: no haiccing runtime loads them"
out=$(haicc --output splectral/help runtime/run . packages/splectral/base-component-help-viewer 2>&1)
has "$out" "not a package of this mrepo: splectral/base-component-help-viewer" "the runtime knows none of them"

# what it refuses
out=$(haicc --output splectral splectral/install help splectral/base-component-help-viewer); has "$out" "a component there already: help" "installed again: refused (deploy and teardown)"
out=$(haicc --output splectral splectral/install other splectral/base-component-help-viewer); has "$out" "not deployed: other" "nothing deployed there: refused"
haicc --output splectral boot/deploy other haiccing/base-package-service >/dev/null
out=$(haicc --output splectral splectral/install other haiccing/base-component-docs); has "$out" "not a Splectral component: haiccing/base-component-docs" "a haiccing package: not a Splectral component"
haicc --output splectral boot/teardown other >/dev/null
out=$(haicc --output splectral splectral/install stream splectral/base-component-help-viewer); has "$out" "not a position for a component: stream" "a position that is the server's own path: refused"

# not started: said at once
get /help/; is "$code" 503 "its pages before its service started: not running, said at once"
# its service, through haicc's hops: its program started by its start hook
label=initialise; step --output splectral/help service/initialise; has "$out" '"state":"initialised"' "its service initialised, through Splectral"
label=start; step --output splectral/help service/start; has "$out" '"state":"started"' "started: its program started by its hook"
[ -f "$F/splectral/packages/splectral/base-component-help-viewer.state.json" ] && ok "its program's state, beside its bundle" || no "its program's state"

# its pages, as a browser asks them
get /help/; is "$code" 200 "its top page"
has "$PAGE" "<title>docs</title>" "the docs mrepo's top"
has "$PAGE" '<a href="/help/" class="on" aria-current="page">help</a>' "in the site: its tab, shown"
has "$PAGE" '<a href=&quot;hdlc&quot;>hdlc</a>' "the keywords below, links to the same view, relative to its section"
has "$PAGE" '<base href=&quot;/help/&quot; target=&quot;_top&quot;>' "its page embedded in the site, its base its section's own address"
get /help/hdlc/validation; is "$code" 200 "a page by its keywords"
has "$PAGE" "Before every commit" "as haicc docs info/get hdlc/validation answers it, drawn"
has "$PAGE" '<code>haicc docs info/get hdlc/validation</code>' "the command it shows"
get "/help/?at=splectral"; has "$PAGE" "<title>splectral</title>" "another mrepo, by its position: Splectral answering about itself"
# the site: the URI chopped, the site serving /, Splectral's own page its first tab
get /; has "$PAGE" '<a href="/install" class="on" aria-current="page">install</a><a href="/help/">help</a>' "the site: its own page shown, the component a tab"
has "$PAGE" "srcdoc=" "its own page embedded in the content area"
get /install; has "$PAGE" '<a href="/install" class="on"' "its own page at its own URI"
get /help/no/such/thing; is "$code" 200 "a keyword that is not there: a page all the same"
has "$PAGE" 'class=&quot;error&quot;' "its error said on it"
for i in 1 2 3; do get /help/hdlc/validation; done
get /records; has "$PAGE" '"command":"haicc docs info/get hdlc/validation"' "its data requests: commands in the install's record, as a terminal's"
is "$(ls "$F/splectral/inbox" "$F/splectral/outbox" | grep -c json)" 0 "its boxes empty: each record taken removed"

# stopped, torn down
label=stop; step --output splectral/help service/stop; has "$out" '"service":"stopped"' "its service stopped"
[ -f "$F/splectral/packages/splectral/base-component-help-viewer.state.json" ] && no "its program ended" || ok "its program ended by its stop hook"
get /help/; is "$code" 503 "its pages: not running"
label=teardown; step --output splectral boot/teardown help; has "$out" '"tornDown":"help"' "the component torn down, as any mrepo"
[ -e "$F" ] && no "its folder removed" || ok "its folder removed"
get /help/; is "$code" 404 "its pages: not deployed"
label=machine; step boot/teardown; is $? 0 "haicc boot/teardown"
is "$(pgrep -f -- "[/]bin/bare $T/" | wc -l | tr -d ' ')" 0 "nothing of the install left running"

echo "# timing (ms)"
for s in boot docs splectral base install initialise start stop teardown machine; do echo "# $s $(sed -n "s/^$s //p" "$TIMES")"; done
echo "# pages $(sed -n 's/^page //p' "$TIMES" | tr '\n' ' ')"
echo "# checks = $((n - failed))/$n pass"
[ "$failed" -eq 0 ] && { echo "# ok"; exit 0; }
echo "# not ok"; exit 1
