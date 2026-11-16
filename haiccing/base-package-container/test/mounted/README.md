# test/mounted/

The package's own test: its protocol as it is mounted, without an mrepo and without Docker.

The package's `protocol.js` is what a runtime loads. It is loaded here
and checked: what it provides, its config, and each action run on a
minimal execution in memory, up to where it would ask Docker.

## What it checks

- **What it provides**: one protocol, `container`, with a function for
  every action configured and no other.
- **Its config, value by value**: the package that brings it; `create`,
  `start`, `stop`, `remove` and `status`, each at the mrepo itself; no
  target, no arguments, no state.
- **No replica there**: `status` answers `none`; `start`, `stop` and
  `remove` say there is none; the replica each is about, as logged: its
  position, its unique URI, its folder, its container's name.
- **What create refuses** before anything is made: the position holding
  data of the mrepo's own, a replica there already, an mrepo without a
  unique URI.
- **Nothing forgotten**: the last test fails when the config names an
  action that was not run here, or one that wrote nothing into the
  request's log as it ran.

## Not here

A container: a replica made, started, reached, stopped and removed. That
is the module's own test, `mrepo-base-container`'s, with Docker: it runs
with this package's `full` set. The protocol in a running mrepo, a
command sent on into the container: the `haicc` command's end to end
test.
