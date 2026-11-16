# /registry

The mrepos this mrepo deployed, an entry each: what this machine knows of it. Atomic.

There where the boot protocol is linked (`base-package-boot` brings the
layer). `main` holds the link to an mrepo, the shortcut, and nothing
else, since `main` replicates. What is local to this machine is here.

## An entry

A node by the mrepo's unique URI, `<swarm>/<name>`:

```
/registry/local/host/.node.json
{
  "uri": "local/host",
  "at": "host",
  "folder": "../local/host",
  "package": "haiccing/base-component-haicc",
  "packages": ["haiccing/base-package-help", "..."],
  "layers": { "main": "...", "...": "..." },
  "runtime": { "pid": 4242 }
}
```

- `uri`: its unique URI.
- `at`: the position in `main` that links to it.
- `folder`: where it is on this machine, from this mrepo's own folder.
  An mrepo is placed by its unique URI under the work folder's
  `mrepos/`, side by side with the others.
- `package`, `packages`, `layers`: what it was deployed from.
- `runtime`: the process running it, when it has one.

## Written and read

- **Written by the boot protocol only**: `boot/deploy` adds the entry,
  `boot/teardown` removes it, `boot/redeploy` does both.
- **Where a shortcut leads** is read here: a command sent on at a
  shortcut goes to the folder its entry names.
- **Read as any layer of nodes**, with the flag that names the layer:

```
haicc . crud/read "local/*" --flags layer=registry
haicc . crud/read "local/*[runtime/pid]" --flags layer=registry
haicc . boot/teardown "local/*" --flags layer=registry
```

The last tears down every mrepo the query selects, each at its position.

## Not yet

A shortcut to an mrepo that was not deployed here (linked); which
shortcuts lead to an mrepo, the other way round; a swarm's nodes in
containers, which are not registered here.
