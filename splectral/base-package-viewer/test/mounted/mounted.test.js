// The package as it is mounted: its protocol.js, what a component's
// renderer loads through the dispatcher's /protocol entry (imported here
// directly: this test is itself run by the dispatcher), its config value
// by value, and its action run on a minimal execution as the renderer
// hands one (its data and its element stand-ins). Every action the config
// names must be run here: the last test fails when one was left out.
import test from '../../modules/node_modules/brittle/index.js'
import * as mounted from '../../protocol.js'

const ran = new Set()
function execution (answer) {
  const asked = []
  return { asked, data: async (at, command) => { asked.push([at, ...command]); if (answer instanceof Error) throw answer; return answer }, element: async (name, input) => `${name}: ${input.title}`, log () {} }
}
const act = (name, exec, form) => { ran.add(name); return mounted.actions.viewer[name](exec, form) }

test('loaded as a renderer loads it: one protocol, viewer, its config and its action', (t) => {
  t.alike(Object.keys(mounted.protocols), ['viewer'], 'the package provides the viewer protocol, and no other')
  t.alike(Object.keys(mounted.actions.viewer).sort(), Object.keys(mounted.protocols.viewer.actions).sort(), 'a function for every action configured, and no other')
})

test('its config, value by value', (t) => {
  const cfg = mounted.protocols.viewer
  t.is(cfg.package, 'splectral/base-package-viewer')
  t.ok(cfg.description)
  t.alike(Object.keys(cfg.actions), ['page'], 'one action: page, what the renderer answers pages with')
  t.alike([cfg.actions.page.uris, 'args' in cfg.actions.page, !!cfg.actions.page.description], [['**'], false, true], 'page: any keywords below the component; no argument')
})

test('page: the keywords asked of the docs mrepo, drawn with ui/page; another mrepo; an error said', async (t) => {
  const exec = execution({ keyword: 'hdlc', choices: [{ title: 'base-docs-hdlc', page: 'x', below: [] }] })
  t.is(await act('page', exec, { uri: 'hdlc', query: {}, base: '/viewer' }), 'ui/page: hdlc · docs', 'drawn with the element')
  t.alike(exec.asked, [['docs', 'info/get', 'hdlc']], 'its data: info/get at docs')
  const other = execution(new Error('no page here'))
  t.is(await act('page', other, { uri: '', query: { at: 'host' }, base: '/viewer' }), 'ui/page: host', 'another mrepo; its error drawn, not thrown')
  t.alike(other.asked, [['host', 'info/get']])
})

test('every action the config names was run here', (t) => {
  t.alike([...ran].sort(), Object.keys(mounted.protocols.viewer.actions).sort())
})
