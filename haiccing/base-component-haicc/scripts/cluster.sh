# cluster: a host with a swarm of two nodes, each with its replica in a
# container, run for the host (HAICC_AT). Docker is needed; the containers
# are left running.
set -e
at=$HAICC_AT
haicc "$at" service/initialise
haicc "$at" service/start
# the swarm: a node whose document says it is one
haicc "$at" crud/create swarms/swarm-1 '{"kind":"swarm"}'
for node in node-1 node-2; do
  n=swarms/swarm-1/$node
  haicc "$at" boot/deploy "$n" base-component-haicc
  haicc "$at" haicc "$n" service/initialise
  haicc "$at" haicc "$n" service/start
  haicc "$at" haicc "$n" container/create
  haicc "$at" haicc "$n" container/start
  haicc "$at" haicc "$n" haicc container service/initialise
  haicc "$at" haicc "$n" haicc container service/start
done
haicc "$at" crud/read "swarms/swarm-1/*"
