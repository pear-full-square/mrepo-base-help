# base-component-viewer

The info viewer, Splectral's first component: an mrepo's info read in a browser as the command line reads it.

A component is an app on Splectral: an mrepo Splectral deploys, this
list laid on top of it. Its pages are served at its position:
`/viewer/hdlc/validation` is `haicc docs info/get hdlc/validation`,
drawn; `?at=host` reads another mrepo; the docs mrepo by default. The
human sees what the AI reads on the command line.

## Links

- [mrepo](mrepo/)
- [howto](howto/)
- [test](test/)
- [test-reports](test-reports/)
- [modules](modules/)

## Included packages

- [base-package-renderer](../base-package-renderer/)
- [base-package-ui](../base-package-ui/)
- [base-package-viewer](../base-package-viewer/)

## Installing

```sh
haicc splectral boot/deploy viewer base-package-service
haicc splectral splectral/install viewer splectral/base-component-viewer
haicc splectral/viewer service/initialise
haicc splectral/viewer service/start
```

Then `http://127.0.0.1:4400/viewer/`. Its service stopped, its renderer
ends and its pages are not answered; `haicc splectral boot/teardown
viewer` removes it.
