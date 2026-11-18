# splectral-base-renderer

A Splectral component's renderer: the light process that runs its packages over its Splectral inbox and outbox.

A component is an mrepo with Splectral's side laid on top: its packages
in its folder, `splectral/`, beside a Splectral inbox and outbox linked
with the Splectral server and nothing else. The renderer is the process
on that side. Offered by `splectral/base-package-renderer`, its program.

## Links

- [internal](internal/)
- [test](test/)

## What it does

It loads the component's packages as the runtime loads protocols, takes
each page the server asks for from the inbox, has the top package's
`page` action make it (its elements called in this process, its data
asked of the platform through the outbox) and writes the page back.
Started by the component's `start` hook (`runtime/start`), ended by its
`stop` hook, and with its runtime.


## Tests

- `brittle-bare test/*.test.js` (Bare installed): a component's packages loaded, a page made over the boxes with its data, an element, an error, the program's state.
