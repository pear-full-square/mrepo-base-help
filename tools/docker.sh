#!/bin/sh
# Docker's daemon made sure to answer, for what makes containers (the
# container protocol's tests, the cluster in the haicc command's test). In
# a cloud session Docker is installed but no daemon runs when it starts.
#   sh tools/docker.sh
# Answering already: said, nothing started. Else dockerd is started in the
# background (as root; its log in the system's temporary folder) and waited
# for. It does not survive the session's container.
# exit 0 answering, 3 not to be started from here
set -eu
answers () { docker version --format '{{.Server.Version}}' 2>/dev/null; }
if v=$(answers) && [ -n "$v" ]; then echo "docker: $v, answering"; exit 0; fi
command -v dockerd >/dev/null 2>&1 || { echo 'docker: no dockerd here: start Docker yourself' >&2; exit 3; }
[ "$(id -u)" = 0 ] || { echo 'docker: not root: start Docker yourself' >&2; exit 3; }
log=${TMPDIR:-/tmp}/dockerd.log
nohup dockerd >"$log" 2>&1 &
i=0
while [ "$i" -lt 60 ]; do
  if v=$(answers) && [ -n "$v" ]; then echo "docker: $v, started (its log: $log)"; exit 0; fi
  sleep 0.5 2>/dev/null || sleep 1
  i=$((i + 1))
done
echo "docker: its daemon did not answer (its log: $log)" >&2
exit 3
