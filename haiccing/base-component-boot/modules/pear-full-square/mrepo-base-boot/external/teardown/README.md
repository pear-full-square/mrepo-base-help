# teardown

Stops a child mrepo's runtime and removes the child, its node, its shortcut and its link's record.

The runtime is asked to stop over its socket; still running, it gets
SIGTERM, then SIGKILL, each waited for until the process has ended. How
it stopped is logged.

## Signature

`teardown(exec, { uri })`: requested as `boot/teardown <name>`. `uri`
is `["main", "<name>"]`.

Several at once: a URI into the mrepo registry (the boot mrepo's, in
its `main`) selects mrepos there by unique URI, and each is torn down
at the position that links to it:

```
haicc . boot/teardown "registry/local/*"
haicc . boot/teardown "registry/local/*[package='haiccing/base-package-runtime']"
```

## Returns

`{ tornDown }`: the position as written at `main`, `<name>`. With a URI
into the registry: a list of them, empty when nothing is selected.

## Errors

- No target, `main` itself or the root: `missing argument: target`.
- The child is not deployed; or the position exists locally, which the
  boot protocol cannot target.
- Its runtime does not stop.

## Design

The folder's removal is outside the repository: a reset does not undo it.
