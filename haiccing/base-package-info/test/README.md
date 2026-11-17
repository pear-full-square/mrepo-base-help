# test/

The info package's tests: one of its own, `mounted`, and the generic ones, a folder each.

The generic ones come with the template: `help`, `code`, `mrepo`,
`package`, `modules`, `help-in-situ`, `mrepo-in-situ`.

## Links

- [mounted](mounted/)
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
| `validate` | `mounted`, `help`, `code`, `mrepo`, `package` |
| `validate-in-situ` | `help-in-situ`, `mrepo-in-situ`: run in a running mrepo with `runtime run` |
| `full` | `mounted`, `help`, `code`, `mrepo`, `package`, `modules` |
