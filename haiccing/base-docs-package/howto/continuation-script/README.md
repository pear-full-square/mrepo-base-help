# continuation-script

A continuation script: commands to go on with after a deploy, a file in scripts/.

Pattern: continuation-script

A package's `scripts/<name>.json` is a list of commands, each its
parts, written from the deployed mrepo's own place. Asked for with the
deploy, by name, it is answered as the deploy's continuation and the
`haicc` command runs it: one command after the response of the one
before.

## Steps

```sh
# the script: the commands, each a list of its parts
echo '[["service/initialise"], ["service/start"]]' > haiccing/<pkg>/scripts/start.json
# its README: scripts/, each script with what it does
$EDITOR haiccing/<pkg>/scripts/README.md
# the check: deployed with it, every command of the script done
haicc . boot/deploy <name> <pkg> --flags continuation=start
```

## Notes

- **A script stops at the first command that fails**, saying which.
