# test/mounted/

The package's own test: its protocol as it is mounted, without an mrepo.

The package's `protocol.js` is what a runtime loads. It is loaded here
and checked: what it provides, its config, the layer it brings, and each
action run on a minimal execution.

## What it checks

- **What it provides**: one protocol, `howto`, with a function for every
  action configured and no other.
- **Its config, value by value**: the package that brings it; `get`,
  its default action, and `extract`, both at the mrepo itself; what
  `get` is asked, optional; no state, no target.
- **Its structure**: the howto layer it brings, atomic.
- **`extract`**: from small bundles written for the test: the how-tos
  of two packages by activity, a document each, the index, a how-to
  against its form counted; run again, nothing written; a URI other
  than the mrepo itself, refused.
- **`get`**: nothing extracted yet, said; then the activities, an
  activity's how-tos, one how-to with its steps; what is not there
  said, with a warning.
- **Nothing forgotten**: the last test fails when the config names an
  action that was not run here, or one that wrote nothing into the
  request's log as it ran.

## Not here

The how-tos in a running mrepo: extracted by a hook where the help is,
and read with commands through the inbox. That is the `haicc` command's
end to end test.
