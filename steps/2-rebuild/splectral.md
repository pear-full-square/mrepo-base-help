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

## Open, one at a time

1. Whether a component is a light process with an inbox and an outbox
   folder (the pattern, not the pipeline: nothing committed a page), or
   an mrepo, its requests through the request layers (about 1 s a
   request, measured): put to the human, ours: the light process.
2. The component's entry file; how the top package asks for an element
   of a linked package.
3. Where the server's package lives, and the Splectral mrepo's list.
4. The proposal's open questions: parameters from the URL; writes from
   the UI; live updates; who may ask.
5. The names and the repositories (`splectral/base-docs-package`,
   `base-view-docs`, `base-view-install`, an element set's), created by
   the human.
