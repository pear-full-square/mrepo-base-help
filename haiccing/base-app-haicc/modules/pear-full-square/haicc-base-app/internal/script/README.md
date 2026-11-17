# script

Runs a continuation's script with sh and says its output, a line at a time.

The script is shell text calling `haicc`, answered beside a command's
output. It runs as `sh -c <script>`, with the environment it is given:
`HAICC_AT`, the position it is run for, and `haicc` on the `PATH`.

## Signature

`script(text, { env, io })`: `env`, the environment of the shell;
`io`, where its lines go (`out`, `err`).

## Returns

A promise of the shell's exit code: `0`, every command of the script
done; another, where it stopped.
