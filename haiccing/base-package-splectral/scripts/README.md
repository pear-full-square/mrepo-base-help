# scripts/

The scripts of base-package-splectral: shell scripts to go on with after a deploy.

Asked for with the deploy, by name, a script is answered as the deploy's
continuation, and the `haicc` command runs it with `sh`, `HAICC_AT` the
deployed mrepo's position.

```
haicc . boot/deploy splectral base-package-splectral --flags continuation=start
```

| script | |
|---|---|
| `start.sh` | the mrepo brought into service: `service/initialise`, then `service/start`, which starts its server |
