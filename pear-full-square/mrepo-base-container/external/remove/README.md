# remove

Removes the replica: its container, running or not, its folder and its link.

What `create` made is taken away, in that order: the container, the
replica's folder, then its shortcut, its node and its link's record in
this mrepo.

## Signature

`remove(exec)`: requested as `container/remove`, at the mrepo itself.

## Returns

`{ removed, container }`: the position, `container`, and the
container's name.

## Errors

- No replica: `no replica`. The position `container` holding data of
  the mrepo's own is said as that.
- No Docker daemon answers: `no Docker`.
- The container is not removed.

## Design

- A container that is gone already is no error: the rest is removed.
- A running container is not stopped first: it is killed with its
  removal.
