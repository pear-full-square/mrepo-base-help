# /howto

The mrepo's how-tos, extracted from the packages it links: what can be done here, by activity.

There where the mrepo links `base-package-howto`, which brings the
layer and the `howto` protocol.

```
/howto/index.json                  { "<activity>": [{ howto, oneliner, package }] }
/howto/<activity>/<name>.json      one how-to: its title, its one-liner, its package,
                                   where its README is in the help, its steps
/howto/problems.json               the how-tos against their form
```

## Usage

- **Written by `howto/extract`**, an ordinary action, run by a hook
  where the help is extracted: at `boot` where the mrepo has no service,
  at the service's `initialise` where it has one.
- **Read with `howto`**, or `howto/get . [<activity> |
  <activity>/<name>]`: the activities here, an activity's how-tos, or
  one how-to's steps, each a command as typed at this mrepo, with why.
- **A how-to comes from a package**: a folder `howto/<name>/` there,
  its README, with a line `Activity: <word>` and its steps in one `sh`
  block. Its README is in `/help` too, as every README.
- **What is here is what the packages brought**: an activity exists
  because a how-to declares it.
