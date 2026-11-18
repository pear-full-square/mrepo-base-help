# element-set

An element set: a package of the splectral family with UI elements only, each called by name in a component's renderer.

Pattern: element-set

An element set is a protocol package, its protocol named for the set
(`ui`), each element an action. A component lists the set; its renderer
loads it and its own action calls an element by name. An element is a
function: data in, a page or a part of one out, its style with it; it
fetches nothing.

## Steps

```sh
# cloned from this one (the package how-to): a module for its code
cp -a splectral/base-package-ui splectral/<new>
cp -a pear-full-square/splectral-base-ui pear-full-square/<module>
# the module: an element a folder, external/<element>/ (index.js, README.md)
$EDITOR pear-full-square/<module>/external/<element>/index.js
# protocol.js: the set's protocol, an element an action: uris ['.'], args
$EDITOR splectral/<new>/protocol.js
# its own test: every element drawn
$EDITOR splectral/<new>/test/mounted/mounted.test.js
# the check: its pre-release
tools/bare tools/package-test.js splectral/<new>
```

## Notes

- **An element is called, never requested**: `exec.element('ui/page',
  input)` in the component's action, in the renderer's process: no
  request, no record.
- **Signature**: `(exec, { args: [input, ...] })`, its answer HTML.
- **Self-contained**: the set carries its own modules; two components
  that draw with it each list it.
