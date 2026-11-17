# file

Executes the lines of a file of the mrepo, where the URI points, as haicc/script executes them.

`haicc <URI> haicc/file <file>`: the file a path from the mrepo's root,
its layer first: a hook file, `runtime/hooks/initialise.haicc`. A file
on the terminal's machine goes with `haicc/script`, on stdin.

## Signature

`file(exec, { uri, args })`: requested as `haicc/file <file>`.

## Arguments

1. The file: a path from the mrepo's root, its layer first. Required.

## Returns

As `script`: `[{ line, output }]`.

## Errors

- No file named: `missing argument: file`.
- A path that leaves the mrepo (`/`, `..`): `not a file of this mrepo`.
- No file there: `no file: <file>`.
- Those of `script`.
