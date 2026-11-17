# app

An app: a program run with Bare from its bundle, its entry run.js.

Pattern: app

An app is a package with a `run.js` and neither a protocol nor a list:
the bundle's `/run` entry. It is started from the machine, not deployed
in an mrepo: the `haicc` command is one.

## Steps

```sh
# cloned from the app (the package how-to)
cp -a haiccing/base-app-haicc haiccing/<new>
# run.js: the program, its arguments; its work in a module of its own
$EDITOR haiccing/<new>/run.js
# its own test: the app as a process, its output
$EDITOR haiccing/<new>/test/command/command.test.js
# the check: run from its bundle
tools/bare tools/release.js && tools/bare sources/haiccing/<new>.bundle --help
```

## Notes

- **What it reaches** it reaches as the outside does: the `haicc` app
  writes a request into the boot mrepo's inbox and reads its answer
  from the outbox.
