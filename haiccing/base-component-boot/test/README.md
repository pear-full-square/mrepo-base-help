# test/

The boot component's tests: one of its own, `boot`, and the generic ones, a folder each.

## Links

- [boot](boot/)
- [info](info/)
- [code](code/)
- [mrepo](mrepo/)
- [package](package/)
- [modules](modules/)
- [info-in-situ](info-in-situ/)
- [mrepo-in-situ](mrepo-in-situ/)

## Sets

| set | tests |
|---|---|
| `validate` | `boot`, `info`, `code`, `mrepo`, `package` |
| `validate-in-situ` | `info-in-situ`, `mrepo-in-situ`: run in a running mrepo with `runtime run` |
| `full` | `boot`, `info`, `code`, `mrepo`, `package`, `modules` |

## Sources

`SOURCES`: the sources folder `boot/` needs (the packages' bundles, this
component's among them); else the development repository's `sources/`;
without it, skipped.
