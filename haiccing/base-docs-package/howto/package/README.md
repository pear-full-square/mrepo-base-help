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
cp -a haiccing/<candidate> haiccing/<new>
rm -f haiccing/<new>/test-reports/full.*
# brought to the current template: the generic tests, test-reports/, the pin
sh tools/package-template.sh <new>
# its name and description: package.json (name, description, modules); its README, a menu
$EDITOR haiccing/<new>/package.json haiccing/<new>/README.md
# what the candidate had and the new one does not: removed
git rm -r haiccing/<new>/<what is not its own>
# the check: its pre-release, built, its full set run, its report written
tools/bare tools/package-test.js haiccing/<new>
```

## Notes

- **Its own test**: the candidate's replaced by one of the new
  package's: a package tests what it provides.
- **Its repository** is created by the human; pushed with
  `sh tools/packages.sh -m "<what>" <new>`.
- **What it implements** (its patterns) each has a how-to of its own,
  here: follow those too.
