# registry

The install's mrepos listed from the registry, queried, and torn down by a query.

The boot mrepo keeps the mrepo registry in its `main`, at `registry`: a
node each mrepo it or its children deployed, by unique URI, with where
it is on this machine, the package it came from and what runs it.

## Steps

```sh
# what is deployed on this machine
haicc . crud/read "registry/local/*"
# only those with a runtime
haicc . crud/read "registry/local/*[runtime/pid]"
# those deployed from one package, torn down
haicc . boot/teardown "registry/local/*[package='haiccing/base-package-runtime']"
# every one the query selects, torn down
haicc . boot/teardown "registry/local/*"
```

## Notes

- **A teardown by a query** tears each one down at the position that
  links to it, and answers with the list, empty when nothing is
  selected.
