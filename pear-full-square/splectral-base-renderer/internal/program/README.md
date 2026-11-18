# program

The renderer as a program: what a component's `start` hook starts with `runtime/start`, until it is ended.

## Signature

`program(argv)`: `--dir=<the mrepo's folder>`, `--runtime=<pid>`,
`--state=<file>`, as `runtime/start` hands them.

## Returns

Resolves when it has ended.

## Errors

- No `--dir` or no `--state`.
- What `load` throws: no component installed, a package missing, none
  answering pages.

## Design

- **What runtime/start asks of a program**: its state written, whole,
  with its `pid`, once it follows its inbox (`{ pid, component, pages,
  started }`); removed as it ends; ended by SIGTERM, SIGINT, its mrepo's
  folder gone or its runtime ended.
- **Splectral's side only**: it reads the component's Splectral inbox and
  writes its Splectral outbox; the mrepo's own boxes are its runtime's.
