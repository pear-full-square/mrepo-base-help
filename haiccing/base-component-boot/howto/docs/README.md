# docs

The docs mrepo deployed in the boot mrepo: the install's documentation, read with info.

The docs mrepo documents every package the sources offer
(`base-component-docs`). It is deployed at `docs`, beside the host, as
part of the boot install.

## Steps

```sh
# the docs mrepo, from the docs component
haicc . boot/deploy docs base-component-docs
# its front page, and a page by its keywords
haicc docs info/get
haicc docs info/get boot/deploy
# torn down when it is no longer wanted
haicc . boot/teardown docs
```
