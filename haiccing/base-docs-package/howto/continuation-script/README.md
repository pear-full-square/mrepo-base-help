# continuation-script

A continuation script: commands to go on with after a deploy, a file in scripts/.

Pattern: continuation-script

A package's `scripts/<name>.haicc` holds lines, each a simple command,
written from the deployed mrepo's own place. Asked for with the deploy,
by name, it is answered as the deploy's continuation, and the `haicc`
command sends it on to the root, `haicc/script <the deployed mrepo>
'<lines>'`: the lines run there, one after the other.

## Steps

```sh
# the script: commands for the deployed mrepo, from its own place
cat > haiccing/<pkg>/scripts/start.haicc <<'END'
# start: the mrepo brought into service
service/initialise
service/start
END
# its README: scripts/, each script with what it does
$EDITOR haiccing/<pkg>/scripts/README.md
# the check: deployed with it, every line done
haicc . boot/deploy <name> <pkg> --flags continuation=start
```

## Notes

- **The first line that fails** stops the script and fails the command,
  saying which line.
- **The deployed mrepo need not link the haicc protocol**: the root runs
  the script, each line a hop to it.
