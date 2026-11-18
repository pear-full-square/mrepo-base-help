# test/program/

The package's own test: its program, `run.js`, as a component's start hook starts it.

## What it checks

- **Started as `runtime/start` starts it** (`--dir`, `--runtime`,
  `--state`), against a component's Splectral side made in a temporary
  folder: an element set's bundle and the component's own, its record.
- **Its state**, written once it follows its inbox: what answers its
  pages.
- **A page made over the boxes**: asked in its inbox, its data asked in
  its outbox and answered as the server answers it, the page in its
  outbox, made by the component's own action with its element.
- **Ended with its runtime**, its state removed.

## Not here

A component installed on a running Splectral, its renderer started by
its hook: the `haicc` command's end to end test, `splectral.sh`.
