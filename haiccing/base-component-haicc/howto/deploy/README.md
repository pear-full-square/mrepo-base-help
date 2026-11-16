# deploy

Deploys a node of a swarm in this host and brings it into service.

Activity: node

## Steps

```sh
# the swarm's place in this mrepo's main: a node below swarms
haicc . crud/create swarms/swarm-1
# the node: an mrepo of its own, built from the haicc component; its position names its swarm, so it is swarm-1/node-1
haicc . boot/deploy swarms/swarm-1/node-1 base-component-haicc
# made ready: its help and its how-tos extracted
haicc swarms/swarm-1/node-1 service/initialise
# its door opened
haicc swarms/swarm-1/node-1 service/start
# the check: the node answers with its root
haicc swarms/swarm-1/node-1 crud/read .
```

## Then

A node can be given its replica in a container: `container/replica`.
