# stop

Stops the replica's container: its runtime asked to end, and ended.

The container's process gets SIGTERM, on which the runtime closes; it
is killed when it has not ended after ten seconds. The container and
the replica's folder stay: `container/start` runs it again.

## Signature

`stop(exec)`: requested as `container/stop`, at the mrepo itself.

## Returns

`{ stopped, container, state }`: the position, `container`; the
container's name; its state, `exited`. A container that does not run is
left as it is and answered with its state.

## Errors

- No replica: `container/create` first.
- No Docker daemon answers: `no Docker`.
- Its container is gone: removed outside this protocol.
- The container does not stop.
