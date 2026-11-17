# base-package-container

The container protocol: an mrepo's replica made in a container, started, stopped and removed.

An mrepo that links it can be given a replica in a Docker container: an
mrepo built from its own package, run by Bare inside the container, its
unique URI the mrepo's with `container` behind it. The mrepo on the host is the bridgehead: it links
its replica at the position `container` and reaches it as any linked
mrepo. This is how a swarm node gets its container.

## Links

- [test](test/)
- [test-reports](test-reports/)
- [modules](modules/)

## Commands

```
haicc host haicc swarms/swarm-1/node-1 container/create
haicc host haicc swarms/swarm-1/node-1 container/start
haicc host haicc swarms/swarm-1/node-1 container/status
haicc host haicc swarms/swarm-1/node-1 haicc container service/initialise
haicc host haicc swarms/swarm-1/node-1 container/stop
haicc host haicc swarms/swarm-1/node-1 container/remove
```

- `container/create`: the replica built beside the mrepos, under the
  work folder's `containers/`, and its container made, not started. The
  first one on a machine builds the image, for which Docker pulls its
  base.
- `container/start`: the container started; answered when the replica's
  runtime runs in it.
- `container/status`: `none`, `created`, `running`, `exited`; `gone`
  when the container was removed outside this protocol.
- `container/stop`: the container stopped; it can be started again.
- `container/remove`: the container, the replica's folder and its link
  removed, whether it runs or not.

Every action is requested at the mrepo itself: the one whose replica it
is about. `start`, `stop` and `status` can be repeated.

## How to

Give a swarm's node its container, and reach the mrepo in it. The host
is in service and has the swarm's node in its `main`.

```
haicc host boot/deploy swarms/swarm-1/node-1 base-component-haicc
haicc host haicc swarms/swarm-1/node-1 service/initialise
haicc host haicc swarms/swarm-1/node-1 service/start
haicc host haicc swarms/swarm-1/node-1 container/create
haicc host haicc swarms/swarm-1/node-1 container/start
haicc host haicc swarms/swarm-1/node-1 haicc container service/initialise
haicc host haicc swarms/swarm-1/node-1 haicc container service/start
haicc host haicc swarms/swarm-1/node-1 haicc container crud/read .
```

The node is the bridgehead: a standard mrepo on the host. Started, its
`container` protocol is open. `container/create` and `container/start`
make its replica and run it; from then on `haicc container` at the node
sends a command on into the container, as it would to any linked mrepo.
`base-component-haicc`'s script `cluster` does this for two nodes.

Before the node is torn down, its replica is removed: `boot/teardown`
does not know of containers.

```
haicc host haicc swarms/swarm-1/node-1 container/remove
haicc host boot/teardown swarms/swarm-1/node-1
```

## Needs

Docker, its daemon running, on Linux. Without it every action but a
`status` of an mrepo without a replica fails: `no Docker`.

## Config

In `protocol.js`, the package's: the five actions at the mrepo itself.

## Package

- `protocol.js`: the `container` protocol, its config and its actions,
  from `mrepo-base-container`.
- `main.js`: the dispatcher, the bundle's main, generated.
- No structure of its own: the replica's node is made in `main`, its
  link's record in the `links` layer, both the runtime package's.
