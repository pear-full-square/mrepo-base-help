# hooks

Hooks: the commands an mrepo runs on a status transition, a file a transition.

Pattern: hooks

A transition's hooks are one file, `mrepo/runtime/hooks/<transition>.haicc`:
lines, each a simple command, standing at `main` as one typed from outside
does. The runtime runs them as the mrepo's own internal requests, one
after the other, the first that fails ending it. `boot` is run by the
runtime as it starts, before anything else is taken from the inbox;
`initialise`, `start`, `stop`, `shutdown` by the service, the transition
waiting for its lines. Laid in from the package that defines the mrepo
only.

## Steps

```sh
# what the mrepo offers always: opened as it starts
cat > haiccing/<pkg>/mrepo/runtime/hooks/boot.haicc <<'END'
# boot: run by the runtime as it starts, a line a command
protocol/activate . info
protocol/activate . runtime
protocol/activate . service
END
# its info extracted as it is made ready
printf 'info/extract\n' > haiccing/<pkg>/mrepo/runtime/hooks/initialise.haicc
# behind the service's door: opened at start, closed at stop
printf 'protocol/activate . boot\n' > haiccing/<pkg>/mrepo/runtime/hooks/start.haicc
printf 'protocol/deactivate . boot\n' > haiccing/<pkg>/mrepo/runtime/hooks/stop.haicc
# the check: its own test walks every line it brings, and fails on one left out
SOURCES=$PWD/sources tools/bare haiccing/<pkg>/test/configured/run.js
```

## Notes

- **Waited for**: `service/start` answers once its lines are done, so a
  command sent after it finds the door open.
- **The mrepo's own**: each line is a request of its own, recorded,
  tagged `trigger: internal`; not held at the door (a hook opens it).
- **The protocol protocol** is opened by the runtime itself as it
  starts; a hook does not open it.
