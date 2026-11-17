# replica

Gives a swarm's node its replica in a container, and brings the replica into service.


## Steps

```sh
# the replica: an mrepo built from the node's own package, and a container that will run it; Docker is needed
haicc swarms/swarm-1/node-1 container/create
# the container started: the replica's runtime runs in it
haicc swarms/swarm-1/node-1 container/start
# the replica made ready, reached through its node
haicc swarms/swarm-1/node-1 haicc container service/initialise
# and its door opened
haicc swarms/swarm-1/node-1 haicc container service/start
# the check: the node says its container runs
haicc swarms/swarm-1/node-1 container/status
```

## Before

The node is deployed and started: `node/deploy`.

## After

Before the node is torn down its replica is removed:
`haicc swarms/swarm-1/node-1 container/remove`.
