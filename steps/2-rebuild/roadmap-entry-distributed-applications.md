# Roadmap entry, drafted: distributed applications on p2p

A draft for `splectrum/roadmap-1`, for the human to add there (that
repository is not attached to the cloud session). Drafted 2026-11-18 from
`distributed-applications.md` and the vision's "Distributed
applications" (`base-docs-vision`). A direction with its order, not yet
phases: each step gets its own design before it becomes a phase request.

---

## Distributed applications on p2p

**Direction.** Applications on p2p built from three types of component,
each a pillar with a platform of its own and its standard packages in an
organisation of its own, with haicc on top as one way of working across
them:

| Pillar | Organisation | Its components |
|---|---|---|
| Data | `myctral` | data repositories: validate, merge and commit mycelium's data structures, immutable at their base, built on the streaming layer |
| Transformation | `myctrans` | processing components: transform, prepare changes, manage the processing; processing state, not data |
| Interaction | `splectral` | the boundary with anything outside: people through a UI, agents, systems, devices, timers |

An application is a haicc repository at the top that deploys the three
platforms; the platforms deploy the components. Streaming applications
on immutable change records; a conflict negotiated between the data
repository and the processing component; one writer and one reader per
channel, each channel's transport chosen for it alone; upgrades
active-passive.

**Why.** One way of working from the terminal to the browser to the data;
a separation of concerns that lets each area build up its own core
packages; the same pattern on one machine, in a container and across
nodes.

**Where it stands.** Splectral's proof of concept (an app platform, a
component in two halves, the info viewer) built and reviewed: sound, seven
findings. The pair deploy (a node on its own haicc install in a
container) built and validated.

**The order**, each step its own design first:

1. **Splectral, the terminal equivalent.** Components that issue commands
   through the server; the proof of concept's findings fixed (a stop that
   could signal another process, readers that delete from the writer's
   box, a hook replaced silently, an install that cannot be retried, an
   unhandled error).
2. **A component deployed in two parts.** haicc creates the mrepo and
   hands it over to the platform; two runtimes, one writer per layer;
   one install shape for every platform.
3. **`myctral`, its core.** A data repository that validates, merges and
   commits mycelium's data structures; the forms of a proposed change and
   of a refusal; the negotiation.
4. **`myctrans`, its core.** Transformation that prepares changes and
   manages the processing; proposed: the pipeline engine as its core.
5. **An application repository** deploying the three platforms.
6. **Distribution.** Components as pairs in containers, then one
   Hypercore per channel direction for a component on another node.

**Not now.** Speed (patterns later: caching, data linked into a
component's mrepo, the RPC server); the organisations' repositories (the
human creates them when the first package of each is due).

**References.** The vision, `base-docs-vision`, "Distributed
applications" and "Organisations"; the design,
`splectrum/splectrum-dev-env-3-mycelium`,
`steps/2-rebuild/distributed-applications.md` and the doc "Distributed
applications on haicc" (https://claude.ai/artifact/73tvSUZoir4CsYdTCpiVxx).
