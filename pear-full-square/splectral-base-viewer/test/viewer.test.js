import test from 'brittle'
import { page, DEFAULT } from '../index.js'

// An execution as the renderer hands one: the data asked for, an element
// drawn; here both recorded.
function execution (answers) {
  const asked = []
  const drawn = []
  return {
    asked,
    drawn,
    data: async (at, command) => { asked.push([at, ...command]); const a = answers[`${at} ${command.join(' ')}`]; if (a instanceof Error) throw a; return a },
    element: async (name, input) => { drawn.push([name, input]); return `<html>${input.title}</html>` },
    log () {}
  }
}

test('viewer/page: the keywords asked of the docs mrepo, drawn with ui/page; links to the same view', async (t) => {
  const exec = execution({ 'docs info/get hdlc/validation': { keyword: 'hdlc/validation', choices: [{ title: 'Validation', page: 'Before every commit.', below: [{ keyword: 'hdlc/validation/x', oneliner: 'X.' }] }] } })
  const html = await page(exec, { uri: 'hdlc/validation', query: {}, base: '/viewer' })
  t.is(DEFAULT, 'docs')
  t.alike(exec.asked, [['docs', 'info/get', 'hdlc/validation']], 'its data: info/get at the docs mrepo, the keywords as the command line has them')
  t.is(html, '<html>hdlc/validation · docs</html>', 'the page as the element drew it')
  const [name, input] = exec.drawn[0]
  t.is(name, 'ui/page')
  t.alike(input.crumbs, [{ label: 'docs', href: '/viewer/' }, { label: 'hdlc', href: '/viewer/hdlc' }, { label: 'validation', href: null }], 'where it is, from the top')
  t.alike(input.sections, [{ title: 'Validation', markdown: 'Before every commit.', below: [{ label: 'hdlc/validation/x', href: '/viewer/hdlc/validation/x', oneliner: 'X.' }] }], 'a choice a section, the keywords below as links to the same view')
  t.is(input.error, null)
  t.is(input.footer, '`haicc docs info/get hdlc/validation`', 'the command it shows')
})

test('viewer/page: the top; another mrepo; an answer that is an error said on the page; an at that is no position refused', async (t) => {
  const exec = execution({ 'docs info/get': { keyword: '.', choices: [{ title: 'base-component-docs', page: '# docs', below: [{ keyword: 'hdlc' }] }] }, 'host info/get service': new Error('no page here: service') })
  await page(exec, { uri: '', base: '/viewer' })
  t.alike(exec.asked[0], ['docs', 'info/get'], 'the top: info/get alone')
  t.is(exec.drawn[0][1].sections[0].below[0].href, '/viewer/hdlc')
  await page(exec, { uri: 'service', query: { at: 'host' }, base: '/viewer' })
  t.alike(exec.asked[1], ['host', 'info/get', 'service'], 'another mrepo, by its position')
  const input = exec.drawn[1][1]
  t.is(input.error, 'no page here: service', 'its error said on the page')
  t.alike(input.sections, [])
  t.is(input.crumbs[0].href, '/viewer/?at=host', 'its links keep the mrepo')
  await t.exception(page(exec, { uri: '', query: { at: '../x' } }), /not an mrepo's position/)
})
