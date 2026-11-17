# test-in-situ

A package's tests run inside a running mrepo, against the mrepo as it is deployed.

`runtime/run` runs a linked package's entry through its dispatcher, in
the mrepo's own runtime: the in-situ tests read the mrepo's info, its
layers and its packages as they are.

## Steps

```sh
# what a set would run, nothing run
haicc host runtime/run packages/haiccing/base-component-haicc/test/full dry-run
# the in-situ set: the mrepo checked as it is deployed
haicc host runtime/run packages/haiccing/base-component-haicc/test/validate-in-situ
# one module's tests, in a floating instance
haicc host runtime/run packages/haiccing/base-package-runtime/test/modules/pear-full-square/mrepo-base-runtime
```

## Notes

- **A unit a line** in the request's log; the result whole in its
  output.
- **A documented package is not run** (the docs mrepo's beyond its
  list): refused.
