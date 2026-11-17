# base-linux-haicc

The first step of haicc on Linux: sh scripts that install the command, put Bare in place and start the app.

The `haicc` command is an app run with Bare, `haiccing/base-app-haicc`.
Bare cannot fetch itself, so what has to work before it is on the machine
is here, in plain POSIX sh: the installer, linking a sources folder,
putting Bare in place. From then on `haicc` starts the app for
everything else.

## Links

- [howto](howto/)
- [bin](bin/)
- [test](test/)

## Install

`haicc-install.sh` carries the scripts and the pins, nothing else:
`--home=<folder>` is haicc's own folder, `~/.haicc` by default;
`--bin=<folder>` is where the command is registered, not the install's
own `bin/`. Then the sources:
downloaded over https, or a sources folder linked. The how-to `install`.

## Commands

| its own, in sh | |
|---|---|
| `haicc sources link <folder>` | a local folder linked as a source, not copied: Bare's runtime and the packages come from it |
| `haicc sources download bare` | Bare's runtime fetched over https into haicc's own sources folder, checked against its pin |
| `haicc sources download haiccing` | the packages fetched over https into the same folder: the manifest from `base-linux-haicc`'s latest release, then each package's bundle and addons from its own release (`r-<commit>`), each checked against the manifest (sha256); the manifest written last. `HAICC_RELEASES` names another base than `https://github.com/haiccing` |
| `haicc prereq [--check]` | what the command needs to start, checked: the platform, the tools, a source holding the app, Bare; Bare unpacked from the sources |
| `haicc --help` | these, then the app's when it can be started |

Anything else goes to the app as it is typed: `<bare> <the app's bundle>
/run <arguments>`, the bundle taken from the first linked folder that
holds it. Until Bare and the app are there, it says what is missing and
exits 3.

## Folders

```
~/.haicc/
  bin/            the scripts
  pins            the pinned Bare, the organisation, the app's package
  sources.list    the sources registered, the app's list too
  sources/        what haicc sources download fetched: Bare, the packages
  bare/           Bare, unpacked by haicc prereq
  work/           the app's work folder
  scripts/        the install's scripts: <name>.haicc, <org>/<package>/<name>.haicc
```

`HAICC_HOME` names another folder.

## Network

Only `haicc sources download` reaches the network. An install from
a linked sources folder is offline and repeats exactly.

## Not yet

- One platform is pinned: `linux-x64`.
- The app's bundle is taken from the sources as it is: not checked
  against its manifest.

## Package

- `bin/`: the scripts. `pins`: what they are pinned to.
- `build.sh`: writes `haicc-install.sh` from `bin/` and `pins`. Run it
  after a change to either.
- `haicc-install.sh`: the installer, generated.
