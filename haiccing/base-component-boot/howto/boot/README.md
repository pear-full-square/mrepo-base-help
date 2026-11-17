# boot

The boot: the boot mrepo put in place on a machine, its runtime started, and run again.

The `haicc` command runs this component's program from the sources once
they are linked and Bare is in place (`haicc prereq`). The boot mrepo is
the root: every command is addressed to it. It deploys nothing by
itself.

## Steps

```sh
# the sources linked, Bare put in place from them
haicc sources link <folder>
haicc prereq
# the boot mrepo built, its packages placed, its runtime started
haicc boot/deploy
# what it is: its info, extracted by its boot hooks
haicc . info/get
# every runtime of the install stopped, what the boot put in place removed (Bare, the sources, the scripts kept)
haicc boot/teardown
# booted again: the boot mrepo built anew, its runtime started
haicc boot/deploy
```

## Notes

- **Run as a program**, the same: `bare base-component-boot.bundle
  --work=<folder> --sources=folder:<sources>`, with `--until-done` or
  `--follow` to watch its requests (the README, "Options").
