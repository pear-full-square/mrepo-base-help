# program

A program beside an mrepo: a placed package's `/run` entry started as its own process by a hook, ended with the runtime.

Pattern: program

A package with a `run.js` is a program. An mrepo starts one beside
itself with `runtime/start . <path>`, the package by its path in the
mrepo's folder, and ends it with `runtime/stop . <path>`; a hook does
both, so the program follows the mrepo's service. A Splectral
component's program is one: its `start` hook starts it.

## Steps

```sh
# the program: run.js, its work in a module; what runtime/start hands it
#   --dir=<the mrepo's folder> --runtime=<pid> --state=<file>
$EDITOR <org>/<pkg>/run.js
# what it does in return: its state written whole (with its pid) once it
# is up, removed as it ends; ended by SIGTERM, with its runtime, or when
# the mrepo's folder is gone
# started and ended by the hooks of the package that defines the mrepo
printf 'runtime/start . <path>\n' > <org>/<component>/mrepo/runtime/hooks/start.haicc
printf 'runtime/stop . <path>\n' > <org>/<component>/mrepo/runtime/hooks/stop.haicc
# by hand, at an mrepo, to see it
haicc <position> runtime/start . <path>
haicc <position> runtime/stop . <path>
```

## Notes

- **Its state** is `<path>.state.json` in the mrepo's folder, beside its
  bundle: this machine's, not a layer's. `runtime/start` waits up to ten
  seconds for it, and answers it; started already, it answers it again.
- **Not inside the runtime**: `runtime/run` runs a package's entries in
  the runtime's process and refuses `/run`; a program is a process of
  its own, started through the shell in its own session.
- **A teardown leaves none**: the mrepo's runtime stopped, the program
  ends by itself.
