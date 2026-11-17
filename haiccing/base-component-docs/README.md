# base-component-docs

The docs component: the docs mrepo, the platform's documentation, deployed in the boot mrepo and read with info.

The docs mrepo holds the documentation packages and the `info` protocol,
and documents every other package the sources offer: the install's
manual. It is deployed in the boot mrepo, at `docs`, as part of the boot
install; its runtime extracts its pages as it starts. Every other mrepo
answers about itself, what is deployed in it; the whole platform is read
here.

## Links

- [mrepo](mrepo/)
- [test](test/)
- [test-reports](test-reports/)
- [modules](modules/)

## Included packages

- [base-package-runtime](../base-package-runtime/)
- [base-package-protocol](../base-package-protocol/)
- [base-package-info](../base-package-info/)
- [base-docs-haicc](../base-docs-haicc/)
- [base-docs-hdlc](../base-docs-hdlc/)
- [base-docs-package](../base-docs-package/)
- [base-docs-uri](../base-docs-uri/)
- [base-docs-xpath](../base-docs-xpath/)
- [base-docs-vision](../base-docs-vision/)

## Documented

Beyond its list, `"documents": "sources"`: every package the sources
offer, placed as documentation only (its bundle; nothing laid in, nothing
run), each at its keyword below the top: `haicc docs info/get boot`.
What is installed is what is documented; later the solution's list
names them.

## Deploying

By the boot mrepo, with a command at the root, until the boot install
does it. No service: its boot hooks activate `info` and extract it.

```
haicc . boot/deploy docs base-component-docs
haicc docs info/get
haicc docs info/get hdlc
```

## Package

- No protocol and no code of its own: `main.js` is the dispatcher, the
  bundle's main, generated; it offers the tests.
