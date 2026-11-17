# test/

The package's tests: the generic ones, a folder each, and `none`, its answer to what it tests of its own.

The generic ones come with the template: `help`, `code`, `mrepo`,
`package`, `modules`, `help-in-situ`, `mrepo-in-situ`.

## Links

- [none](none/)
- [help](help/)
- [code](code/)
- [mrepo](mrepo/)
- [package](package/)
- [modules](modules/)
- [help-in-situ](help-in-situ/)
- [mrepo-in-situ](mrepo-in-situ/)

## Sets

| set | tests |
|---|---|
| `validate` | `none`, `help`, `code`, `mrepo`, `package` |
| `validate-in-situ` | `help-in-situ`, `mrepo-in-situ`: run in a running mrepo with `runtime run` |
| `full` | `none`, `help`, `code`, `mrepo`, `package`, `modules` |
