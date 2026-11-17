# continuation-script

A continuation script: a shell script to go on with after a deploy, a file in scripts/.

Pattern: continuation-script

A package's `scripts/<name>.sh` is shell text calling `haicc`. Asked for
with the deploy, by name, it is answered as the deploy's continuation,
and the `haicc` command runs it with `sh`: `HAICC_AT` the deployed
mrepo's position, `haicc` on the `PATH`, printing as the command does.

## Steps

```sh
# the script: commands for the deployed mrepo, the first that fails ending it
cat > haiccing/<pkg>/scripts/start.sh <<'END'
set -e
haicc "$HAICC_AT" service/initialise
haicc "$HAICC_AT" service/start
END
# its README: scripts/, each script with what it does
$EDITOR haiccing/<pkg>/scripts/README.md
# the check: deployed with it, every command of the script done
haicc . boot/deploy <name> <pkg> --flags continuation=start
```

## Notes

- **A script that stops** with another exit code fails the command,
  saying so; what it printed until then stays.
- **A script's own deploys** may answer with continuations: their
  `haicc` runs them.
