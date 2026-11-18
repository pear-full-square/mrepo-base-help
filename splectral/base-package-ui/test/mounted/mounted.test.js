// The package as it is mounted: its protocol.js, what a component's
// renderer loads through the dispatcher's /protocol entry (imported here
// directly: this test is itself run by the dispatcher), its config value
// by value, and each element drawn on a minimal execution. Every element
// the config names must be run here: the last test fails when one was
// left out.
import test from '../../modules/node_modules/brittle/index.js'
import * as mounted from '../../protocol.js'

const ran = new Set()
const draw = async (name, input) => { ran.add(name); return mounted.actions.ui[name]({ log () {} }, { args: [input] }) }

test('loaded as a renderer loads it: one protocol, ui, its config and its elements', (t) => {
  t.alike(Object.keys(mounted.protocols), ['ui'], 'the package provides the ui element set, and no other')
  t.alike(Object.keys(mounted.actions.ui).sort(), Object.keys(mounted.protocols.ui.actions).sort(), 'a function for every element configured, and no other')
})

test('its config, value by value', (t) => {
  const cfg = mounted.protocols.ui
  t.is(cfg.package, 'splectral/base-package-ui', 'the package that brings it')
  t.ok(cfg.description)
  t.alike(Object.keys(cfg.actions), ['page'], 'one element: page')
  t.alike([cfg.actions.page.uris, cfg.actions.page.args, !!cfg.actions.page.description], [['.'], ['page'], true], 'page: its argument the page')
})

test('page: a whole page drawn, its sections, the keywords below; no page refused', async (t) => {
  const html = await draw('page', { title: 'T', sections: [{ title: 'T', markdown: 'Some *text*.', below: [{ label: 'k', href: '/v/k' }] }] })
  t.ok(html.startsWith('<!doctype html>'))
  t.ok(html.includes('<p>Some <em>text</em>.</p>'), 'its markdown drawn')
  t.ok(html.includes('<a href="/v/k">k</a>'), 'a keyword below, a link')
  await t.exception(draw('page', null), /missing argument: page/)
})

test('every element the config names was drawn here', (t) => {
  t.alike([...ran].sort(), Object.keys(mounted.protocols.ui.actions).sort())
})
