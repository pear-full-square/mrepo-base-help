# script

Executes a script's lines, each a simple command, where the URI points, one after the other.

`haicc <URI> haicc/script '<lines>'`: the lines as one argument, a shell
multi-line string, or, with none, from stdin (a heredoc). Each line is
executed as if typed at that position: `haicc host haicc/script` runs
`service/initialise` as `haicc host service/initialise`.

## Signature

`script(exec, { uri, args })`: requested as `haicc/script <lines>`.

## Arguments

1. The lines. Required. Blank lines and `#` comments are skipped; a line
   is split into words as the shell splits them.

## Returns

`[{ line, output }]`: each line and what it answered.

## Errors

- No command among the lines: `missing argument: script`.
- A quote not closed.
- A line that fails: `line <n>: <line>: <its error>`; nothing after it
  runs.

## Design

- **Each line its own request**, through the mrepo's own inbox, tagged
  as its own (`trigger: internal`); the script's request waits for them
  (`exec.wait`), the runtime free meanwhile. A line that hops is a hop
  like any other.
- **Forward only**: the lines stand where the script was sent; from
  there a URI reaches that position and what is below it.
