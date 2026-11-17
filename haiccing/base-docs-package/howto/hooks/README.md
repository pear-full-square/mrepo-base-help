# hooks

Hooks: the commands an mrepo runs on a status transition, a file each.

Pattern: hooks

A hook is a file in `mrepo/runtime/hooks/<transition>/`, holding one
command, its parts. `boot` is fired by the runtime as it starts, in name
order, before the inbox is read; `initialise`, `start`, `stop`,
`shutdown` by the service. Laid in from the package that defines the
mrepo only.

## Steps

```sh
# a protocol opened at boot: what the mrepo offers always
echo '["protocol/activate", ".", "info"]' > haiccing/<pkg>/mrepo/runtime/hooks/boot/activate-info.json
# its info extracted as it is made ready (initialise where it has a service, boot where not)
echo '["info/extract"]' > haiccing/<pkg>/mrepo/runtime/hooks/initialise/info-extract.json
# behind the service's door: opened at start, closed at stop
echo '["protocol/activate", ".", "boot"]' > haiccing/<pkg>/mrepo/runtime/hooks/start/activate-boot.json
# the check: its own test runs every hook it brings, and fails on one left out
SOURCES=$PWD/sources tools/bare haiccing/<pkg>/test/configured/run.js
```

## Notes

- **The protocol protocol is never opened**: activating is the hooks'
  business, not a request from outside.
