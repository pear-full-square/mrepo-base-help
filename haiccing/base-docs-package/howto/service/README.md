# service

A service-managed mrepo: its state booted, initialised, started, moved by the service protocol.

Pattern: service

An mrepo with `mrepo/runtime/service.json` is service managed: it
starts `booted`; `service/initialise`, `start`, `stop`, `shutdown` move
it, each running its transition's hooks first. What sits behind its
door is activated at `start`.

## Steps

```sh
# its state as it starts
echo '{ "state": "booted" }' > haiccing/<pkg>/mrepo/runtime/service.json
# the service protocol in its list, before the package that defines it
$EDITOR haiccing/<pkg>/mrepo/packages/layer.json
# deployed, then brought into service
haicc . boot/deploy <name> <pkg>
haicc <name> service/initialise
# the check: started, its door open
haicc <name> service/start
```

## Notes

- **The service's own actions** are each allowed in a state: their
  config's `states`.
