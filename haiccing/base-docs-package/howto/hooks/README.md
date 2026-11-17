# hooks

Hooks: the commands an mrepo runs on a status transition, a file each.

Pattern: hooks

A hook is a file in `mrepo/runtime/hooks/<transition>/`: a shell
script, `<name>.sh`, calling `haicc` for the mrepo itself, run by the
runtime with `sh` while the transition waits for it; or, the form of
before, `<name>.json`, one command, its parts, run in the transition's
own execution. `boot` is fired by the runtime as it starts, in name
order, before the inbox is read; `initialise`, `start`, `stop`,
`shutdown` by the service. Laid in from the package that defines the
mrepo only.

## Steps

```sh
# a protocol opened at boot: what the mrepo offers always
echo '["protocol/activate", ".", "info"]' > haiccing/<pkg>/mrepo/runtime/hooks/boot/activate-info.json
# its info extracted as it is made ready: shell, straight into its own inbox (HAICC_MREPO)
echo 'haicc . info/extract' > haiccing/<pkg>/mrepo/runtime/hooks/initialise/info-extract.sh
# behind the service's door: opened at start, closed at stop
echo '["protocol/activate", ".", "boot"]' > haiccing/<pkg>/mrepo/runtime/hooks/start/activate-boot.json
# the check: its own test runs every hook it brings, and fails on one left out
SOURCES=$PWD/sources tools/bare haiccing/<pkg>/test/configured/run.js
```

## Notes

- **A shell hook is waited for**: `service/initialise` answers once its
  shell hooks have ended, what they sent in executed; one that stops
  with another exit code fails the transition.

- **The protocol protocol is never opened**: activating is the hooks'
  business, not a request from outside.
