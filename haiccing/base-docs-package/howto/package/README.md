# package

A new package, from the best candidate among the packages there are.

Pattern: package

A new package is a clone of the package closest to it, not built from
nothing: one that runs and passes is the closest start. The candidate:
the same kind (the patterns it implements), the same parts, then the
most recent pin and a current report.

## Steps

```sh
# the candidate copied, its report not: the new package has none yet
cp -a <org>/<candidate> <org>/<new>
rm -f <org>/<new>/test-reports/full.*
# brought to its organisation's current template: the generic tests, test-reports/, the pin
sh tools/package-template.sh <org>/<new>
# its name and description: package.json (name, description, modules); its README, a menu
$EDITOR <org>/<new>/package.json <org>/<new>/README.md
# what the candidate had and the new one does not: removed
git rm -r <org>/<new>/<what is not its own>
# the check: its pre-release, built, its full set run, its report written
tools/bare tools/package-test.js <org>/<new>
```

## Notes

- **Its own test**: the candidate's replaced by one of the new
  package's: a package tests what it provides.
- **Its repository** is created by the human; pushed with
  `sh tools/packages.sh -m "<what>" <org>/<new>`.
- **Fully qualified**: a package is named `<org>/<package>` everywhere,
  its organisation one of `tools/lib/orgs.js`.
- **What it implements** (its patterns) each has a how-to of its own,
  here: follow those too.
