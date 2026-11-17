# base-package-info

The info protocol: an mrepo's pages, extracted from the packages it links and read by keywords from the top down.

Every README of an mrepo's packages is a page, addressed by the menus
that lead to it from the top: the README of the mrepo's own package.
An mrepo that links this package has an `info` layer; `info/extract`
fills it, `info` answers a page and the keywords below it.

## Links

- [extract](modules/pear-full-square/mrepo-base-info/external/extract/)
- [get](modules/pear-full-square/mrepo-base-info/external/get/)
- [mrepo](mrepo/)
- [test](test/)
- [test-reports](test-reports/)
- [modules](modules/)

## Commands

```
haicc host info
haicc host info/get boot
haicc host info/get boot/deploy
haicc host info/extract
```

- `info`, or `info/get [<keywords>]`, the keywords where the URI is,
  no dot: nothing asked, the top page and
  the keywords below it; a keyword path, its page, each keyword below
  with its one-liner. A keyword with several meanings answers each, a
  choice.
- `info/extract`: the info layer written again from the linked packages,
  with its problems. Run by a hook, where the help is extracted.

## Config

The `info` protocol's, in `protocol.js`: `get`, its default action, its
keywords where the URI is (`**`); `extract`, at the mrepo itself; no
state.

## Package

- `protocol.js`: the `info` protocol, its config and its actions, from
  `mrepo-base-info`.
- `main.js`: the dispatcher, the bundle's main, generated.

Written from [splectrum/splectrum-dev-env-3-mycelium](https://github.com/splectrum/splectrum-dev-env-3-mycelium).
