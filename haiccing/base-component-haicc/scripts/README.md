# scripts/

The scripts of base-component-haicc: shell scripts to go on with after a deploy.

Asked for with the deploy, by name, a script is answered as the deploy's
continuation, and the `haicc` command runs it with `sh`: `HAICC_AT` the
deployed mrepo's position, `haicc` on the `PATH`; `set -e`, so the first
command that fails ends it.

```
haicc . boot/deploy host base-component-haicc --flags continuation=start
```

| script | |
|---|---|
| `start.sh` | the mrepo brought into service: `service/initialise`, then `service/start` |
| `cluster.sh` | a host with a swarm of two nodes, each with its container: the mrepo brought into service, `swarms/swarm-1` created in its `main`, its document saying it is a swarm; `node-1` and `node-2` deployed below it from this component (`swarm-1/node-1`, `swarm-1/node-2`), each brought into service, its replica made in a container and started, and the replica brought into service through its node; then the swarm's nodes read |

## Cluster

`cluster.sh` is where the swarm cluster we work towards is written
down as it grows: what runs today is in it; what a swarm still needs
(a node made a swarm node, the nodes finding each other) is added as it
is built. It needs Docker: the `container` protocol makes real
containers. It leaves them running: each is removed with
`container/remove` at its node, before the node is torn down.
