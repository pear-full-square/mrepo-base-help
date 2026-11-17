# test/

The docs component's tests: one of its own, `configured`, and the generic ones, a folder each.

The generic ones come with the template: `help`, `code`, `mrepo`,
`package`, `modules`, `help-in-situ`, `mrepo-in-situ`.

## Links

- [configured](configured/)
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
| `validate` | `configured`, `help`, `code`, `mrepo`, `package` |
| `validate-in-situ` | `help-in-situ`, `mrepo-in-situ`: run in a running mrepo with `runtime run` |
| `full` | `configured`, `help`, `code`, `mrepo`, `package`, `modules` |
