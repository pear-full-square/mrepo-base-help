# structure

Structure given to an mrepo's `main`: nodes created with their documents, read back, removed.

A node is a folder in `main` with its document. Creating one makes
every node above it; each action can be repeated without changing
anything the second time.

## Steps

```sh
# a node and its parent: swarms made empty, swarm-1 with its document
haicc . crud/create swarms/swarm-1 '{"size":3}'
# again, with another value: there already, left as it is (no update)
haicc . crud/create swarms/swarm-1 '{"size":9}'
# read back: the node, its document, its children's names
haicc . crud/read swarms
haicc . crud/read swarms/swarm-1
# removed: a node with children only with recurse
haicc . crud/delete swarms recurse
# in another mrepo: the same, at its shortcut
haicc host crud/create swarms/swarm-1
```

## Notes

- **A shortcut is a node**: read, it shows where its data comes from;
  deleted, the link goes, not the mrepo it leads to (`boot/teardown`).
