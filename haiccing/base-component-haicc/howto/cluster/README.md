# cluster

A host with a swarm of two nodes, each with its replica in a container, deployed by one command.

The component's script `cluster` is the deploy's continuation: the host
brought into service, `swarms/swarm-1` made, `node-1` and `node-2`
deployed and each given its running replica, then the swarm's nodes
read. Docker is needed; the containers are left running.

## Steps

```sh
# the host and its cluster: every command of the script done in turn
haicc . boot/deploy host base-component-haicc --flags continuation=cluster
# the swarm's nodes, and one node's container
haicc host crud/read "swarms/swarm-1/*"
haicc host haicc swarms/swarm-1/node-1 container/status
# taken down: each replica removed before its node, then the host
haicc host haicc swarms/swarm-1/node-1 container/remove
haicc host haicc swarms/swarm-1/node-2 container/remove
haicc . boot/teardown host
```

## Notes

- **Only the host, in service**: the script `start`
  (`--flags continuation=start`).
