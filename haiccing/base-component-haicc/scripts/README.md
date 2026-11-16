# scripts/

The scripts of base-component-haicc: lists of commands to go on with after a deploy.

Asked for with the deploy, by name, a script is answered as the deploy's
continuation, and the `haicc` command runs it: one command after the
response of the one before. Its commands are written from the deployed
mrepo's own place, each a list of its parts.

```
haicc . boot/deploy host base-component-haicc --flags continuation=start
```

| script | |
|---|---|
| `start.json` | the mrepo brought into service: `service/initialise`, then `service/start` |
| `cluster.json` | a host with a swarm's place and two nodes: the mrepo brought into service, `swarms/swarm-1` created in its `main`, `node-1` and `node-2` deployed from this component and each brought into service, then the host read |

## Cluster

`cluster.json` is where the swarm cluster we work towards is written
down as it grows: what runs today is in it; what a swarm still needs
(a node made a swarm node, its replica in a container, the nodes
finding each other) is added as it is built.
