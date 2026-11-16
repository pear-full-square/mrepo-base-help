# scripts/

The scripts of base-component-haicc: lists of commands to go on with after a deploy.

Asked for with the deploy, by name, a script is answered as the deploy's
continuation, and the `haicc` command runs it: one command after the
response of the one before. Its commands are written from the deployed
mrepo's own place, each a list of its parts.

```
haicc . boot/deploy host base-component-haicc --flags continuation=start
```

| script | |
|---|---|
| `start.json` | the mrepo brought into service: `service/initialise`, then `service/start` |
