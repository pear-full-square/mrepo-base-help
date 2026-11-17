# base-package-protocol

The protocol protocol: it activates and deactivates the protocols an mrepo offers to the outside.

Every protocol of the packages an mrepo links is loaded when its runtime
starts. A request from outside is accepted only for a protocol that is
active, and nothing is active by default. `protocol/activate` opens one,
`protocol/deactivate` closes it again. They are run from the hooks of the
mrepo's status transitions, which the package that defines the mrepo drops
into its runtime layer.

## Links

- [test](test/)
- [test-reports](test-reports/)
- [modules](modules/)

## Hooks

A hook is a file holding one command, its parts:

```
/runtime/hooks/boot/activate-info.json       ["protocol/activate", ".", "info"]
/runtime/hooks/start/activate-boot.json      ["protocol/activate", ".", "boot"]
/runtime/hooks/stop/deactivate-boot.json     ["protocol/deactivate", ".", "boot"]
```

- `boot`: what the mrepo always offers. Fired by the runtime as it starts.
- `start` and `stop`: what sits behind the service's door. Fired by the
  service.

## Active protocols

The active set is the `protocols` layer: one file a protocol,
`/protocols/<protocol>.json`, holding its config. The `protocol` protocol
itself is not activated by default: opening and closing protocols is the
hooks' business, not a request from outside.

## Config

In `protocol.js`, the package's: both actions at `.`, the mrepo itself,
their argument the protocol's name.

## Package

- `protocol.js`: the `protocol` protocol, its config and its actions,
  from `mrepo-base-protocol`.
- `main.js`: the dispatcher, the bundle's main, generated.
- No structure of its own: the `protocols` layer is the runtime package's.
