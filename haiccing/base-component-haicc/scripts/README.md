# scripts/

The scripts of base-component-haicc: scripts to go on with after a deploy, their lines simple commands.

Asked for with the deploy, by name, a script is answered as the deploy's
continuation, and the `haicc` command sends it on, `haicc/script`, to
the deployed mrepo: its lines, each a simple command, executed there,
the first that fails ending it.

```
haicc . boot/deploy host base-component-haicc --flags continuation=start
```

| script | |
|---|---|
| `start.haicc` | the mrepo brought into service: `service/initialise`, then `service/start` |
| `cluster.haicc` | a host with a swarm of two nodes, each with its container: the mrepo brought into service, `swarms/swarm-1` created in its `main`, its document saying it is a swarm; `node-1` and `node-2` deployed below it from this component (`swarm-1/node-1`, `swarm-1/node-2`), each brought into service, its replica made in a container and started, and the replica brought into service through its node; then the swarm's nodes read |

## Cluster

`cluster.haicc` is where the swarm cluster we work towards is written
down as it grows: what runs today is in it; what a swarm still needs
(a node made a swarm node, the nodes finding each other) is added as it
is built. It needs Docker: the `container` protocol makes real
containers. It leaves them running: each is removed with
`container/remove` at its node, before the node is torn down.
