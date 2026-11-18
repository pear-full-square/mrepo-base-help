# Splectral: the server and the package template

A design in discussion (2026-11-18), the design session asked for on
2026-11-17 ("for splectral we need to do a design session for the server
'proper' and the components"). Nothing of it is built: what is built is
the MVP (`readme.md`, parts 80 and 81). First the design as it stands,
written up and kept current; then our critical view of an earlier form of it, asked for by the human ("Once
this is written up, give me your critical view on the design"); then the
session itself, each point in the words used. The earlier proposal (the
doc "Splectral: the server and its components",
https://claude.ai/artifact/Y3G4CXUHzwUuzZWjAzwLsK) is replaced by this.

## The design as it stands

Written up 2026-11-18, brought up to date as points settle (last: the
component starts its own renderer). The form the critical view below
looked at was an earlier one: one pair of boxes, a page through the
mrepo's request layers.

**What it is**

- **Splectral is an app platform**: an mrepo of haiccing's, `local/splectral`,
  deployed by the boot mrepo beside the host, as today, all of it
  haiccing's. Its server, a process of its own, is the data layer: it
  routes the browser to the components and provides their data. It
  carries no UI, interprets nothing of a component's and starts no
  process of one.
- **A component is an app, and an mrepo**, made by a dual install:
  1. haicc's: a plain service-managed mrepo, deployed by Splectral with
     the boot protocol (`base-package-boot` in Splectral's list) from
     `base-package-service`: the runtime, `info`, the protocol protocol,
     the service. The minimum, and the app's own repository.
  2. Splectral's: the component's packages laid on top by an action of
     Splectral's own (`splectral/install`, ours, not confirmed by
     name), a second inbox and outbox made, two hooks laid (`start`,
     `stop`).
- **Two pairs of boxes, two pipelines, separate**: haicc's, the mrepo's
  own, for the commands that manage it, by haicc's hops, through the
  request layers, recorded; Splectral's, linked with the Splectral
  server and nothing else, for pages and data, a watcher at each end,
  what passes over it fixed, the same for every component.
- **The renderer**: a light process of the Splectral side's own, from
  the component's packages; it reads Splectral's inbox, calls the
  elements in its own process, writes Splectral's outbox. Started by
  the component's `start` hook, ended by its `stop` hook and with its
  runtime: the lifecycle is the mrepo's service.
- **The packages**: of the `splectral` organisation only, linking no
  haiccing package; brought to haiccing's template
  (`base-docs-package`), one documentation package of the family's on
  top; an element set a protocol package, an element an action; a
  component a component package, its list; its own package one
  protocol, named as it is, its action `page`.
- **The pattern, an application platform**: an mrepo that manages its
  components with the boot protocol and adds only what is its own; to
  be used for other types of application.

**The commands**

```
haicc splectral boot/deploy viewer base-package-service
haicc splectral splectral/install viewer splectral/base-component-viewer
haicc splectral/viewer service/initialise
haicc splectral/viewer service/start     # the renderer started: pages answer
haicc splectral/viewer service/stop      # the renderer ended
haicc splectral boot/teardown viewer
```

**How a page is made** (the browser asks `/viewer/hdlc/validation`)

1. The server routes by the first segment to the component `viewer` and
   writes a page request into its Splectral inbox (`viewer/page
   hdlc/validation`).
2. The renderer, watching it, runs the action of the component's own
   package.
3. The action needs data: the renderer writes a data request into the
   Splectral outbox (`info/get hdlc/validation` at `docs`).
4. The server, watching that outbox, runs the command as the data layer
   (into the boot mrepo's inbox, as a terminal does) and writes its
   completed form into the Splectral inbox.
5. The action goes on: it calls the elements it draws with (`ui/page`),
   builds the page and answers; the page is in the Splectral outbox.
6. The server's watcher hands it to the browser that waits.

**Later, not designed**: speed, with the RPC server and AVRO; commit
times a setting; rules for what a component follows; a dynamic
component, a browser application on code that runs on Bare and in a
browser.

**To build**

- In haiccing, generic: a program of a placed package started and ended
  by a command, for a hook to use.
- In Splectral's package: `base-package-boot` in its list;
  `splectral/install`; the server routing the browser to its
  components, writing their Splectral inboxes, watching their Splectral
  outboxes, running their data requests; answering its own pages only.
- The splectral family: the renderer; the first element set, `ui`; the
  first component, the viewer (`info` on every mrepo, the docs mrepo
  its default); its documentation package; then today's page as a
  component.
- The tools and this repository: a second organisation.
- The how-tos: the application platform; the dual install; an element
  set; a component.

## Our critical view (2026-11-18)

What is strong: one way of working. A component is deployed, started,
asked about itself and torn down with the commands already known, by a
person and by the AI; nothing of the management is new code; every
exchange is a record that can be read afterwards; the server stays
small and knows no UI; nothing waits for AVRO. The management of a
component as an mrepo is right. The doubts are all about the page's
way, a browser's every request through an mrepo's request layers.

1. **A page will be slow.** From our own measurements (`tasks.md`, the
   solution's "Measured"): a request costs 0.4 to 1 s in each mrepo it
   passes, every command alike. A page is at least the page's request
   in the component and the data command through the boot mrepo and the
   mrepo asked: two to four seconds a click, more with several data
   requests, and more again if each element is a request of its own
   (a hook line, a request of its own, cost about 1 s). Not measured
   for this flow: an estimate from those figures. A browser wants a
   tenth of that. "A cheaper request pipeline", moved back, becomes
   what Splectral's use depends on.
2. **Every page read is committed.** The inbox removes nothing; a
   request is five moves, each a commit; the outbox commits what it
   sends. So every page looked at stays in the component's repository:
   the request, the data answer copied into its inbox, the whole page
   in its outbox. Reads with no value as history, growing without end;
   nothing retires records yet.
3. **A component can ask for anything.** Its data request is a command
   at a position, run by the server with a terminal's reach: `boot/teardown`
   as well as `info/get`. Only Splectral reaches a component, but
   nothing bounds what a component reaches. And once pages have buttons,
   the server on `127.0.0.1` with no check of who asks can be made to
   run commands by any page open in the same browser. What the outside
   may ask is the open design `external-request-api`: this needs it.
4. **Live updates turn back on themselves.** Splectral's value today is
   the commands and the tree as they change. In this design a component
   following the records is sent a request a record, and its own data
   requests complete in the boot mrepo's outbox, the stream it follows:
   it would be told of its own asking, and ask again. Splectral's own
   requests have to be told apart (requests are tagged by trigger) and
   left out; and a page built on the server still needs a little code
   in the browser to renew itself.
5. **The first implementation may be built twice.** Pages built on the
   server by actions; later a browser application with its code from
   the package. Then the processing is in the browser, the elements are
   browser code, and the runtime in between has little left to do.
   Unless an element is written once, as plain code that runs in both
   places.
6. **Smaller**: a browser's request held open over an exchange of
   records needs a time limit and an answer when the component is not
   running, and meets the open bug (a runtime that stops taking its
   inbox in); an outbox that carries pages and requests both has two
   meanings where it had one; files a browser application needs (code,
   styles) cannot each be a request, so a component's files are read
   past its boxes, or everything is put into the page; a component
   named as an mrepo of the install is (`docs`) would share its unique
   URI, `local/docs`; component, app and mrepo are three words for one
   thing here, and component and app mean something else in haiccing.

**What we would do**

- Keep the design for management as it is.
- **A proof of concept first, measured**: one component, one page, end
  to end; the time of a page and what its repository grows by a page.
  The family's template only after it.
- **A request that is not kept**, for every mrepo, a flag of the
  request: executed and answered, nothing committed. One way of
  working still; it answers 1 and 2, and serves hook lines and the AI's
  reads too.
- **Elements called by the action, in the component's own process**,
  not requests; **written to run in the browser as well**.
- **A component's package says what it may ask**, the server checking
  it (checking, not interpreting); reads only until
  `external-request-api` is designed. The server refusing a request
  that does not come from its own pages.
- **Splectral's own requests tagged** and left out of what it follows.

**The human's answers** (2026-11-18), point by point, in the words
used, each with our reading:

1. "Not an issue, will be resolved with rpc": the page's speed is the
   RPC server's to solve, with AVRO; slow until then is accepted;
   nothing cheaper is built for Splectral meanwhile.
2. "we will set appropriate commit times": when a layer is committed
   becomes a setting, so a page read is not a row of commits of its
   own. Our "request that is not kept" is withdrawn for it.
3. "Yes, that is on purpose": a component has Splectral's reach, the
   whole install: apps act on all the parts ("user interaction that
   sends commands to all the parts", 2026-11-16). Our "a package says
   what it may ask" is withdrawn. Left, ours to decide and said: the
   server answers only its own pages (a request from another page open
   in the same browser refused): who asks the server, not what a
   component may ask.
4. "Rules will be implemented": what a component follows and what is
   left out of it is said by rules; nothing designed now.
5. "This is static versus dynamic": two kinds, not one replacing the
   other: a static page, built on the server; a dynamic one, a browser
   application. The first is not built twice; "written to run in the
   browser as well" is withdrawn.

So the design stands as written up. What stays of "What we would do":
the proof of concept first (the rule for a new pattern); Splectral's
own requests told apart, under 4's rules. And, speed being no issue
(1), ours: an element is asked for as an action is, a request of the
component's own, the page's action waiting for it, as a script waits
for its lines: the same way of working, nothing new.

## Settled before the session (2026-11-17, `tasks.md`)

- The server is the data layer: it manages the commands the pages run;
  later caching there. It carries no UI elements of its own.
- The unit on the Splectral side is self-contained as a haiccing package
  is: its commands, its UI element set (by copy: replaced below, a linked
  package), its info, its own page or pages.
- A Splectral family of its own, its packages in the `splectral`
  organisation.
- One gateway, the inbox: a command from the browser is a `haicc`
  command, written there as a terminal writes one.

## Settled in the session

- **The unit is a package; component stays the list** (the human,
  2026-11-18: "package, keep component for the list"). Our question: in
  our terms a component is a package that is a list of packages, and
  the Splectral unit carries its own UI elements as a package carries
  its modules. So: a Splectral package (a view, its UI element set, its
  pages); a Splectral component a list of them, what is installed
  together.
- **The same self-containment rules as haiccing's** (the human,
  2026-11-18: "It should follow the same self containment rules as
  haiccing"). Our reading, put back: a Splectral package carries a copy
  of every module it needs, the UI element set among them, is tested
  and sealed, runs on its own copies, shares nothing at run time and is
  replaced as a whole; it follows a package specification of its
  family (a template it is brought to and pinned to, the generic tests,
  a test of its own, a report), documents itself (its README a menu,
  read with `info`), and has a how-to for every pattern it implements.

- **The server loads and runs, it does not interpret** (the human,
  2026-11-18: "The server loads and runs, does not interpret. The server
  is the data layer, the component does everything on top."). Our
  question: whether the server reads a package's view files, as the
  proposal had it, or knows no views. So: no view is read by the server;
  what a view is, how a command is bound to a UI element, what a page
  looks like, all of it is on top, the packages'. Our reading of "loads
  and runs", put back, to confirm: it loads the packages of its list
  (their files served as they are) and runs the commands their pages
  send (into the boot mrepo's inbox, the completed form back, the
  records streamed). Corrected by the next point: it starts the
  package, whose code runs on its side.
- **The server loads a package and starts it; pages built on the
  server first** (the human, 2026-11-18: "So the server loads the
  package and starts it. It provides data, but the processing is done by
  the package, self contained. The component of the package gets a uri
  in the browser, the server routes browser requests to the right
  component. The initial implementation is building pages on the server,
  the further aim is to create browser applications that get their code
  from the package."). Our question: whether "runs" is only the commands
  (ours, recommended: a package's code in the browser only): not so. The
  package's own code runs on the server's side, started by the server;
  it asks the server for data and does the processing itself; what it
  offers has a URI in the browser, and the server routes a browser's
  request to it; to start with it answers with a page it builds there;
  later a package serves a browser application its code.
  The earlier scope had this form already (`tasks.md`, "`splectral-docs`",
  1: a package's entry `view.js`, `{ name, routes, page }`, loaded as the
  runtime loads protocols).
- **A loaded package links to other packages; the top package runs**
  (the human, 2026-11-18: "When a package is loaded it links to other
  packages. So the top package runs but functionality of the other
  packages is instantiated during processing. Same as a haiccing
  package."). Our question: the term for what a package offers at a URI,
  "the component of the package" having been said (ours: a view). The
  answer makes the word unneeded: what has the URI is the component, the
  list, through its top package, as an mrepo is defined by the last
  package of its list. Our reading, put back, to confirm: a package has
  its list, the packages it links to, itself the last; the server loads
  the list and starts the top package only, at its URI; the others do
  not run by themselves: what they offer is instantiated when the top
  package's processing asks for it, as a request instantiates an action
  of a linked package's protocol.
- **Packages with UI elements only; the details ours** (the human,
  2026-11-18: "There would be packages just with UI elements, for us to
  decide the details."). Our question: whether a UI element set is a
  linked package of the component's list, rather than a module carried
  by copy. So it is; this replaces "by copy" above. **The details, ours,
  said to the human**:
  - one package, one element set, named; an element asked for by name,
    `<set>/<element>` (`base/tree`), as an action is, `<protocol>/<action>`;
    never imported by another package;
  - an element is a function: data in (a command's answer, as the top
    package hands it), a fragment of a page out, its style with it; it
    fetches nothing itself: the data is the server's, the processing the
    top package's;
  - documented as a protocol's actions are: the set's config in its
    package, a folder an element in its module, its README with its
    signature, its arguments, what it returns;
  - the first set, for base, the proposal's six: page, tree, document,
    table, log, buttons;
  - its own test: every element instantiated on a fixture; one not run
    fails.
- **The inbox and outbox pattern between the server and a component**
  (the human, 2026-11-18, on our asking whether RPC waits for AVRO and
  the contract is two data messages meanwhile, `run` and `records`:
  "You can use the inbox outbox pattern for server component
  communication"). So no AVRO RPC now: what we have. Our reading, put
  back, to confirm: what passes between the server and a component is a
  record, the request record as it is documented (`base-docs-package`,
  `mrepo/`, "A request": a form in an envelope, its key, the topic its
  completed form goes back to), written whole into an inbox folder, the
  completed form back in an outbox folder, matched by its key. Both
  ways: the server writes a browser's request into the component's
  inbox, the page comes back in the component's outbox; the component
  writes a data request (`run`) into the server's inbox, the completed
  form comes back in the server's outbox; `records` is the component
  following the server's outbox. So a started component is a process of
  its own, sharing nothing in memory with the server; when the RPC
  server comes, the same forms travel as its messages.
- **A component starts light, a simple renderer; it could be a simple
  mrepo, an mrepo with a specific language** (the human, 2026-11-18, on
  our asking whether a component is a light process or an mrepo:
  "Component starts light, simple renderer. However, because of the
  inbox outbox setup and the pattern already in use in haiccing even a
  renderer could be a simple mrepo. That means it is an mrepo with
  specific language."). Our reading, put back, to confirm: now a light
  process, a renderer: a record from its inbox, a page into its outbox,
  nothing committed. It is kept in an mrepo's shape (the same boxes, the
  same request record), so that a simple mrepo can take its place with
  nothing changed for the server. What makes it a renderer and not
  another mrepo is its language: what its requests say, the protocols
  it offers.
- **Splectral an app platform, a component an app, the UI the browser;
  separate from haiccing, sharing its ways** (the human, 2026-11-18, on
  our asking whether the renderer takes an mrepo's request form and a
  Splectral package is a protocol package, haiccing's template with the
  language's own on top (ours: yes): "Splectral is an app platform in
  this design, and a component is an app, UI is browser. I think it is
  justified to treat them separately from haiccing, but make them share
  haiccing ways of doing."). So not haiccing's forms taken over as they
  are: our "yes" withdrawn that far. Our reading, put back, to confirm:
  - the server is the platform: it loads the apps, starts them, routes
    the browser to them, provides their data;
  - a component is an app: what is installed on Splectral and opened in
    the browser at its URI; a list of packages, its own the last, whose
    program the platform starts (in haiccing an app is a package with a
    `run.js`, started from the machine, reaching the mrepos as the
    outside does: `base-docs-package`, `howto/app`; here it is started
    by the platform and reaches its data through it);
  - separate: the splectral family has its own specification, its own
    kinds of package and its own forms (what a request to an app says);
  - sharing the ways: self-containment; the list, its own package the
    last; modules by copy; the template and its pin; the generic tests,
    a test of its own, a report; a README a menu, read with `info`; a
    how-to a pattern; the inbox and outbox pattern and its record;
    deploy and teardown, no upgrade in place.
- **Splectral a haiccing mrepo; its components managed by it, with the
  same protocols and commands; the hops haicc's** (the human,
  2026-11-18, on our reading of "separate" and our asking for the
  family's kinds of package: "But splectral is a haiccing mrepo,
  splectral components are managed by splectral, not haicc mrepo but
  could use same protocols and commands. Component deployed by
  splectral, not haicc, but same command. URI hops remain haicc."). Our
  reading, put back, to confirm: the platform stays what it is, an mrepo
  of haiccing's, deployed by the boot mrepo beside the host; a component
  is no mrepo: it is deployed in Splectral and managed there, by
  Splectral; the commands for it are the ones for an mrepo (`boot/deploy`,
  `boot/teardown`, the service's), sent to Splectral, which executes
  them its own way; a command gets to Splectral by haicc's hops, as to
  any mrepo, and a component is a position in Splectral's `main`, not a
  hop (corrected by the next point: a component is an mrepo, a hop
  to it haicc's):

  ```
  haicc splectral boot/deploy docs <package>
  haicc splectral/docs service/start
  haicc splectral boot/teardown docs
  ```
- **A component is an mrepo, deployed by Splectral** (the human,
  2026-11-18, on our reading "a component is no mrepo" and our asking
  whether the commands are the same to the letter: "Component is mrepo
  deployed by splectral"). Our reading above corrected: "not haicc
  mrepo" said who manages it, not what it is. So: a component is an
  mrepo, a child of the Splectral mrepo, deployed by it as the host
  deploys a node; a hop to it is haicc's, through its shortcut in
  Splectral's `main`:

  ```
  haicc splectral boot/deploy viewer <package>
  haicc splectral/viewer service/start
  haicc splectral boot/teardown viewer
  ```

  With what was said before: a simple mrepo, light, a renderer to start
  with; "an mrepo with specific language", the language its packages
  offer, those of the splectral family, made in haiccing's ways.
- **Splectral gets the boot protocol to manage its components; a
  pattern for other types of application; the same way of working, no
  duplication** (the human, 2026-11-18, on our asking whether the deploy
  is `base-package-boot` as it is, Splectral's own only the routing:
  "Yes, splectral gets the boot protocol to manage the components. I
  think this will be a pattern that we will use for other types of
  application as well. Important, use the same way of working as much
  as possible to avoid duplication."). So: `base-package-boot` in the
  Splectral mrepo's list; a component deployed, started, stopped and
  torn down as any mrepo; what is Splectral's own begins after the
  deploy. The pattern, an application platform: an mrepo of haiccing's
  that manages its components, mrepos, with the boot protocol, and adds
  only what is its own (here the server, the browser routed to its
  children). A new pattern: its how-to when it is built
  (`base-docs-hdlc`, "Work"). The rule for what follows here: what
  haiccing does already is used as it is; something new only where
  nothing does it.
- **A pair of linked inbox and outbox with Splectral; only through
  the Splectral server; watchers at both ends** (the human, 2026-11-18,
  on our asking whether a component asks its parent for data through
  its outbox, its request waiting: "I propose that the component keeps
  a pair of linked Inbox outbox with splectral. So only accessible
  through the splectral server. And use watchers for notification both
  ends"). Agreed. Our reading, put back, to confirm:
  - one pair, the component's own inbox and outbox, linked with
    Splectral and with nothing else; everything between the two goes
    over it, both ways: in, a browser's request, a data answer; out, a
    page, a data request;
  - nothing else in the install writes its inbox or reads its outbox:
    a component is reached through Splectral only;
  - a watcher at each end, nothing looked at on a clock and nothing
    copied into an inbox of Splectral's: the component's runtime
    watches its inbox (as every runtime does, `inbox-watcher`), the
    Splectral server watches the component's outbox (as it watches the
    boot mrepo's outbox folder today) and answers what it finds there:
    a page to the browser that waits for it, a data request run and its
    completed form written into the component's inbox.
- **The template haiccing's own; the browser app on compatible code**
  (the human, 2026-11-18, on our asking whether the family's template is
  haiccing's, with one documentation package of the family's on top:
  "Yes on template. And the browser app will run compatible code (bare,
  browser js) with minification etc. To be worked out."). So: no second
  template: a Splectral package is brought to `base-docs-package` and
  pinned to it, the generic tests the same; an element set a protocol
  package, an element an action; a component a component package, its
  list; one documentation package of the family's for what is its own
  (an element, a page's action, their how-tos). And, for later, not
  designed: a dynamic component's code written to run on Bare and in a
  browser, minified and the like on its way there.
  **Ours, following from one package, one protocol, said to the human**:
  a component's own package offers one protocol, named as the component
  is, its action `page`; the browser's path below the component is the
  action's URI: `/viewer/hdlc/validation` is `viewer/page hdlc/validation`.
- **The names, more or less; a Splectral package links no haiccing
  package, the minimum from the Splectral server; the organisations
  kept pure** (the human, 2026-11-18, on the names we proposed:
  `splectral/base-docs-splectral`; `splectral/base-package-ui`, protocol
  `ui`, its module `pear-full-square/splectral-base-ui`;
  `splectral/base-package-viewer`, protocol `viewer`, its module
  `pear-full-square/splectral-base-viewer`; `splectral/base-component-viewer`;
  the platform staying `haiccing/base-package-splectral`; the `base-view-*`
  names dropped: "More or less. I would like the splectral packages not
  to link haiccing packages, but to get the minimum required from
  spectral server. Probably just a runtime, service. Also we need to
  deal with the org. But if splectral is pure haiccing and splectral
  packages or splectral that would make it easy."). Our reading, put
  back, to confirm:
  - a component's list names packages of the `splectral` organisation
    only: its element sets, its own package, itself;
  - what it needs to run it is given by the platform when it is
    deployed, not linked by it: the minimum, probably a runtime and the
    service;
  - the organisations: `haiccing` the platform, all of it haiccing's;
    `splectral` what is deployed on it, all of it splectral's; no list
    names the other's packages, so each organisation is built, released
    and sourced by itself.
  Checked: today's tools know one organisation (`tools/release.js`,
  `package-test.js`, `code-check.js`, `info-extract.js`: the folder
  `haiccing/`, `sources/haiccing/`, its manifest; `package-bundle.js` has
  `--org`); and a hook activates its protocols with the protocol
  protocol (`protocol/activate . info`), so the minimum is likely the
  runtime, the protocol protocol and the service, and `info` where a
  component answers about itself.
- **A dual install, proposed by the human** (2026-11-18, on our asking
  how the platform gives the minimum (ours: a setting of the platform's
  package, laid in first by the deploy): "Would it be possible to go a
  dual install. First haicc, then splectral deploying splectral packages
  on top?"). Checked, and possible; ours: better than the setting, which
  is withdrawn for it.
  - **The first step is there today**: `base-package-service` deployed
    as a target is "an mrepo with a service and nothing else" (the
    runtime, `info`, the protocol protocol, the service; its hooks
    `boot` and `initialise`): `haicc splectral boot/deploy viewer
    base-package-service`. The boot protocol is not changed, and the
    minimum is a haiccing package's list, nobody's setting.
  - **The second step is new**: a list laid on top of an mrepo that is
    built. `mrepo-base-boot` has the parts (`lay`, a list's `mrepo/`
    parts into a folder, a later file replacing an earlier one; `place`,
    the packages hard linked into the mrepo's `packages/` and their
    list committed), used so far only before an mrepo is built. New:
    the parts laid into the layers of a built mrepo; its packages list
    extended; its runtime started again, to load the protocols added.
  - **To mind**: a hook is one file a transition and a later file
    replaces an earlier one: the base has `boot` and `initialise`, so a
    component brings `start` and `stop` and replaces nothing, or hooks
    of the two steps are joined; it is the second half of a deploy, not
    an upgrade in place: a teardown takes the whole, a change is both
    steps again.
- **An inbox and an outbox for each; the pipelines separate** (the
  human, 2026-11-18, on the dual install and our asking who performs
  its second step: "There could be inbox and outbox for each, pipeline
  separation"). Our reading, put back, to confirm: a component has two
  pairs of boxes, one for each install, and what comes in by one is
  never processed by the other:
  - **haicc's**: the mrepo's own inbox and outbox, as every mrepo has,
    made by the first step: the commands that manage it (`service/start`,
    `info/get`, the teardown), come by haicc's hops through the
    Splectral mrepo, through the request layers, recorded;
  - **Splectral's**: a second inbox and outbox, made by the second
    step, linked with the Splectral server and with nothing else: a
    browser's request and a data answer in, a page and a data request
    out; a watcher at each end.
  It settles what we had assumed: "URI hops remain haicc" is the first
  pair, "only accessible through the splectral server" the second. And
  it takes three of our doubts with it: an outbox with two meanings (a
  pair a meaning); a page read committed as a managing command is (each
  pipeline its own commit times); a page waiting behind the request
  layers.
- **Splectral's pipeline: Splectral components only; the communication
  between the server and a component fixed** (the human, 2026-11-18, on
  our asking whether Splectral's pair is processed by a light renderer
  of the Splectral side's own, haiccing's runtime not changed for it:
  "Yes splectral pipeline is splectral components only and fixed server
  component communication"). So: the second pair is read and written by
  the Splectral side alone, the server at one end, the component's
  renderer at the other; the renderer runs the component's splectral
  packages and nothing of haiccing's; the mrepo's runtime never reads
  those boxes. Our reading of "fixed", put back, to confirm: what
  passes over the pair is the same for every component, a closed set of
  forms, none of a component's own: a page asked for, a page; data
  asked for, its answer.
- **Our opinion asked for** (the human, 2026-11-18, on our last
  question, put with a recommendation built from what had been said:
  "Please give your opinion as well, we collaborate"). Ours, given:
  - **The dual install with two pipelines is the best form so far.**
    Managing a component as an mrepo, recorded, by the commands known;
    its pages on a path of Splectral's own. It took our main doubts.
  - **What the base mrepo is for should be said**: with the pages no
    longer through it, it is a handle (a position, a registry entry,
    deploy, teardown, the service) and, the reason that carries its
    weight, the app's own repository: its data in `main` (what a person
    saved, a scenario's state), replicated later as any mrepo's.
    Without that it is two processes a component for little.
  - **The component should start its own renderer, not the server**
    (against our own last recommendation, which followed "the server
    loads the package and starts it"). The server stays the data layer,
    one concern, no manager of processes; the lifecycle is the mrepo's
    service with nothing observing it in between: the component's
    `start` hook starts the renderer, its `stop` hook ends it, and it
    ends with its runtime: how Splectral's own server is started today.
    The server following the service instead learns it from completed
    commands, and misses what ends without one (the MVP's known
    weakness). The cost: one generic action in haiccing, a program of a
    placed package started and ended (`runtime/run` refuses `/run`
    today), of use to every platform; and the second step lays two hook
    files.
  - **"No second template" fits more or less**: a Splectral package
    is run by the renderer, not by an mrepo's runtime, so its elements
    are called in the renderer's process (our "a request of the
    component's own" no longer holds), and the generic tests that need
    an mrepo's side (`mrepo`, the in situ ones) have nothing to run on:
    the family's documentation package says which apply.
  - **Enough designed: a proof of concept next.** One static page end
    to end (the viewer, `info/get`, one element), the two steps, the two
    pairs; what is still open (the URL's parameters, buttons, the
    organisation in the tools) answered by building it, the how-tos
    from it.
- **The component starts its renderer** (the human, 2026-11-18, on our
  opinion against our own recommendation and against "the server loads
  the package and starts it": who starts the renderer, the component by
  its service's hooks (ours) or the server: "Component"). So: the
  component's `start` hook starts the renderer, its `stop` hook ends
  it, and it ends with its runtime; the server starts no process of a
  component's.

## From the other session (2026-11-18): what the proof of concept meets

The session that built the pair deploy (`pair.md`) and fixed the docs
review's findings, on the human's word ("put the note in splectral.md"),
for the colleague building the proof of concept:

- **"Pair" is two things.** `pair.md`'s pair deploy is a node in a
  container on its own haicc install (`boot/deploy --flags container`,
  `mrepo-base-boot`'s `internal/pair`, built and in `main`). Here a pair
  is a component's inbox and outbox. One of the two wants another name
  before either is documented further; ours: "boxes" for the component's.
- **The boot protocol changed today**, in `main`: `deploy`, `teardown`
  and `redeploy` route a child linked `how: container`; `internal/pair`
  is new; `mrepo-base-request`'s flags know `container`. The dual
  install's second step touches `mrepo-base-boot` (`lay`, `place`):
  start from `main` as it is.
- **A runtime that stops taking its inbox in**, once in nine runs of the
  haicc command's test (`tasks.md`, the open bug): a component that stops
  answering may be it. The runtime now writes `runtime-stall.json` beside
  its `.git` with the step a pass stalls at; its presence, and what it
  says, is what we need to find the cause.
- **One build at a time on `sources/`**: a haicc test started while
  bundles are rebuilt hangs. Pushing is fine: what is pushed to
  `execute/main` is merged before the next push, as today.
- **Of use to the proof of concept**: `test/container.sh` and
  `test/pair.sh` in `base-linux-haicc` show an install made and spoken to
  through inbox and outbox files alone, with a reply topic in each
  request's record (a request without one is answered to nobody: the
  pair's first bug); `haicc <URI> haicc/script` runs lines where the URI
  points, a renderer's hook lines included.

**The human's answer** (2026-11-18) to the other session's view (its
doubts: speed, what the base mrepo is for): "The splectral component
mrepo will be for its own state and caching. Speed doesn't concern me
because of the additional patterns that can be applied to speed it up.
Data can even be linked into the repo, there are loads of options. The
design explores two patterns: an application processing context and an
equivalent UI interaction to the terminal command line." So: the base
mrepo is the component's own state and its cache; speed is not a
concern of the design (patterns for it later: caching in the mrepo,
data linked into the repository, the RPC server); and what the design
is for is two patterns: **an application processing context** (a
component: its mrepo, its renderer, its pipelines) and **a UI
interaction equivalent to the terminal's command line** (a browser's
request a `haicc` command, its answer a page). The proof of concept
proves the two patterns, not the speed.

**The component server pattern, a distributed application** (the human,
2026-11-18): "I think I will use the component server pattern as a
traditional distributed application with central server and services in
distributed components, again with a self contained approach." So the
pattern is a distributed application's: a central server (the platform,
routing and providing data) and services in components, each
self-contained, that need not run where the server does. Ours, said to
the human: the inbox and outbox are already where a component is, not
how it is reached, so a component in a container (the pair deploy) or
on another node takes the same forms; what a distributed form adds,
each later: where a component runs (the registry), one that does not
answer (the server says so, a time limit), the forms between server and
component versioned, and a transport beyond a shared folder (the
replication over a stream, `tasks.md`).

**The server manages install and lifecycle** (the human, 2026-11-18):
"Once deployed the server manages install and lifecycle." Our reading,
put back, to confirm: once the platform is deployed, its server is who
installs a component (both steps of the dual install) and drives its
lifecycle (initialise, start, stop, teardown), as a distributed
application's central server manages its services; it does so by the
same commands, sent into the component's own inbox, haicc's pipeline,
recorded. That keeps "the component starts its renderer": the server
decides and asks (`service/start`), the component's `start` hook starts
the renderer. The server manages, the component executes; the server
still starts no process of a component's.

## Open, one at a time

1. A proof of concept now, and its scope: put to the human.
2. The second step by name, `splectral/install` (ours, not confirmed).
3. The organisation in the tools and in this repository: a folder
   `splectral/` beside `haiccing/`, the tools run an organisation at a
   time.
4. Parameters from the URL beyond the path; a static page's writes
   (buttons).
5. The repositories' descriptions, for the human to create them.
