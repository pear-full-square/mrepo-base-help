// The info of each package and of each component's mrepo, as a runtime
// extracts it (mrepo-base-info), in one HTML page to browse by keywords:
// each click answers as `haicc <mrepo> info/get <keywords>` would, the
// command shown. A package on its own is its own top, as its generic info
// test extracts it; a component's mrepo is its list, extracted together.
//   tools/bare tools/info-view.js [--sources=<folder>] [--out=<file>]
// The bundles from sources/ here; the page written to sources/info-view.html
// by default. Its page template: tools/lib/info-view.html.
import process from 'bare-process'
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'bare-fs'
import { join, resolve, dirname } from 'bare-path'
import { fileURLToPath } from 'bare-url'
import Bundle from 'bare-bundle'
import { extract } from '../pear-full-square/mrepo-base-info/index.js'

const dev = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const args = process.argv.slice(2)
const flag = (n, d) => args.find(a => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? d
const sources = resolve(flag('sources', join(dev, 'sources')))
const out = resolve(flag('out', join(sources, 'info-view.html')))
const WANTED = k => k.endsWith('/README.md') || k === '/package.json' || k === '/mrepo/packages/layer.json' || k === '/modules/third-party.json'

const read = pkg => {
  const b = Bundle.from(readFileSync(join(sources, `${pkg}.bundle`)))
  const files = {}
  for (const k of Object.keys(b.files)) if (WANTED(k)) files[k] = b.read(k)
  return { pkg, files, paths: Object.keys(b.files) }
}
// A target: its index, its problems; its pages into the shared set, each by
// its place in the info layer (a module's the same wherever it is carried).
const pages = {}
const target = (name, kind, packages, opts) => {
  const files = extract(packages, opts)
  for (const [p, bytes] of Object.entries(files)) if (p.endsWith('.md')) pages[p.slice(1)] = bytes.toString()
  return { name, kind, index: JSON.parse(files['/index.json'].toString()), problems: JSON.parse(files['/problems.json'].toString()) }
}
const targets = []
const components = ['base-component-docs', 'base-component-haicc', 'base-component-boot']
const mrepoName = { 'base-component-docs': 'docs', 'base-component-haicc': 'host', 'base-component-boot': '.' }
for (const c of components) {
  const list = JSON.parse(readFileSync(join(dev, 'haiccing', c, 'mrepo', 'packages', 'layer.json'))).packages
  targets.push({ ...target(`haiccing/${c}`, 'mrepo', list.map(read)), at: mrepoName[c] })
}
for (const n of readdirSync(join(sources, 'haiccing')).filter(f => f.endsWith('.bundle')).map(f => f.slice(0, -'.bundle'.length)).sort()) {
  targets.push({ ...target(`haiccing/${n}`, 'package', [read(`haiccing/${n}`)], { alone: true }), at: null })
}
const data = JSON.stringify({ made: new Date().toISOString(), targets, pages }).replace(/<\//g, '<\\/')
const page = readFileSync(join(dev, 'tools', 'lib', 'info-view.html'), 'utf8').replace('/*DATA*/null', () => data)
writeFileSync(out, page)
console.log(JSON.stringify({ out, targets: targets.length, pages: Object.keys(pages).length, bytes: page.length, problems: targets.reduce((n, t) => n + t.problems.length, 0) }))
