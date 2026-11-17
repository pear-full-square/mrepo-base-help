# swarm-node

A swarm's node deployed: a child in a swarm of its own rather than its parent's.

One name below `main`, a child is in its parent's swarm (`local`). At
`swarms/<swarm>/<name>` it is that swarm's node, its unique URI
`<swarm>/<name>`; the swarm's node is made first.

## Steps

```sh
# the host brings swarms/; the swarm's node made first
haicc host crud/create swarms/swarm-1
# the node deployed in it: swarm-1/node-1
haicc host boot/deploy swarms/swarm-1/node-1 base-component-haicc
# torn down at the same position
haicc host boot/teardown swarms/swarm-1/node-1
```

## Notes

- **The swarm `local`** is refused as a swarm's name: it is the
  machine's own.
