# base-package-protocol

The protocol protocol: it activates and deactivates the protocols an mrepo offers to the outside.

Every protocol of the packages an mrepo links is loaded when its runtime
starts. A request from outside is accepted only for a protocol that is
active, and nothing is active by default. `protocol/activate` opens one,
`protocol/deactivate` closes it again. They are run from the hooks of the
mrepo's status transitions, which the package that defines the mrepo drops
into its runtime layer.

## Links

- [activate](modules/pear-full-square/mrepo-base-protocol/external/activate/)
- [deactivate](modules/pear-full-square/mrepo-base-protocol/external/deactivate/)
- [test](test/)
- [test-reports](test-reports/)
- [modules](modules/)

## Hooks

The protocols are opened and closed by the hooks' lines, a file a
transition (`mrepo/runtime/hooks/<transition>.haicc`):

```
boot.haicc     protocol/activate . info
start.haicc    protocol/activate . boot
stop.haicc     protocol/deactivate . boot
```

- `boot`: what the mrepo always offers, run by the runtime as it starts.
- `start` and `stop`: what sits behind the service's door, run by the
  service.

## Active protocols

The active set is the `protocols` layer: one file a protocol,
`/protocols/<protocol>.json`, holding its config. The `protocol` protocol
itself is opened by the runtime as it starts; for base it is open to
the outside too (the restrictions lifted), each request tagged by its
trigger.

## Config

The `protocol` protocol's, in `protocol.js`; no state.

| action | offered at | arguments |
|---|---|---|
| `activate` | `.`, the mrepo itself | the protocol's name |
| `deactivate` | `.`, the mrepo itself | the protocol's name |

## Package

- `protocol.js`: the `protocol` protocol, its config and its actions,
  from `mrepo-base-protocol`.
- `main.js`: the dispatcher, the bundle's main, generated.
- No structure of its own: the `protocols` layer is the runtime package's.
