# test/

The package's tests: the generic ones, a folder each, and `none`, its answer to what it tests of its own.

The generic ones come with the template: `info`, `code`, `mrepo`,
`package`, `modules`, `info-in-situ`, `mrepo-in-situ`.

## Links

- [none](none/)
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
| `validate` | `none`, `info`, `code`, `mrepo`, `package` |
| `validate-in-situ` | `info-in-situ`, `mrepo-in-situ`: run in a running mrepo with `runtime run` |
| `full` | `none`, `info`, `code`, `mrepo`, `package`, `modules` |
