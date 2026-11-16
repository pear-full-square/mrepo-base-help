# base-package-howto

The howto protocol: an mrepo's how-tos by activity, extracted from the packages it links, listed and read.

A how-to is where an activity starts: what do you want to do here, and
how. An mrepo that links this package has a `howto` layer.
`howto/extract` fills it from the how-tos its packages carry;
`howto` answers what can be done here, an activity's how-tos, or one
how-to's steps as typed commands, each with why.

| | |
|---|---|
| [mrepo/](mrepo/) | its part of the structure: the howto layer |
| [test/](test/) | its tests: its protocol as mounted, and the generic ones |
| [test-reports/](test-reports/) | the report of its last pre-release |
| [modules/](modules/) | its code, assembled: ours and the third-party code |

## Commands

```
haicc host howto
haicc host howto/get . node
haicc host howto/get . node/deploy
haicc host howto/extract
```

- `howto`, or `howto/get . [<activity> | <activity>/<name>]`: nothing
  asked, the activities here, each with its how-tos' one-liners; an
  activity, its how-tos; one how-to, its steps: each a command as it is
  typed at this mrepo, with why; the last is the check that proves it
  worked. What is not there is said, with what there is.
- `howto/extract`: the howto layer written again from the linked
  packages. Run by a hook, where the help is extracted.

## Writing one

A how-to lives in the package it is about: a folder `howto/<name>/`,
its README.

````
# deploy

Deploys a node in a swarm of this host and brings it into service.

Activity: node

## Steps

```sh
# the swarm's place, in this mrepo's main
haicc . crud/create swarms/swarm-1
# the check: it is there
haicc . crud/read swarms/swarm-1
```
````

- **`Activity: <word>`**: one line. The how-to is then `node/deploy`:
  its activity, its folder's name.
- **One `sh` block**: each command as typed at the mrepo that holds the
  how-to (`.` is that mrepo), the `#` line above it saying why.
- **The last step is the check**: its why starts with `the check`.
- The folder `howto/` has a README of its own, linking each how-to, as
  every folder has.

`howto/extract` says how many how-tos are against this form
(`problems`); they are in the layer's `problems.json`.

## Package

- `protocol.js`: the `howto` protocol, its config and its actions, from
  `mrepo-base-howto`.
- `main.js`: the dispatcher, the bundle's main, generated.

Written from [splectrum/splectrum-dev-env-3-mycelium](https://github.com/splectrum/splectrum-dev-env-3-mycelium).
