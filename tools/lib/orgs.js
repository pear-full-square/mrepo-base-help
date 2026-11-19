// The organisations of the packages here, each built, released and
// sourced by itself (haiccing/base-docs-haicc, "Platforms"): haicc's own
// and the three platforms'. One list, read by every tool.
//   name       its folder here and its GitHub organisation
//   template   the repository its packages are brought to: the input
//              source of tools/package-template.sh
//   depends    the organisations its packages may depend on beyond
//              itself; a list (a top-level inclusion) names its own
//              organisation's packages only
// A package is named fully qualified, <org>/<package>, always.
import { readFileSync, readdirSync, existsSync } from 'bare-fs'
import { join } from 'bare-path'

export const ORGS = [
  { name: 'haiccing', template: 'haiccing/base-docs-package', depends: [] },
  { name: 'splectral', template: 'haiccing/base-docs-package', depends: ['haiccing'] },
  { name: 'myctral', template: 'haiccing/base-docs-package', depends: ['haiccing'] },
  { name: 'myctrans', template: 'haiccing/base-docs-package', depends: ['haiccing'] }
]

export const orgOf = name => ORGS.find(o => o.name === name) ?? null

// The organisations with a folder here, in the list's order: [name...].
export const orgsHere = dev => ORGS.map(o => o.name).filter(o => existsSync(join(dev, o)))

// The packages here, <org>/<package>: each folder of an organisation's
// with a package.json (keep: (org, package, package.json) -> whether).
export function packagesHere (dev, keep = () => true) {
  return orgsHere(dev).flatMap(org => readdirSync(join(dev, org)).sort().filter(p => {
    const f = join(dev, org, p, 'package.json')
    return existsSync(f) && keep(org, p, JSON.parse(readFileSync(f, 'utf8')))
  }).map(p => `${org}/${p}`))
}

// A list's references against its organisation: [problem...]. A list
// names fully qualified packages of its own organisation only.
export function checkList (org, packages) {
  const out = []
  for (const p of packages) {
    const [o, n] = String(p).split('/')
    if (!n) out.push(`not fully qualified: ${p} (<org>/<package>)`)
    else if (o !== org) out.push(`another organisation's package in the list: ${p} (a list names ${org}'s only)`)
  }
  return out
}
