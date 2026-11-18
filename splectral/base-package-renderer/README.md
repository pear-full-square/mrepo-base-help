# base-package-renderer

A Splectral component's renderer: the light process that runs its packages over its Splectral boxes.

Every Splectral component lists it first. Its program, `run.js`, is
started by the component's `start` hook with `runtime/start` and ended
by its `stop` hook, and with its runtime.

## Links

- [internal](modules/pear-full-square/splectral-base-renderer/internal/)
- [test](test/)
- [test-reports](test-reports/)
- [modules](modules/)

## What it does

It loads the component's packages from its Splectral side as the runtime
loads protocols, takes each page the Splectral server asks for, has the
component's own action make it (its elements called in this process, its
data asked of the platform) and writes the page back.

```sh
bare <bundle> --dir=<the mrepo's folder> --runtime=<pid> --state=<file>
```


## Package

- `run.js`: the program, the bundle's `/run` entry.
- `main.js`: the dispatcher, the bundle's main, generated.
