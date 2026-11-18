# Splectral: the server and the package template

A design in discussion (2026-11-18), the design session asked for on
2026-11-17 ("for splectral we need to do a design session for the server
'proper' and the components"). What was settled before it is in
`tasks.md`, "`splectral`" and "`splectral-docs`"; our proposal for it is
the doc "Splectral: the server and its components"
(https://claude.ai/artifact/Y3G4CXUHzwUuzZWjAzwLsK). Nothing of it is
built: what is built is the MVP (`readme.md`, parts 80 and 81).

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
  hop:

  ```
  haicc splectral boot/deploy docs <package>
  haicc splectral/docs service/start
  haicc splectral boot/teardown docs
  ```

## Open, one at a time

1. Whether the commands are those to the letter (`boot/deploy`, the
   service's), executed in the Splectral mrepo by Splectral's own
   packages in place of base's: put to the human, ours: yes.
2. The family's kinds of package, for base: an app and an element set:
   put, not answered yet.
3. An app's entry and what it is handed; how its program asks for an
   element of a linked package; what a request to an app says.
4. The proposal's open questions: parameters from the URL; writes from
   the UI; live updates; who may ask.
5. The names and the repositories, created by the human.
