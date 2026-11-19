# lifecycle

An mrepo brought into service and back: made ready, its door opened, closed, shut down.

A service-managed mrepo starts `booted`. Each action is allowed in one
state and moves it on; its hooks do the work of the transition.

## Steps

```sh
# made ready: its initialise hooks, its info extracted
haicc host service/initialise
# its door opened: its start hooks activate what is behind it (boot)
haicc host service/start
# what is behind the door now allowed
haicc host boot/deploy node-1 haiccing/base-package-runtime
haicc host boot/teardown node-1
# its door closed again: boot refused until the next start
haicc host service/stop
# back to booted
haicc host service/shutdown
```

## Notes

- **An action in the wrong state** is refused, `not now`, with the
  state the service is in: `not now: service start (the service is
  started)`.
- **Behind the door**: `boot` and `crud` in a host, refused while it is
  not started.
