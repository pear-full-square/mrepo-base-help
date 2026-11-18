import test from 'brittle'
import { markdown, inline, escape, page } from '../index.js'

test('markdown: headings, paragraphs, lists nested, code, tables; everything escaped first', (t) => {
  t.is(escape('<a href="x">'), '&lt;a href=&quot;x&quot;&gt;')
  t.is(inline('`<b>` and **bold** and *it* and [a](b)'), '<code>&lt;b&gt;</code> and <strong>bold</strong> and <em>it</em> and <a href="b">a</a>')
  t.is(markdown('# Title\n\nOne\nline.'), '<h1>Title</h1>\n<p>One line.</p>')
  t.is(markdown('- a\n  more\n- b\n  - c'), '<ul><li>a more</li><li>b<ul><li>c</li></ul></li></ul>', 'an item\'s continuation, a list nested by its indent')
  t.is(markdown('1. one\n2. two'), '<ol><li>one</li><li>two</li></ol>')
  t.is(markdown('```sh\nhaicc <x>\n```'), '<pre><code class="language-sh">haicc &lt;x&gt;</code></pre>')
  t.is(markdown('| a | b |\n|---|---|\n| `1` | 2 |'), '<table><thead><tr><th>a</th><th>b</th></tr></thead><tbody><tr><td><code>1</code></td><td>2</td></tr></tbody></table>')
  t.is(markdown('<script>x</script>'), '<p>&lt;script&gt;x&lt;/script&gt;</p>', 'no HTML passes')
  t.is(inline('[a](b)', { link: h => `/v/${h}` }), '<a href="/v/b">a</a>', 'a link\'s address rewritten')
})

test('ui/page: a whole page, its sections, the keywords below as links; no page given refused', async (t) => {
  const logged = []
  const exec = { log: (...e) => logged.push(e) }
  const html = await page(exec, { args: [{ title: 'Validation', crumbs: [{ label: 'docs', href: '/v' }, { label: 'validation' }], sections: [{ title: 'Validation', markdown: '# Validation\n\nBefore **every** commit.', below: [{ label: 'hdlc/test', href: '/v/hdlc/test', oneliner: 'The `tests`.' }] }], footer: 'at `docs`' }] })
  t.ok(html.startsWith('<!doctype html>'), 'a whole page')
  t.ok(html.includes('<title>Validation</title>'))
  t.ok(html.includes('<nav class="crumbs"><a href="/v">docs</a> / validation</nav>'), 'where it is')
  t.ok(html.includes('<h1>Validation</h1><p>Before <strong>every</strong> commit.</p>'), 'its section: the page\'s own heading not repeated')
  t.ok(html.includes('<a href="/v/hdlc/test">hdlc/test</a><div class="one">The <code>tests</code>.</div>'), 'a keyword below, a link, its one-liner')
  t.ok(html.includes('prefers-color-scheme:dark'), 'its style with it, light and dark')
  t.absent(/<(script|link)\b/.test(html), 'nothing loaded from elsewhere, no script')
  t.is(logged[0][1], 'drawn')
  t.ok((await page(exec, { args: [{ title: 'x', error: 'no <answer>' }] })).includes('<p class="error">no &lt;answer&gt;</p>'), 'an error said')
  await t.exception(page(exec, {}), /missing argument: page/)
})
