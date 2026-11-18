# test/

The viewer package's tests: one of its own, `mounted`, and the generic ones, a folder each.

## Links

- [mounted](mounted/)
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
| `validate` | `mounted`, `info`, `code`, `mrepo`, `package` |
| `validate-in-situ` | `info-in-situ`, `mrepo-in-situ`: for a package run in an mrepo; a Splectral package runs in its component's renderer, where these do not apply |
| `full` | `mounted`, `info`, `code`, `mrepo`, `package`, `modules` |
