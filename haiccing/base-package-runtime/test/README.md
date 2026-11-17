# test/

The runtime package's tests: one of its own, `start`, and the generic ones, a folder each.

## Links

- [start](start/)
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
| `validate` | `start`, `info`, `code`, `mrepo`, `package` |
| `validate-in-situ` | `info-in-situ`, `mrepo-in-situ`: run in a running mrepo with `runtime run` |
| `full` | `start`, `info`, `code`, `mrepo`, `package`, `modules` |
