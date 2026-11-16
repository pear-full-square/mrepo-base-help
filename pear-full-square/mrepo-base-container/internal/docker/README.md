# docker

The one part that talks to Docker: its command line, called and answered.

Everything the actions ask of Docker goes through here, so there is one
place that knows how.

## Signature

- `docker(...args)`: the `docker` command run with those arguments.
- `available()`: whether Docker is there and its daemon answers.
- `imageOf(bare)`: the image for a Bare binary, built when it is not
  there.
- `stateOf(name)`: a container's state, by its name.

## Returns

- `docker`: `{ ok, out, err }`: whether it ended with 0, what it wrote,
  trimmed. A command that is not there is `ok: false`, its error in `err`.
- `available`: the daemon's version.
- `imageOf`: `{ image, built }`: the image's name, `haicc-node:<hash>`,
  the first twelve characters of the binary's sha256; `built` when it
  was made now.
- `stateOf`: `created`, `running`, `paused`, `exited`, as Docker says;
  `null` when there is no such container.

## Errors

- `available`: `no Docker`, with what the command said.
- `imageOf`: the image was not built.

## Design

- The image is a plain base, `debian:bookworm-slim`, with the Bare
  binary copied in and made its entry point: no code of ours. Its
  Dockerfile is written when the image is built, and not kept.
- Docker pulls the base when it has none: the one download.

## Also exported

`IMAGE`: `haicc-node`, the image's name without its tag.
