# replica

Gives a swarm's node its replica in a container, and brings the replica into service.

The node is deployed and started (the how-to `deploy`). Docker is
needed: the replica is an mrepo built from the node's own package, run
in a container.

## Steps

```sh
# the replica made, and the container that will run it
haicc host haicc swarms/swarm-1/node-1 container/create
# the container started: the replica's runtime runs in it
haicc host haicc swarms/swarm-1/node-1 container/start
# the replica made ready and its door opened, reached through its node
haicc host haicc swarms/swarm-1/node-1 haicc container service/initialise
haicc host haicc swarms/swarm-1/node-1 haicc container service/start
# the check: the node says its container runs
haicc host haicc swarms/swarm-1/node-1 container/status
```

## After

Before the node is torn down its replica is removed: `boot/teardown`
does not know of containers.

```sh
haicc host haicc swarms/swarm-1/node-1 container/remove
haicc host boot/teardown swarms/swarm-1/node-1
```
