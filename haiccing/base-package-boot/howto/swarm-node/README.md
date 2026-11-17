# swarm-node

A swarm's node deployed: a child in a swarm of its own rather than its parent's.

A child is in its parent's swarm (`local`), unless a node above it says
it is a swarm, `{"kind":"swarm"}`: then it is that swarm's node, its
unique URI `<swarm>/<name>`, by the swarm node's name. The swarm's node
is made first.

## Steps

```sh
# the swarm's node made first, its document saying it is a swarm
haicc host crud/create swarms/swarm-1 '{"kind":"swarm"}'
# the node deployed in it: swarm-1/node-1
haicc host boot/deploy swarms/swarm-1/node-1 base-component-haicc
# torn down at the same position
haicc host boot/teardown swarms/swarm-1/node-1
```

## Notes

- **The swarm `local`** is refused as a swarm's name: it is the
  machine's own.
- **Where the swarm's node is** is the structure's: `swarms/` is the
  haicc component's way, any position works.
