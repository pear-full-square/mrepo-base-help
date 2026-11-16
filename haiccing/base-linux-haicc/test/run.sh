#!/bin/sh
# The haicc command, tested end to end as it is installed: from the installer
# to a started host and its teardown, in a temporary folder, removed after.
# It leaves nothing running.
#   sh test/run.sh [--keep]
#     --keep    the temporary folder and its runtimes left as they are, to
#               inspect (its path printed)
#   SOURCES     the sources folder it links: the packages' bundles (the
#               app's among them) and Bare's tarball (the development repository's sources/, built
#               by tools/release.js); else ../../../sources from here;
#               without one: skipped
# One line a check (ok, not ok), the count last; exit 0 passed, 1 failed.
set -u
here=$(cd "$(dirname "$0")" && pwd)
pkg=$(cd "$here/.." && pwd)
keep=no
[ "${1:-}" = --keep ] && keep=yes
. "$pkg/pins"
SOURCES=${SOURCES:-$pkg/../../sources}
for f in "$HAICC_ORG/$APP_PACKAGE.bundle" "$HAICC_ORG/base-component-boot.bundle" "$HAICC_ORG/base-component-haicc.bundle" "$HAICC_ORG/manifest.json" "$BARE_FILE"; do
  [ -f "$SOURCES/$f" ] || { echo "skipped: no $f in $SOURCES (SOURCES: a sources folder)"; exit 0; }
done
SOURCES=$(cd "$SOURCES" && pwd)

n=0; failed=0
ok () { n=$((n + 1)); echo "ok $n - $1"; }
no () { n=$((n + 1)); failed=$((failed + 1)); echo "not ok $n - $1"; [ -z "${2:-}" ] || echo "  # $2"; }
is () { if [ "$1" = "$2" ]; then ok "$3"; else no "$3" "got: $1; expected: $2"; fi; }
has () { case "$1" in *"$2"*) ok "$3" ;; *) no "$3" "got: $1; expected in it: $2" ;; esac; }
hasnt () { case "$1" in *"$2"*) no "$3" "got: $1; not expected in it: $2" ;; *) ok "$3" ;; esac; }

T=$(mktemp -d "${TMPDIR:-/tmp}/haicc-test.XXXXXX")
running () { pgrep -f -- "[/]bin/bare $T/" 2>/dev/null; }
cleanup () {
  if [ "$keep" = yes ]; then echo "kept: $T"; return; fi
  for pid in $(running); do kill "$pid" 2>/dev/null; done
  i=0; while [ -n "$(running)" ] && [ "$i" -lt 100 ]; do sleep 0.1 2>/dev/null || sleep 1; i=$((i + 1)); done
  for pid in $(running); do kill -9 "$pid" 2>/dev/null; done
  case "$T" in */haicc-test.*) rm -rf "$T" ;; esac
}
trap cleanup EXIT
trap 'exit 130' INT TERM

# 1. the installer: the one build.sh writes; installed
sh "$pkg/build.sh" "$T/built.sh" >/dev/null
if cmp -s "$T/built.sh" "$pkg/haicc-install.sh"; then ok "the installer is the one build.sh writes"; else no "the installer is the one build.sh writes" "run: sh build.sh"; fi
out=$(sh "$pkg/haicc-install.sh" --home="$T/home" --bin="$T/bin" 2>&1)
is $? 0 "installed: sh haicc-install.sh --home --bin"
[ -x "$T/bin/haicc" ] && [ -f "$T/home/pins" ] && ok "the command registered in the bin folder, its scripts and pins in its own" || no "the command registered" "$out"
PATH=$T/bin:$PATH; export PATH
unset HAICC_HOME HAICC_WORK HAICC_OUTPUT HAICC_RAW 2>/dev/null
HAICC_TIMEOUT=180; export HAICC_TIMEOUT

# 2. before Bare is there: the first step's own commands, in sh; anything
# else is the app's, and says what is missing
out=$(haicc --help); is $? 0 "haicc --help"
has "$out" "haicc sources link <folder>" "its usage: the script commands and the form of an mrepo command"
has "$out" "once haicc prereq says all is there" "before Bare: the first step's commands, the rest pointed to"

# 3. nothing there yet: the prerequisites say what is missing; no boot
is "$(cat "$T/home/sources.list")" "github:$HAICC_ORG" "the sources at first: https, the backup, by default"
out=$(haicc prereq --check); is $? 3 "haicc prereq --check, nothing linked: exit 3"
has "$out" "missing  sources:" "the sources missing, said"
has "$out" "missing  bare:" "Bare missing, said"
out=$(haicc boot/deploy 2>&1); is $? 3 "haicc boot/deploy without its prerequisites: exit 3, pointing to haicc prereq"
has "$out" "haicc: a prerequisite is missing: haicc prereq" "said, with what is missing"
[ ! -e "$T/home/work/mrepos" ] && ok "nothing written" || no "nothing written"
haicc sources >/dev/null 2>&1; is $? 3 "the app's other commands the same: haicc sources, exit 3"

# 4. the sources: a folder linked, in sh (Bare and the app come from it)
out=$(haicc sources link "$SOURCES")
is "$out" "folder:$SOURCES
github:$HAICC_ORG" "haicc sources link <folder>: the folder first, https the backup after it"
haicc sources link "$T/nowhere" >/dev/null 2>&1; is $? 2 "a folder that is not there: not linked"

# 5. the prerequisites: Bare unpacked from the sources, as pinned
out=$(haicc prereq --check); is $? 3 "haicc prereq --check: Bare not in place yet, nothing changed"
[ ! -e "$T/home/bare" ] && ok "nothing put in place by a check" || no "nothing put in place by a check"
out=$(haicc prereq); is $? 0 "haicc prereq: all there"
has "$out" "ok       bare: $BARE_VERSION, put in place from $SOURCES/$BARE_FILE" "Bare put in place from the sources"
is "$("$T/home/bare/bin/bare" --version 2>/dev/null)" "v$BARE_VERSION" "the pinned Bare, running"
is "$(cat "$T/home/bare/tarball.sha512")" "$BARE_SHA512" "its tarball's sha512 recorded: the pin"
out=$(haicc prereq --check); is $? 0 "haicc prereq --check: all there now"
has "$out" "ok       bare: $BARE_VERSION, as pinned" "Bare there, as pinned: kept"

# from here the command is the app, run with the Bare just put in place
out=$(haicc --help); is $? 0 "haicc --help, Bare there"
has "$out" "haicc sources link <folder>" "the usage whole: the first step's commands"
has "$out" "haicc <URI> <protocol>/<action> <argument>..." "and the app's: the form of an mrepo command"
haicc nosuch >/dev/null 2>&1; is $? 2 "no such script command: exit 2"
out=$(haicc . 2>&1); is $? 2 "a URI with no command after it: exit 2"
out=$(haicc boot 2>&1); is $? 2 "haicc boot alone: exit 2 (the machine level is boot/deploy, boot/teardown)"
has "$out" "haicc boot/deploy, haicc boot/teardown" "said"
haicc boot/nosuch >/dev/null 2>&1; is $? 2 "no such action at the machine level: exit 2"
out=$(haicc --output 2>&1); is $? 2 "haicc --output without a URI: exit 2"
out=$(haicc --raw 2>&1); is $? 2 "haicc --raw without a URI: exit 2"
haicc boot/teardown >/dev/null 2>&1; is $? 3 "haicc boot/teardown with no boot mrepo: exit 3"
out=$(haicc host service/start 2>&1); is $? 3 "an mrepo command before the boot: exit 3"
has "$out" "no boot mrepo" "said: no boot mrepo (haicc boot/deploy)"
[ ! -e "$T/home/work/mrepos" ] && ok "nothing written by any of it" || no "nothing written by any of it"
is "$(haicc sources no-https)" "folder:$SOURCES" "haicc sources no-https: the backup off"
haicc sources https >/dev/null; haicc sources link "$SOURCES" >/dev/null
is "$(haicc sources | wc -l | tr -d ' ')" 2 "https back on; a folder linked twice is listed once"
out=$(haicc sources download "$HAICC_ORG" 2>&1); is $? 3 "haicc sources download $HAICC_ORG: our packages are not published yet, exit 3"
has "$out" "not published yet" "said"
haicc sources download nosuch >/dev/null 2>&1; is $? 3 "nothing to download by that name: exit 3"

# 6. the boot: the boot mrepo at the root, its runtime started, nothing deployed
out=$(haicc boot/deploy 2>&1); is $? 0 "haicc boot/deploy"
has "$out" '"protocol":"boot","action":"deploy","uri":["boot"]' "its request printed, completed: boot deploy boot"
has "$out" '"repository":"boot"' "its runtime started"
[ -d "$T/home/work/mrepos/boot/inbox" ] && ok "the boot mrepo in the work folder" || no "the boot mrepo in the work folder"
[ ! -e "$T/home/work/mrepos/local" ] && ok "nothing deployed by the boot" || no "nothing deployed by the boot"
is "$(running | wc -l | tr -d ' ')" 1 "one runtime running: the boot mrepo's"

# 7. commands: the host deployed at the root; passed through to it. The
# response record is printed whole, unpacked across lines; --raw: as it is
# stored, one line; --output: the output alone
out=$(haicc --raw . boot/deploy host base-component-haicc 2>&1); is $? 0 "haicc --raw . boot/deploy host base-component-haicc"
has "$out" '"deployed":"host","mrepo":"local/host","package":"haiccing/base-component-haicc"' "its output: the haicc mrepo deployed at host, its unique URI local/host"
has "$out" '"topic":"/haicc/terminal"' "--raw: the response record as it is stored, the core addressed back to the terminal"
is "$(printf '%s\n' "$out" | wc -l | tr -d ' ')" 1 "one line"
out=$(haicc . help/get . oneliner 2>&1); is $? 0 "haicc . help/get .: by default the record unpacked"
has "$out" '    "topic": "/haicc/terminal", "key": "' "across lines, indented, its entries packed on a line up to the width: the core two deep"
has "$out" '      "command": ["help/get",".","oneliner"], "protocol": "help",' "the form three deep, packed too"
has "$out" '        "uri": ".", "title": "mrepo/",' "and its output, opened below: an entry that does not fit a line of its own"
[ "$(printf '%s\n' "$out" | wc -l | tr -d ' ')" -gt 5 ] && ok "several lines" || no "several lines" "$out"
out=$(haicc host help/get 2>&1 >/dev/null); is "$out" "haicc: no help extracted in this mrepo yet (help/extract)" "the host, booted: help active from boot, extracted by its initialise hook, not yet"
# nothing of a record changed by the unpacking: what is printed, its line
# breaks and spaces taken off, is the record as it is stored in the outbox,
# its spaces taken off the same way (an output, an error; the exact check,
# strings minded, is the app's own test)
back=yes
for c in ". help/get . oneliner" ". help/get . packages oneliner" ". boot/deploy host base-component-haicc"; do
  out=$(haicc $c 2>/dev/null)
  key=$(printf '%s\n' "$out" | sed -n 's/^  "topic": "[^"]*", "key": "\([^"]*\)".*$/\1/p')
  packed=$(printf '%s\n' "$out" | tr -d ' \n')
  [ -n "$key" ] && [ "$packed" = "$(tr -d ' \n' < "$T/home/work/mrepos/boot/outbox/$key.json")" ] || { no "unpacked and packed again: the record as stored" "haicc $c"; back=''; break; }
done
[ -z "$back" ] || ok "unpacked and packed again: every record in the outbox as stored"
is "$(haicc output 2>&1)" "auto: 80 (the output is no terminal)" "haicc output: the width in force: auto, 80 here"
is "$(haicc output 100000 2>&1)" "100000 (set: haicc output auto for the terminal's width)" "haicc output 100000: set"
is "$(haicc . help/get . oneliner | wc -l | tr -d ' ')" 1 "a record that fits the width set: left on one line"
is "$(cat "$T/home/output.width")" "100000" "kept, in haicc's own folder"
out=$(haicc output wide 2>&1 >/dev/null); is "$?" "2" "haicc output wide: no width, exit 2"
is "$(haicc output auto 2>&1)" "auto: 80 (the output is no terminal)" "haicc output auto: back to the default"
out=$(haicc . boot/deploy host base-component-haicc 2>&1 >/dev/null); is $? 1 "deployed again: exit 1"
is "$out" "haicc: deployed already: host" "its error on stderr: host is there already"
out=$(haicc host boot/deploy node-1 base-package-runtime 2>&1 >/dev/null); is $? 1 "the host booted: its boot protocol behind the service's door"
is "$out" "haicc: not now: boot deploy (boot is not active; the service is booted)" "said: boot is activated by the service's start"
is "$(haicc --output host service/initialise 2>&1)" '{"service":"initialised","state":"initialised"}' "haicc --output host service/initialise: passed through to the haicc mrepo; what was done, the state now"
is "$(haicc --output host service/start 2>&1)" '{"service":"started","state":"started"}' "haicc host service/start"

# 8. what is missing is said: an argument, a protocol
out=$(haicc . boot/deploy 2>&1 >/dev/null); is $? 1 "haicc . boot/deploy, nothing after it: exit 1"
is "$out" "haicc: missing argument: target" "missing argument: target"
out=$(haicc . boot/teardown 2>&1 >/dev/null); is "$out" "haicc: missing argument: target" "haicc . boot/teardown: the same (one cannot tear down the mrepo itself)"
out=$(haicc . boot/teardown . 2>&1 >/dev/null); is "$out" "haicc: missing argument: target" "a target of . written out: still missing"
out=$(haicc . boot/deploy other 2>&1 >/dev/null); is "$out" "haicc: missing argument: package" "haicc . boot/deploy other: missing argument: package"
out=$(haicc host boot/deploy 2>&1 >/dev/null); is "$out" "haicc: missing argument: target" "and passed through: said by the mrepo it lands in"
out=$(haicc host 2>&1); is $? 2 "haicc host, no command: exit 2 at the command line"
out=$(haicc . protocol/activate . service 2>&1 >/dev/null); is "$out" "haicc: not now: protocol activate (protocol is not active)" "activating a protocol is the hooks', not a command from outside"
out=$(haicc . deploy/teardown host 2>&1 >/dev/null); is $? 1 "a protocol that is not there: exit 1"
is "$out" "haicc: no protocol: deploy (boot, crud, haicc, help, runtime)" "said, with the protocols there"
out=$(haicc . boot/remove host 2>&1 >/dev/null); is "$out" "haicc: no action: boot remove (deploy, redeploy, teardown)" "an action that is not there: said, with the protocol's actions"

# 9. a node inside the host; commands chained through both
out=$(haicc --raw host boot/deploy node-1 base-package-runtime 2>&1); is $? 0 "haicc host boot/deploy node-1: executed by the haicc mrepo"
has "$out" '"deployed":"node-1","mrepo":"local/node-1"' "the node deployed inside it"
[ -d "$T/home/work/mrepos/local/node-1/inbox" ] && ok "placed by its unique URI, side by side with the others: mrepos/local/node-1" || no "placed by its unique URI"
[ ! -e "$T/home/work/mrepos/local/host/main" ] && [ ! -e "$T/home/work/mrepos/boot/main" ] && ok "nothing of an mrepo inside the one that deployed it" || no "nothing of an mrepo inside the one that deployed it"
is "$(running | wc -l | tr -d ' ')" 3 "three runtimes running: the boot mrepo's, the host's, the node's"
out=$(haicc --raw host haicc node-1 help/get . packages oneliner 2>&1); is $? 0 "haicc host haicc node-1 help/get . packages: chained through two shortcuts"
has "$out" '"uri":"packages"' "answered by the node"
case "$out" in *base-package-boot*) no "the node's packages, not the host's" "$out" ;; *) ok "the node's packages, not the host's" ;; esac
out=$(haicc --raw host/node-1 help/get . packages oneliner 2>&1); is $? 0 "haicc host/node-1 help/get: a URI running through shortcuts: from one local root to the next"
has "$out" '"uri":"packages"' "answered by the node: what is left of the URI went on with the command"
case "$out" in *base-package-boot*) no "the node's packages, by the one URI" "$out" ;; *) ok "the node's packages, by the one URI" ;; esac
out=$(haicc nowhere help/get 2>&1 >/dev/null); is "$out" "haicc: haicc nowhere: no node there" "a position that is not there: said, exit 1"
out=$(haicc . help/get . packages 'no "such" section' 2>&1 >/dev/null); is $? 1 "an argument with spaces and quotes: sent whole"
has "$out" 'no section "no "such" section" at packages' "and back in the error"
out=$(haicc /host help/get 2>&1 >/dev/null); is $? 1 "a URI with a leading slash: refused, exit 1"
is "$out" "haicc: not a relative URI: /host (no leading slash: host)" "said, with the URI as it is written now"
out=$(haicc --output ./host service/start 2>&1 >/dev/null); is "$out" "haicc: not now: service start (the service is started)" "./host is host: a position written with ./ in front"
out=$(haicc --output host help/get . oneliner 2>&1); is $? 0 "haicc --output: the output alone"
case "$out" in *'"topic":'*) no "no record around it" "$out" ;; *) ok "no record around it" ;; esac
out=$(HAICC_OUTPUT=1 haicc host help/get . oneliner 2>&1); is $? 0 "HAICC_OUTPUT=1: the same"
case "$out" in *'"topic":'*) no "no record around it, HAICC_OUTPUT=1" "$out" ;; *) ok "no record around it, HAICC_OUTPUT=1" ;; esac

# 9b. structure in main: nodes created, read and deleted with crud; at the
# root (the boot mrepo: crud active from its boot) and in the host (behind
# its service's door, open while started). Every one can be repeated
is "$(haicc --output . crud/create swarms/swarm-1 '{"size":3}' 2>&1)" '[{"uri":["main","swarms"],"value":{},"children":["swarm-1"],"outcome":"created"},{"uri":["main","swarms/swarm-1"],"value":{"size":3},"children":[],"outcome":"created"}]' "haicc . crud/create swarms/swarm-1 <value>: the node and the one above it made, each answered: its URI as held inside, its document, its children, what happened"
is "$(haicc --output . crud/create swarms/swarm-1 '{"size":9}' 2>&1)" '[{"uri":["main","swarms"],"value":{},"children":["swarm-1"],"outcome":"there"},{"uri":["main","swarms/swarm-1"],"value":{"size":3},"children":[],"outcome":"there"}]' "again, with another value: there already, left as it is"
is "$(haicc --output . crud/create swarms/swarm-2 2>&1)" '[{"uri":["main","swarms"],"value":{},"children":["swarm-1","swarm-2"],"outcome":"there"},{"uri":["main","swarms/swarm-2"],"value":{},"children":[],"outcome":"created"}]' "a sibling, no value: an empty document"
is "$(haicc --output . crud/read swarms 2>&1)" '[{"uri":["main","swarms"],"value":{},"children":["swarm-1","swarm-2"]}]' "haicc . crud/read swarms: an array of one node, its children by name"
is "$(haicc --output . crud/read 'swarms/*' 2>&1)" '[{"uri":["main","swarms/swarm-1"],"value":{"size":3},"children":[]},{"uri":["main","swarms/swarm-2"],"value":{},"children":[]}]' "haicc . crud/read swarms/*: its children, each a node"
is "$(haicc --output . crud/read swarmz 2>&1)" '[]' "nothing there (a typo): an empty array, exit 0"
out=$(haicc --output . crud/read host 2>&1)
has "$out" '[{"uri":["main","host"],"value":{},"children":[],"shortcuts":[{"mrepo":"local/host","link":"' "the host read as a node: a shortcut, with the mrepo its data comes from and its link's key: what is needed to show it"
is "$(haicc --output . crud/read . 2>&1)" '[{"uri":["main","."],"value":{},"children":["host","registry","swarms"]}]' "the root: a node, its children the host, the mrepo registry and what was created"
out=$(haicc . crud/read host/swarms 2>&1 >/dev/null); is "$out" "haicc: host is a shortcut: a URI does not run through it (haicc host haicc swarms ...)" "below a shortcut: not read here, the way across said"
# a query: a filter on the nodes' documents; a command at a position inside
# main, and at each position a query selects
is "$(haicc --output . crud/read 'swarms/*[size>2]' 2>&1)" '[{"uri":["main","swarms/swarm-1"],"value":{"size":3},"children":[]}]' "haicc . crud/read 'swarms/*[size>2]': the nodes the filter holds for"
is "$(haicc --output . crud/read "swarms/*[size='none' or not(size)]" 2>&1)" '[{"uri":["main","swarms/swarm-2"],"value":{},"children":[]}]' "or, not(), a quoted value: sent whole"
is "$(haicc --output . crud/read swarms/swarm-1/size 2>&1)" '[{"uri":["main","swarms/swarm-1/size"],"value":3}]' "inside a node's document: the value there"
is "$(haicc --output swarms/swarm-1 crud/read . 2>&1)" '[{"uri":["main","swarms/swarm-1","."],"value":{"size":3},"children":[]}]' "haicc swarms/swarm-1 crud/read .: executed at the position, the command's URI read behind it"
is "$(haicc --output 'swarms/*[size=3]' crud/read . 2>&1)" '[{"at":"swarms/swarm-1","value":[{"uri":["main","swarms/swarm-1","."],"value":{"size":3},"children":[]}]}]' "haicc 'swarms/*[size=3]' crud/read .: at each position selected, a list of what each gave"
is "$(haicc --output 'swarms/*[size>100]' crud/read . 2>&1)" '[]' "nothing selected: an empty list, exit 0"
out=$(haicc '*' crud/read . 2>&1 >/dev/null); has "$out" "not yet: it reaches a shortcut (host) among 3 positions; a command goes on from one shortcut at a time" "a shortcut beside other positions: not yet, said so"
is "$(haicc --output . crud/read 'swarms/*[2]' 2>&1)" '[{"uri":["main","swarms/swarm-2"],"value":{},"children":[]}]' "a position, from 1: the second"
out=$(haicc . crud/read 'swarms/*[count(*)>1]' 2>&1 >/dev/null); has "$out" "not a function of this phase: count" "what the query does not read yet: said"
out=$(haicc . crud/read "swarms/*[Size>2]" 2>&1 >/dev/null); has "$out" "bad filter" "a name in a filter that is no URI's: refused as a URI"
out=$(haicc . crud/delete swarms 2>&1 >/dev/null); is "$out" "haicc: swarms has children: not deleted (crud/delete swarms recurse)" "haicc . crud/delete swarms: it has children, refused, saying how"
out=$(haicc . crud/update swarms '{}' 2>&1 >/dev/null); is "$out" "haicc: no action: crud update (create, delete, read)" "there is no update: said, with the actions there are"
out=$(haicc . crud/create . 2>&1 >/dev/null); is "$out" "haicc: missing argument: target" "the root itself is not created"
is "$(haicc --output . crud/delete swarms recurse 2>&1)" '[{"uri":["main","swarms"],"value":{},"children":["swarm-1","swarm-2"],"outcome":"deleted"}]' "with recurse: deleted, answered as it was"
is "$(haicc --output . crud/delete swarms recurse 2>&1)" '[]' "again: nothing there, nothing selected, exit 0"
is "$(haicc --output . crud/read . 2>&1)" '[{"uri":["main","."],"value":{},"children":["host","registry"]}]' "gone with everything below it; the host and the registry untouched"
is "$(haicc --output host crud/create swarms/swarm-1 2>&1)" '[{"uri":["main","swarms"],"value":{},"children":["swarm-1"],"outcome":"created"},{"uri":["main","swarms/swarm-1"],"value":{},"children":[],"outcome":"created"}]' "haicc host crud/create swarms/swarm-1: in the host, started: its own main"
is "$(haicc --output host crud/read . 2>&1)" '[{"uri":["main","."],"value":{},"children":["node-1","swarms"]}]' "the host's root: its node, a shortcut, and what was created there"
is "$(haicc --output host/swarms/swarm-1 crud/read . 2>&1)" '[{"uri":["main","swarms/swarm-1","."],"value":{},"children":[]}]' "haicc host/swarms/swarm-1 crud/read .: through the shortcut, then at the position in the host"
is "$(haicc --output 'host/swarms/*' crud/read . 2>&1)" '[{"at":"swarms/swarm-1","value":[{"uri":["main","swarms/swarm-1","."],"value":{},"children":[]}]}]' "a query through the shortcut: selected in the host"
is "$(haicc --output . crud/read swarms 2>&1)" '[]' "nothing of it in the boot mrepo: each mrepo its own main"

# 9b. a request's log, and its flags: info unasked; --flags log=verbose,
# log=debug, after a URI: that step's, held down the chain; a flag that is
# none
out=$(haicc --raw host crud/read . 2>&1)
has "$out" '"event":"request.metrics"' "a request's log, without a flag: its metrics, at info"
has "$out" '"event":"request.sent"' "and where it was sent on"
hasnt "$out" '"event":"crud.read.query"' "no steps: those are verbose"
out=$(haicc --raw host crud/read . --flags log=verbose 2>&1)
has "$out" '"args":["crud/read",".","--flags","log=verbose"]' "haicc host crud/read . --flags log=verbose: at the end of the line, the last command's: passed on as written"
has "$out" '"event":"crud.read.query"' "the read's steps, from the host"
has "$out" '"jump":["host"]' "each entry of the host's under its jump"
hasnt "$out" '"event":"haicc.goto.sent on"' "the boot mrepo's own hop still at info: the flag was the last command's"
out=$(haicc --raw host --flags log=verbose -- crud/read . 2>&1)
has "$out" '"event":"haicc.goto.sent on"' "haicc host --flags log=verbose -- crud/read .: after the URI, that step's: the hop at host"
has "$out" '"event":"crud.read.query"' "and it held down the chain: the host's steps too"
has "$out" '"args":["crud/read","."]' "-- says where the next command starts: the command as it is"
out=$(haicc --raw host --flags log=debug -- haicc node-1 help/get . packages 2>&1)
has "$out" '"event":"help.get.index"' "log=debug through two hops: the node's internals"
has "$out" '"jump":["host","node-1"]' "under both jumps, in order"
out=$(haicc --raw . --flags log=verbose -- crud/read . 2>&1)
has "$out" '"event":"crud.read.query"' "haicc . --flags log=verbose -- crud/read .: at the root too"
out=$(haicc --raw . crud/read . --flags nope log=loud 2>&1); is "$?" "0" "a flag that is none, a value its flag does not take: the request done all the same"
has "$out" '"event":"request.flag"' "each ignored, with a warning in its log"
hasnt "$out" '"level":"verbose"' "and the log at info"
out=$(haicc --raw host --flags nope log=verbose -- crud/read . 2>&1); is "$?" "0" "a flag there is none of, before the --: the request done all the same"
has "$out" '"event":"request.flag"' "ignored, with a warning in the log"
has "$out" '"event":"crud.read.query"' "the others in force"
out=$(haicc host --flags log=debug crud/read . 2>&1 >/dev/null); is "$?" "1" "a list not closed where a command follows: exit 1"
has "$out" "no command after the flags of haicc (-- closes a flag list, the command follows it)" "said: only -- or the end of the command closes a list"
# the mrepo registry, in the boot mrepo: the mrepos it deployed, a node each
# by its unique URI, reached as a position; several torn down by a query
out=$(haicc --output registry/local crud/read '*' 2>&1)
has "$out" '"uri":["main","registry/local","host"]' "haicc registry/local crud/read '*': the host, in the mrepo registry by its unique URI"
has "$out" '"uri":"local/host","at":"host","how":"deployed","folder":"../local/host","package":"haiccing/base-component-haicc"' "what the install knows of it: which mrepo, linked where, how it came, where it is, what it came from"
is "$(haicc --output host crud/read registry 2>&1)" '[]' "no registry in the host: the boot mrepo keeps it"
# a continuation: a deploy asked for a script of its package answers with
# it, and the haicc command goes on with it: a command after the response
# of the one before
out=$(haicc . boot/deploy demo base-component-haicc --flags continuation=start 2>&1); is $? 0 "haicc . boot/deploy demo base-component-haicc --flags continuation=start: the deploy, then its script, each command done"
has "$out" '"continuation": {' "the deploy's response: its continuation, the script"
has "$out" 'haicc demo service/initialise' "each command of it said as it would be typed, written from the deployed mrepo's place"
has "$out" 'haicc demo service/start' "in order"
is "$(haicc --output demo crud/read . 2>&1)" '[{"uri":["main","."],"value":{},"children":[]}]' "the mrepo brought into service by it: its crud answering"
out=$(haicc . boot/deploy demo-2 base-component-haicc --flags continuation=nope 2>&1 >/dev/null); has "$out" "no script: nope (haiccing/base-component-haicc has start)" "a script the package has not: refused, with those it has"
[ ! -e "$T/home/work/mrepos/local/demo-2" ] && ok "nothing built for it" || no "nothing built for it"
is "$(haicc --output . boot/teardown demo 2>&1)" '{"tornDown":"demo"}' "torn down again"
haicc . boot/deploy extra-1 base-package-runtime >/dev/null 2>&1; haicc . boot/deploy extra-2 base-package-runtime >/dev/null 2>&1
[ -d "$T/home/work/mrepos/local/extra-1/inbox" ] && [ -d "$T/home/work/mrepos/local/extra-2/inbox" ] && ok "two more deployed, each at its place" || no "two more deployed"
is "$(haicc --output . boot/teardown "registry/local/*[starts-with(at,'extra')]" 2>&1)" '[{"tornDown":"extra-1"},{"tornDown":"extra-2"}]' "haicc . boot/teardown \"registry/local/*[starts-with(at,'extra')]\": the mrepos the query selects in the registry torn down"
[ ! -e "$T/home/work/mrepos/local/extra-1" ] && [ ! -e "$T/home/work/mrepos/local/extra-2" ] && [ -d "$T/home/work/mrepos/local/host" ] && ok "their folders removed, the host left" || no "their folders removed, the host left"
is "$(running | wc -l | tr -d ' ')" 3 "three runtimes running again"
# main is the default layer; layer=<name> changes it: the request records read
out=$(haicc --output . crud/read "done/*[value/value/protocol='boot']" --flags layer=request 2>&1); is "$?" "0" "haicc . crud/read \"done/*[...]\" --flags layer=request: the request layer read"
has "$out" '"uri":["request","done/' "records, each a file answered with its document, its URI at that layer"
has "$out" '"protocol":"boot"' "those the filter holds for"
hasnt "$out" '"protocol":"service"' "and no others"
out=$(haicc --output . --flags layer=request -- crud/read "done/*[value/value/protocol='boot']" 2>&1)
has "$out" '"uri":["request","done/' "the flag at the step: held for the command that follows"
is "$(haicc --output . crud/read 'done/*' 2>&1)" '[]' "without the flag: main, where there is no done"
out=$(haicc --output host crud/read 'done/*' --flags layer=request 2>&1)
has "$out" '"uri":["request","done/' "through a shortcut: the host's records, the routing still in main"
out=$(haicc --flags log=debug -- host crud/read . 2>&1 >/dev/null); is "$?" "2" "flags in front of the URI: refused, exit 2"
has "$out" "flags follow a URI: they are that step's" "said"

# 10. torn down: the node; the service stopped and shut down; the host
is "$(haicc --output host boot/teardown node-1 2>&1)" '{"tornDown":"node-1"}' "haicc host boot/teardown node-1"
is "$(haicc --output host service/stop 2>&1)" '{"service":"stopped","state":"initialised"}' "haicc host service/stop: stopped, the state initialised again"
out=$(haicc host boot/deploy node-2 base-package-runtime 2>&1 >/dev/null); is "$out" "haicc: not now: boot deploy (boot is not active; the service is initialised)" "stopped: its boot protocol deactivated, the door closed again"
out=$(haicc host crud/read . 2>&1 >/dev/null); is "$out" "haicc: not now: crud read (crud is not active; the service is initialised)" "and its crud protocol with it: behind the same door"
is "$(haicc --output host service/shutdown 2>&1)" '{"service":"shut down","state":"booted"}' "haicc host service/shutdown: shut down, the state booted again"
is "$(haicc --output . boot/teardown host 2>&1)" '{"tornDown":"host"}' "haicc . boot/teardown host: at the root, about the shortcut as an item"
[ ! -e "$T/home/work/mrepos/local/host" ] && ok "the host's folder removed" || no "the host's folder removed"
is "$(running | wc -l | tr -d ' ')" 1 "one runtime left: the boot mrepo's"

# 11. the boot again: there already, kept
out=$(haicc boot/deploy 2>&1); is $? 0 "haicc boot/deploy again"
has "$out" '"already":true' "already built: kept"
is "$(running | wc -l | tr -d ' ')" 1 "still one runtime"

# 12. the machine level torn down: every runtime stopped, what boot/deploy
# put in place removed; Bare, the sources and the scripts stay
haicc . boot/deploy host base-component-haicc >/dev/null 2>&1; is $? 0 "the host deployed again"
is "$(running | wc -l | tr -d ' ')" 2 "two runtimes running"
out=$(haicc boot/teardown 2>&1); is $? 0 "haicc boot/teardown"
has "$out" '"tornDown":".","runtimes":2' "said: the root torn down, two runtimes stopped"
is "$(running | wc -l | tr -d ' ')" 0 "no runtime left: the host's stopped with the boot mrepo's"
[ ! -e "$T/home/work/mrepos" ] && [ ! -e "$T/home/work/packages" ] && [ ! -e "$T/home/work/mrepo.json" ] && ok "the mrepos, the package store and the setting removed" || no "what boot/deploy put in place removed" "$(ls "$T/home/work")"
[ -x "$T/home/bare/bin/bare" ] && [ -f "$T/home/sources.list" ] && [ -x "$T/home/bin/haicc" ] && ok "Bare, the sources list and the scripts kept" || no "Bare, the sources list and the scripts kept"
haicc boot/teardown >/dev/null 2>&1; is $? 3 "torn down twice: nothing there, exit 3"
out=$(haicc boot/deploy 2>&1); is $? 0 "haicc boot/deploy after it: the boot mrepo back"
has "$out" '"repository":"boot"' "its runtime started"

if [ "$keep" != yes ]; then
  cleanup; trap - EXIT
  [ -z "$(running)" ] && ok "nothing left running" || no "nothing left running"
  [ ! -e "$T" ] && ok "its folder removed" || no "its folder removed"
fi
echo "# checks = $((n - failed))/$n pass"
if [ "$failed" -eq 0 ]; then echo "# ok"; exit 0; else echo "# not ok"; exit 1; fi
