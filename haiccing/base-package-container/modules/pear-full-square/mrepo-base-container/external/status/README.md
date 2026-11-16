# status

Says the state of the replica's container, as Docker has it now.

## Signature

`status(exec)`: requested as `container/status`, at the mrepo itself.

## Returns

- No replica: `{ replica: null, state: "none" }`.
- A replica: `{ replica, mrepo, container, image, state }`: the position
  it is linked at, its unique URI, its container's name and image, and
  the state: `created`, `running`, `paused`, `exited`; `gone` when the
  container was removed outside this protocol.

## Errors

- No Docker daemon answers, where there is a replica: `no Docker`.
