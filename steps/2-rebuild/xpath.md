# XPath: a query as a pipeline of haicc segments and merges

In discussion with the human, started 2026-11-14. A design: nothing of
it is built. It grows as the discussion goes; what is built leaves this
file and becomes a part in `readme.md`.

Read as a task in `tasks.md` is read: **Settled** is what the human said
or confirmed; **Proposed** is ours, put to the human and not yet
answered; **To settle** is open. The syntax in the examples is
illustration only: none of it is decided.

## The picture

**Settled** (the human)

- "Our current model in main is a local data structure that may have
  remote repositories linked in various places." Where a shortcut to
  remote mrepos exists there are several layers, which XPath has to
  process, and whose results have to be merged.
- "We now have the haicc command that makes these uri segment hops up to
  the shortcuts clear", and then the parallel XPath result sets that
  need merging.
- **Two scenarios**, not one (the human's correction of our first
  example):
  - **juxtaposed**: the local structure and a linked mrepo side by side,
    each its own stretch of the URI. `crud/read host/swarms/*`: local up
    to `host`, the linked mrepo's data after it;
  - **stacked**: several layers at one position, one placed on top of
    another (several sources at a node, local data beside them: the
    overlays of `vision.md`).

## The segmentation is haicc's

The human's question: use `haicc` for the segmentation, or build a
parallel segmentation in the XPath library? Our answer: `haicc`. The
human built on it, below.

**Settled** (the human)

- **A query that comes in is rewritten** into a pipeline of `haicc`
  segments and merge operations. "Since the end result of xpath is a
  node set it is pure haicc as selecting commands and node set merging."
- **No cascading**: "the linked mrepo returns nodesets that are already
  merged as far as other linked mrepos is concerned within its data." A
  caller merges one level only: what it fanned out itself.

**Ours** (said in the discussion, not objected to)

- Why `haicc`: one cut in one place (it already cuts a URI at a
  shortcut, sends the rest on and makes the prefix from the jumps); the
  library stays inside one mrepo; each mrepo answers for its own data,
  with its own shortcuts and its own gate, nothing read behind its back.
- **The rewrite is made per mrepo**, as the query arrives there: where
  the shortcuts are is data, and a linked mrepo's own are not visible
  from outside. Each rewrites the part it sees and hands the rest on.
  The plan unfolds hop by hop; "no cascading" is the same seen from the
  answers.
- **The library reports, it does not refuse**: evaluating one segment in
  one mrepo, where it meets a shortcut it stops and says which shortcut
  and what is left of the query (today: an error naming the `haicc`
  chain to type).
- **The plan has three kinds of step**: select (one segment, inside one
  mrepo), filter (a node set made smaller), merge (node sets combined).
  An action never sees a shortcut.
- **In the request layer**, on the way in: then every protocol gets
  selections across links, not only `crud`.
- **The first small case of the pipeline engine** (`vision.md`,
  "Pipelines": each step a request, the rewrite where a plan is made).
  Build only what this needs, a fan-out of child requests and a merge at
  the end, shaped so the engine can take it over.

An example, at the boot mrepo, `host` and `host-2` shortcuts, `notes` an
ordinary node:

```
crud/read */swarms/*

1. select *            -> host, host-2 (shortcuts), notes (ordinary)
2. haicc host   crud/read swarms/*
   haicc host-2 crud/read swarms/*
   local:       crud/read notes/swarms/*
3. merge, juxtaposed   -> one node set, each part under its prefix
```

## The operations

**Settled** (the human)

- "The aim is full coverage, but in steps."
- **No parent step (`..`)**: "we don't need it as ours is forward
  looking only."
- **Full coverage is of what looks forward** (our reading, confirmed:
  "yes"): everything of XPath that looks forward (children,
  descendants, filters, set operations), nothing that looks back or up
  (the parent, the ancestors, the siblings before a node).

- **The order of a node set**: "there is system order - whichever way
  it comes out - or a set order." Our reading, to confirm: by default a
  set comes in the system's order, nothing promised about it; an order
  can be set on it (asked for in the query: a sort). What depends on
  order (a selection by position, the siblings after a node) works on
  the order the set has, and is repeatable only on a set order.
- **XPath's functions**: "if we can do it efficiently, yes functions
  please."

- **An attribute is a leaf key and value of a node's document** (the
  human, asked what `name` is in `users[name=s*]`: "name was supposed to
  be an attribute in the example - leaf keyvalue"). So in a filter a
  bare word is a field of the document, and `users[name=s*]` asks for
  the nodes under `users` whose document holds `name`, a leaf, matching
  `s*`.
- **A node's own name is asked with the usual function**: "we will have
  to use the usual function for e.g. node name": XPath's `name()`.

**Proposed** (ours: the list shown to the human, the points not
answered one by one). "Attribute" read as a field of the node's
document.

| Kind | Operation | Example | Where it runs |
|---|---|---|---|
| Step | a child by name, `*` | `swarms/*` | inside one mrepo |
| Step | descendants at any depth | `**/node-1` | inside one mrepo; the same rest handed on at each shortcut |
| Filter | on the name, by its function | `users/*[name()=s*]` | where the node lives |
| Filter | on the document: a leaf equals, matches, compares, exists | `users[name=s*]`, `swarms/*[size>2]` | where the node lives |
| Filter | on what the node is: a shortcut, has children | `*[shortcut]` | where the node lives |
| Filter | with a path inside | `swarms/*[nodes/*/state=started]` | a sub-query: a small pipeline of its own, may cross a link |
| Filter | and, or, not | `[size>2 and name=s*]` | with its parts |
| Set | merge, juxtaposed or stacked | | at the mrepo that fanned out |
| Set | the union of two queries | `a/* \| b/*` | a merge of two pipelines |

- **Juxtaposed, a filter can be pushed down**: each mrepo filters its own
  nodes before it answers, less data travels. **Stacked, it runs after
  the merge**: the layer on top may change the document the filter
  reads.
- At the end of the same pipeline, outside XPath proper: what comes back
  of each node (the node, its URI only, one field) and aggregates (a
  count).

**To settle**, against full coverage:

- Which XPath the forward part is taken from (its version); which of
  its functions (on strings, numbers, node sets), and what efficient
  asks of each: one that reads a node's own name and document runs
  where the node lives, as a filter does; one over the whole set (a
  count, a position, the last) runs after the merge.
- How an order is set: in the query, and by whom it is applied (after
  the merge, by the mrepo that fanned out; a linked mrepo's own order is
  lost in a merge unless the merge keeps it).

## The steps

**Settled** (the human, after the measurements of the commits)

- "I think we should do a good first implementation and measure its
  performance to see if we should go single or multiple requests
  (processing duration vs request and commit overhead)."
- **Both modes** (the human, 2026-11-15, on our reading that the figures
  would decide for one of the two): "Xpath Pipeline should allow multi
  and single request mode depending on how long processing takes." Our
  reading, to confirm: a query's plan is one thing (its steps: select,
  filter, merge) and can be run two ways inside an mrepo: in one
  request, the steps calls inside it; or as several requests, a step
  each, on the query's request branch one after another. Short
  processing: one request, nothing paid for a request and its commits a
  step (here about 44 ms a request's cycle, 7 to 9 ms a commit); long
  processing: several. The first implementation is measured to find
  where the one becomes the other. Across a link a hop is a request in
  both modes.

- **The mode is a config option** (the human, asked who chooses: the
  one who asks, or the pipeline from an estimate): "That is a config
  option." So neither an option on the query nor an estimate: it is set
  in the config, a local matter, as the flag `error-on-empty` is
  (`tasks.md`, "Future additions": how a package is made, what type of
  mrepo it is for; the configs well documented).

- **The initial implementation: parse, process and continue** (the
  human's proposal, 2026-11-15): "Parse sufficiently of the command to
  have a segment, process it and then parse the next bit until done. All
  in one request." Our answer, put to the human: below, "Parse, process
  and continue".
- **Its measurements go into the request's record** (the human,
  2026-11-15, asked whether timings should be written there at debug
  level: "Logging was decided to go to the request info": `readme.md`,
  part 12, "a request is its own record"). So: `exec.log` entries at
  `debug`, with what each step took, in the request's `log`. What is
  there for it: the four levels, the mrepo's threshold in
  `/runtime/log.json` (`info` without it). What is not: no code logs at
  `debug` (one action logs at all, `runtime/run`), nothing records a
  duration, and nothing writes `/runtime/log.json`: the level cannot be
  set from the command line. **A task of its own since** (the human:
  the levels implemented, what goes at which level decided, "logging
  level is request flag"): `tasks.md`, task 5, **built** (`readme.md`,
  part 66): `--flags log=verbose` gives each step with what it took and
  what it read and wrote, `exec.step` measures it for the action, and a
  request's metrics are in every record. The XPath measurements read
  those.

**To settle**

- Where the option is written: a protocol's config in its package
  (`protocol.js`), an action's, or the mrepo's own; and its default.

**Parse, process and continue** (ours, on the human's proposal; put to
the human, not answered)

- **Agreed, and it is the same loop the rest needs.** What is between
  two rounds is a node set and the rest of the query, as text. That is
  what a hop hands on at a shortcut (the rest, unparsed, to the linked
  mrepo), and what the several-requests mode would pass from one
  request to the next. One loop, three uses.
- **A segment** (ours first: one step of the path with its filters;
  the human's, which holds): "a segment runs upto a filter or a
  shortcut. Upto a filter because one needs an initial nodeset first to
  filter from." So a segment is the stretch of steps that gives a node
  set: it ends where that set is to be filtered, or where a shortcut is
  met. The human's example: select all request records where the
  request's URI is some value: "the initial nodeset is all requests and
  then the filter is applied, so all requests is initial segment";
  "once filtered the next segment could e.g. the request response".
- **A filter may be a side branch** (the human): it "goes some nodes
  deep" from each node of the set, as the request's URI lies inside its
  record.
- **Lazily** (the human): "a pointer to rather than materialised": a
  node set is held as what points to it, not as its nodes read out.
- **The limits of this first approach are known** (the human, on what
  we said does not fit one round): "it is to get going and gain
  experience."
- **Each round is a step of the action** (`exec.step`): at `verbose` the
  request's record holds each with what it took and what it selected:
  the measurement asked for, with nothing added.
- **What it costs**: a mistake late in the query is found late, after
  the rounds before it ran. Inside one request nothing is lost: the
  error ends the request and what it did is undone. A first pass over
  the whole text for its brackets and quotes alone would say such a
  mistake before any work, cheaply: ours to add if it shows.
- **What does not fit one round**, and stays for after the first
  implementation: what wraps whole paths (a union, a function over the
  set such as a count or the last), and a filter with a path inside,
  which is a query of its own run for each node.

**Cutting on a filter or a shortcut** (the human: "Are you happy with
cutting the segments the way I proposed: on filter or shortcut?"; ours:
yes, with what follows; put to the human)

- **It cuts where the cost changes.** A stretch of steps without a
  filter only walks listings: no document is read, and what it gives
  is a pointer. A filter is the first thing that reads documents. So a
  segment is cheap and lazy, a filter is where the work is: the right
  place to measure, and the right place for a request's edge in the
  several-requests mode.
- **The rounds alternate**: a segment (walk, a pointer out), a filter
  (read, a smaller set out), a segment from each node that is left, and
  so on. Two filters in a row are a filter after an empty segment.
- **The two cuts are found differently.** A filter is seen in the text
  (its bracket): the parser stops there. A shortcut is seen only in the
  data, by the round that meets it; and where a step selects many
  (`*/swarms/*`), some of the set may be shortcuts and others not: the
  set then goes two ways from the same place in the text, the ordinary
  nodes on here, each shortcut by its hop, and the results are laid
  side by side.
- **A filter's side branch that itself crosses a shortcut** is a query
  sent on for each node: after the first implementation.
- **From one local root to the next** (the human: "and we jump from
  one 'local root' to the next"). Our reading: a segment is evaluated
  from a root of its own: the mrepo's at first; after a filter, each
  node that is left; after a shortcut, the root of the mrepo linked
  there. Each is a jump, as `haicc` makes them, and the jumps in order
  are the prefix of what is found.
- **A folder holds shortcuts or subfolders, not both**: the human's
  first thought ("We can start with the constraint..."), then dropped,
  on our note that it does not hold today (the boot mrepo's root holds
  `host`, a shortcut, beside `swarms`) and that the mixed folder is one
  case of the union: "Drop the constraint, we take it as a usage
  restriction of xpath. Then when we put union in it gets resolved
  (initial known issue)". So nothing is refused at the making; the
  structure stays free.
- **The usage restriction of the first implementation** (settled: the
  human's "good, so that is for next step implementation" on our limit,
  and the line above): a query goes on from one shortcut at a time, as
  `haicc` does. Where its set holds several shortcuts, or shortcuts
  beside ordinary nodes, and the query goes on from there, it says so
  and stops: a known issue from the start. The fan-out and the union
  are the next step, and resolve it.
- **A mixed folder asks for a union** (the human: "doesn't the mixed
  shortcut and subfolder require a union in xpath?"; ours: yes). The
  set goes on two ways, and what comes back is two node sets made one:
  what was found here, and what the hops returned. That is XPath's
  union, applied by the engine instead of written by the asker (`a |
  b`): one operation serves both. Three cases of it, by what it takes:
  - **the sets of several local roots** (after a filter, each node left
    is a root of the next segment): put together in one process, in
    order: nothing to build;
  - **the sets of several shortcuts** (a folder of links, `nodes/*`
    then on into each): a hop each, their answers made one. The
    constraint does not remove this one. It needs a request that waits
    for several children, which is not built (a principal waits for
    one);
  - **a mixed folder**: both of the above at once: what the constraint
    removes.
  So for the very first implementation: a hop from a single shortcut
  only, as `haicc` makes it today; a set of several shortcuts that the
  query goes on from says "not yet" and stops. The fan-out and its
  union are the step after. (Agreed: above, "The usage restriction".)
- **Open, asked and not answered**: where the first implementation
  lives: in `crud/read`'s URI first (ours), or in the request layer for
  every command.

**The storage a type is kept in** (the human, on the measurements of
git, the Corestore and a Hyperdrive: "this is very useful information
for storage decisions on type"): noted for when a type's storage is
chosen; the figures are under "Commits", above.

**A node set as a pointer, in git** (ours, on the human's question:
"If we take reference in our git based system, how would we point /
select to the list of requests?"; put to the human, not answered)

- **A folder at a commit is a tree object**, named by the hash of its
  content: that id is the pointer. "All requests done" is the tree at
  the root of the layer `request/done` at one commit: a record a file
  there, `<key>.json`. Holding `{ commit, path }` (or the tree's id)
  holds the whole set, fixed: it cannot change under the query, which
  is the rule of no dirty reads, and a run can be repeated from it
  (`mycelium-git`'s `pinned`: a repository at a recorded state).
- **Listing it reads one object**: the tree gives each member's name and
  its own id, none of their content. A member is read only when a
  filter looks into it. A filtered set is then a list of names and
  ids: still pointers.
- **The same id, the same set**: what a filter gave over a tree can be
  kept by that tree's id and given again without reading anything,
  for as long as the folder has not changed.
- **A side branch goes on inside the document** (our reading,
  confirmed: "the JSON doc as tree: yes"): a record is one file, and the request's URI is three levels
  inside it (`value`, `value`, `uri`). So the tree does not end at the
  file: an object in the document is a node, its leaves the attributes
  (the human: "leaf keyvalue"). `mycelium-xpath` reads an object that
  way already (`objectChildren`). The example, in illustration:
  `request/done/*[value/value/uri='main/host']/value/value/output`.
- **A folder as a list, append only** (the diagram the human asked
  for): three requests done, `a`, `b`, `c`, one after another.

  ```
              c1 <──── c2 <──── c3 <──── request/done
              │        │        │        (the branch names the newest commit)
              ▼        ▼        ▼
  the folder  T1       T2       T3
  at that     └ a      ├ a      ├ a
  commit               └ b      ├ b
                                └ c

  records     a        b        c        (each stored once: T2 and T3 point
                                          to the same a, T3 to the same b)
  ```

  An append is one new record, one new tree, one new commit; nothing
  before it is changed or removed. The set now is `T3`; the set as it
  was is `T1` or `T2`, by its commit. The sequence is the commits
  walked from the right: `c3` added `c`, `c2` added `b`, `c1` added
  `a`. The cost shows too: each new tree lists every record again.
- **A folder inside a folder** (the human: "that folder is child on
  another folder, how does that work?"). A tree's entry is a file or
  another tree, held by its id. A commit names the root tree; a folder
  anywhere is reached from it down its path, a tree a step. One node
  added under `swarms`:

  ```
  commit c1                     commit c2   (swarm-2 added)
     │                             │
     ▼                             ▼
   root R1                       root R2            new: its entry for swarms changed
   ├ notes ──► N1                ├ notes ──► N1     the same tree: not touched, shared
   └ swarms ─► S1                └ swarms ─► S2     new: one entry longer
               └ swarm-1                     ├ swarm-1   the same as before, shared
                                             └ swarm-2   new
  ```

  A change makes a new tree for each folder on its path, up to the
  root, and for nothing else: what is beside the path keeps its id and
  is shared between the commits. So the pointer to a node set anywhere
  is the commit and the path, which lead to that folder's tree; and a
  folder that did not change (`notes`) has the same id at `c1` and
  `c2`: what was filtered from it at `c1` still holds at `c2`.
- **A commit does not write the whole tree again** (the human: "does
  that mean that for each commit the whole tree and its objects are
  redrawn?"; ours: no). Each commit shows the whole tree, but writes
  only what is on the path of the change: the new or changed file, one
  tree a folder from it up to the root, the commit. In the diagram
  above `c2` wrote five objects: the root, `swarms`, `swarm-2`, its
  document, the commit; `notes`, `swarm-1` and all below them were not
  touched, however much that is. So a commit costs the depth of the
  path times the width of each folder on it, and nothing for the rest
  of the repository: the measurements say the same (a folder of 100
  children 119 commits a second; the same five levels deeper 91; a
  folder of 10,000: 11).
- **Two commits, two roots, shared below** (the human: "so commit 1
  does not have a reference to a different tree than commit 2?"). It
  does, at the top: a commit names one tree, its root, and the two
  roots differ (`R1`, `R2`), since the root's entry for `swarms`
  changed. The sharing is below them:

  ```
  c1 ──► R1 ──► S1 ──► swarm-1 ◄── S2 ◄── R2 ◄── c2
          │                        │       │
          └──────► N1 ◄────────────┼───────┘
                                   └──► swarm-2
  ```

  Both roots point to the same `N1`; `S1` and `S2` to the same
  `swarm-1`. Two commits name the same root only when nothing at all
  changed between them.
- **What is written again is a folder's listing, not its contents**
  (the human: "So folder tree gets duplicated and folder contents for
  affected folders"; ours: the first half; the human: "listing is what
  I meant, listing of the references of its content"). For each folder on the
  path, its listing is written again whole, with the change in it: a
  name and an id an entry, some forty bytes, whatever the size of what
  the entry names. The files and the folders it lists are not written
  again: the new listing points to the same ones. A folder of 10,000
  files of a megabyte each, one file added: a new listing of 10,001
  entries, about 400 KB before it is compressed; none of the ten
  gigabytes. That listing is the cost of width measured above.
- **A listing is in name order: an entry is neither appended nor
  prepended** (the human: "What is the reason that new object refs
  (folder contents) are appended and not prepended if they are without
  order?"). Our diagrams misled: `a`, `b`, `c` stood in the order they
  were added only because that is also their order by name. Git keeps
  a listing sorted by name, and a new entry goes to its place in it,
  anywhere. The reason is the id: a tree is named by the hash of its
  listing, so one set of entries must have one way of being written,
  whatever order they were added in; sorted, the same entries always
  give the same id (and two listings can be compared by walking them
  side by side). So a listing does have an order, by name; what it
  does not have is the order of arrival: that is in the commits. With
  keys that are GUIDs, as the app's are, the name order says nothing.
- **To settle**: keys that sort by time (a timestamp first, as the
  tests' keys have): then a listing's own order is the order of
  arrival, the order a query gets unasked means something, and
  subfolders by date follow from the key. **Git allows it** (the
  human's question): a name is any bytes but a slash, and the order is
  a plain comparison of the names, so nothing in git changes: only the
  name we give. What it asks of the name: the time first, at a fixed
  width (a number padded, or a date written year first). A GUID of
  version 7 is that, its first 48 bits the time in milliseconds, and
  still a GUID: the smallest change (ours are version 4, all random).
  What git does not allow is another order than by name: a listing not
  sorted is not a valid tree. **Always ascending** (the human: "does
  git read it or order it always in ascending order"): stored so, and
  read back so. But a listing is one object, read whole: once read it
  is an array, and walking it from its end, the newest first with such
  keys, costs nothing more. What cannot be done is to read only its
  end: a wide folder is read whole for its last entry, one more reason
  for subfolders by date (the latest is then in the last folder).
- **How many to a folder** (the human, on keys by time and folders by
  date: "ok, this will give us optimal number of folders, objects per
  folder"). What the measurements say of it (here, and the laptop the
  same in proportion): under a hundred entries a folder gains little
  (10 children 137 commits a second, 100: 119); a thousand halves it
  (55); ten thousand leaves a tenth (11). A level of depth costs about
  a twentieth (the folder of 100 five levels deeper: 91). So the
  sweet spot is one to a few hundred entries a folder, and as many
  levels as that takes: a million records, three levels of a hundred.
- **Branches are independent, for a commit and for a read** (the
  human's question; ours: yes).
  - A branch is a name that points to a commit. A commit on one branch
    moves that name and no other: writers on different branches do not
    wait for each other (measured: up to 24 at once, each on its own
    branch, no error).
  - A read holds a commit, so no commit on any branch, its own
    included, changes what it sees.
  - What they share is the store of objects, which is safe to share:
    an object is named by its content, so the same one written from
    two branches is one object. And the folder of branch names, which a
    listing of the branches walks (part 65's repair).
  - Where they are not independent: inside one branch (one writer: a
    second commit on the same head is refused), and where one is
    merged or squashed into another, the one point they meet.
  - Our layers are branches with nothing in common, not even a first
    commit; an execution's branch starts from its target and meets it
    again once, at its squash.
- **One commit, one node set for every part of the query** (the
  human's question: "when we read at fixed commit, it selects the
  nodeset that goes with it for each part of the query?"; ours: yes).
  The commit fixes the whole tree below it, every folder and every
  document: each segment and each filter of the query reads the same
  state. With several layers in a query, one commit a layer (a branch
  each): the fixed state is `{ layer: commit }`.
- **The node set is one commit's tree, not the commits walked** (the
  human, on the diagram: "for nodeset we are walking the set of one
  commit. It looks like linked list"). Right, and ours had run two
  things together. The commits are the linked list, each pointing to
  the one before. A node set never walks them: it is the tree of the
  one commit read at, one object listing all its members, by name.
  The chain is a second thing, an order in time, and no part of a node
  set.
- **Two ways to point at the list**, by what is asked:
  - the set: the layer's tree at a commit, its members in name order
    (the keys are GUIDs: that order says nothing);
  - the sequence: the layer's history from a commit back, a commit a
    request done: the order they were done in, walked only as far as
    needed (the last ten). `mrepo-base-request`'s `arrived` reads the
    order this way already.
- **A finding with it**: `request/done` is one flat folder that every
  request adds to, and a commit writes again the tree of each folder on
  its path. Measured ("Commits", above): a folder of 100 children 119
  commits a second, of 10,000: 11. So the list of requests itself wants
  subfolders (by date, say): each older one then never changes, its id
  stays, and what was filtered from it stays valid.
- Outside reaches `main` only: the request layers are read by the
  mrepo's own requests, or through a protocol that offers them.

**Proposed** (ours, not yet put to the human; written before the lines
above: every step below is to work in both modes). Each as a feature is
built now: a demo with the `haicc` tool first, then the real thing, the
demo kept as its how-to.

1. **The cut**: a plain URI through one shortcut rewritten to its
   `haicc` hop; one node set comes back under its prefix. No merge yet.
2. **The fan-out and the juxtaposed merge**: `*` meeting several
   shortcuts; a child request each, their answers merged. With it what
   task 1 left (`tasks.md`): `resolve` giving an array of positions, the
   jumps as segments, the prefix on an answer.
3. **Filters on the name and on the document**, pushed down.
4. **Descendants.**
5. **Stacked layers**: several sources at a node and local data; the
   merge that places one on another; filters after it.
6. **Filters with a path inside, the union**; then position, what comes
   back, aggregates.

## Parallel execution: threads

Raised by the human with the XPath pipeline, 2026-11-14; it reaches
beyond XPath, into the runtime and the request layer.

**Settled** (the human)

- "For corestore, single is for write, read can be parallel."
- "If we cut xpath in haicc segments and this is read only, then having
  multiple threads processing on input is very beneficial."
- "Furthermore all our requests can go multithreaded. What needs a
  single thread is the request train and commit to main."
- **No dirty reads**: "We fix read to a commit that has happened
  already." So whether a reader that stays open sees what is written
  after it opened is "not an issue".

- **Two requests that wrote the same path, run at once**: "Yes, the
  later one is run again on the new state - initial implementation."
  (Our proposal with it: different paths merge; the train's order says
  which is first. Read-only requests have nothing to settle.)

**Found** (tried here, 2026-11-14: Bare v1.36.0, four cores, a shared
machine; Corestore 7.16.1, Hypercore 11.39.6, rocksdb-native 3.19.3)

- **Bare runs threads in parallel**: `Bare.Thread`, in Bare itself, a
  JavaScript entry on an OS thread of its own. Four runs of a loop:
  2107 ms one after another, 859 ms a thread each. A thread has its own
  heap: nothing shared but what is passed (its `data`, a message over
  `bare-channel`, a shared buffer).
- **A thread does not load its modules from disk**: its module graph is
  bundled ahead (`bare-thread`, `Thread.prepare`; in `node_modules/`
  already, with `bare-channel`, brought by `brittle` and `bare-fs`), and
  the bundler follows only a `require` written as a plain string. Our
  packages are bundles already.
- **Threads and processes perform alike** (the human's question; three
  runs each, the spread between runs larger than the gap). Starting: 20
  empty processes 660 ms, 20 empty threads 648 ms, started together. A
  plain loop, 2 at once: processes 1021 to 1188 ms, threads 1015 to
  1164; 4 at once: 943 to 1070 against 993 to 1083. Work that allocates
  (node sets built, as JSON and back, filtered, sorted), 2 at once:
  processes 1510 to 2033, threads 1216 to 1616; 4 at once: 1786 to 2747
  against 1925 to 2120.
- **The Corestore is as the human says**: with a store open for writing
  and kept open, a second writable open is refused, from a thread and
  from a process ("File descriptor could not be locked"); a read-only
  open (`new Corestore(dir, { readOnly: true })`) reads it, from a
  second thread, from a second process, from four threads at once; one
  opened after a later write sees that write.
- **Several writers, each committing on a branch of its own, at once:
  it works** (the human's question; tried on the filesystem with the
  p2p-git engine, where the request and execute layers always are):
  eight processes, each 25 commits on its own branch of one repository,
  every commit also writing one file with the same content in every
  branch (the same object written by all): three rounds with the
  branches made beforehand, three with each worker making its own: no
  worker failed, 200 of 200 files read back each round. Branch creation
  alone, 25 more rounds of eight at once: none failed. Why it holds: an
  object is named by its content, a branch is a file of its own, and a
  branch moves only from the commit its writer saw (compare, then
  write). Tried with processes: threads have separate heaps and meet
  the same files, so the same was expected, and tried since: "Commits", below. Speed here: the
  200 commits by eight at once 1300 to 1500 ms, by one worker 1700 to
  1850 ms: little gained on commits this small, most of it start-up.
- **What is there today** (`pear-full-square/mrepo-base-request`): a
  request begins on a branch of its own (`execute/<key>/request/execute`)
  and is merged at its end, so the shape is there; but one at a time:
  "the next begins when no branch is being processed". The request and
  execute layers are on the filesystem whatever the storage, each its
  own writer. Nothing of ours uses threads: an mrepo's runtime is a
  process (`bare-subprocess`).

**Ours** (not answered)

- Our reading: the train (a request admitted, the queue, its order, a
  request begun, moved to done) and the merge into `main` stay on the
  one thread; what a request executes between its beginning and its
  merge runs on a thread, several at once. For the XPath pipeline: each
  select and filter a thread reading the store read-only.
- A thread reads one fixed state throughout, the commit of `main` its
  request began on: the same input gives the same result whenever it
  runs, so a run can still be repeated exactly.

**To settle**

- How a thread hands its result to the train (it can commit on its
  request's branch itself: tried, above).
- How many threads (the cores), and what a thread is given: a package's
  bundle, the request, the state to read.
- p2p-git's two open defects for a reader beside a writer (the handover,
  "Elsewhere") come first: they are met at once with threads.

## Commits: how often, and what git handles

The human, 2026-11-14: "What we need to find out the sweetspot frequency
for commits, what can git handle and how does multithreading affect
this."

**Settled** (the human)

- "Our high frequency commits are on filesystem layers. We squash the
  commits when merging into main so less history growth there, and much
  lower frequency. Request branches should be cleaned up under normal
  circumstance."

- **The rates** (after the measurements): "Our request rate and request
  branch commit rate will be significantly higher than the request
  branch creation rate. The number of commits per request branch will be
  low (<100)." Our reading, confirmed ("Yes, consecutively"): a request
  branch carries several requests (a pipeline's steps) and their
  commits, one after another; what is paid a branch (made, merged into
  `main`, removed: the train's part) is paid far less often than what
  is paid a commit, which is cheap. In parallel are the branches, not
  the requests on one branch.
- **The two repairs are a task**: "Yes, put them on the task list.
  Sounds like a good starting position" (`tasks.md`, task 4).
- **The same measured on the human's laptop** (twelve cores), by the
  local agent: in `prompt-local.md`.

**Against what is built** (found, 2026-11-14; both repaired since:
`readme.md`, part 65, and "After the repairs" below)

- **The merge into `main` is a plain merge today**, not a squash
  (`mrepo-base-execute`: `w.merge(...)`; `mycelium-git`'s `merge` makes
  a merge commit, and its `deleteBranch` asks that the branch's head is
  in the target's history, which a squash does not give). The squash is
  to build.
- **A request's branch is removed today, but not all of it**: its empty
  folders stay under `refs/` and its objects stay (loose objects only,
  nothing collects them; each merge also leaves one commit nothing
  refers to). Both are in the numbers below.

**Found** (measured here, 2026-11-14: the machine and versions as above;
the filesystem with the p2p-git engine unless said; each commit one
small document put at `swarms/n<x>/.node.json`, a folder of 100
children; ext4, nothing forced to disk). Kept since as a tool, to be run
again: `tools/bare tools/commit-bench.js` (one line of JSON a
measurement; about six and a half minutes here).

- **Writers at once, each on its own branch** (threads really, this
  time; branches of one layer, `execute/<id>/main`, made from `main`;
  300 commits each, three runs; no error in any). Commits a second, all
  writers together:

  | writers | threads | processes |
  |---|---|---|
  | 1 | 107 to 118 | 115 to 119 |
  | 2 | 220 to 231 | 185 to 225 |
  | 4 | 240 to 256 | 257 to 262 |
  | 8 | 262 to 266 | 283 to 349 |

  It follows the cores: this machine gives a plain loop about 2.5 times
  from its four. Separate layers (`data/w<i>`, an orphan branch each)
  were the earlier trial with processes: the same holds.
- **One commit, one writer**: 7 to 9 ms. Each object written (a blob, a
  tree, a commit) or a branch moved: 0.5 to 1.4 ms, and that does not
  change as the history grows.
- **A folder's width costs**: a commit writes again the tree of every
  folder on its path. One writer, commits a second: a folder of 10
  children 137; of 100: 119; of 1000: 55; of 10000: 11. The folder of
  100 five levels deeper: 91.
- **A long history on one branch does not slow a commit**: 12,000
  commits, 130 to 148 a second throughout. On disk: 60,205 loose
  objects, 241 MB (about 20 KB a commit: five small files of one block
  each).
- **`main` in the Corestore** (a Hyperdrive under p2p-git): 112 commits
  a second, one writer: as the filesystem.
- **Native git** (a git process an operation): 24 commits a second.
- **A request's cycle on one thread slows as requests are done** (its
  branch made from `main`, one commit, a plain merge into `main`, the
  branch removed), ms each:

  | requests | branch made | a commit | merge into main | branch removed | together |
  |---|---|---|---|---|---|
  | 1 to 50 | 7.1 | 10.3 | 21.7 | 4.8 | 44 |
  | 51 to 100 | 14.9 | 13.6 | 47.5 | 9.0 | 85 |
  | 101 to 150 | 23.2 | 17.7 | 71.3 | 12.9 | 125 |
  | 151 to 200 | 34.7 | 22.7 | 104.4 | 17.9 | 180 |

  Two causes, neither the writing:
  - **the branches listed** (six times a request: 3.2 ms a call at
    first, 16.4 after 150 requests): every removed branch leaves its
    empty folders under `refs/`, and the listing walks them all. After
    200 requests: one branch, 204 folders. It counts for the whole
    repository, every layer: a branch removed anywhere slows every
    listing;
  - **the ancestry check** (twice a request: 5.1 ms a call at first,
    33.1 after 150): `isAncestor` walks the whole history of the branch
    merged into, to find that the request's commit is not in it yet. It
    counts for that layer only.
- **Not tried**: the merge from a branch on the filesystem into `main`
  in the Corestore (the `p2p` storage's mixed backend: the objects
  carried over); writes forced to disk.

**After the repairs** (part 65, 2026-11-15; the same measurement, the
cycle now as the execution does it: squashed, the branch removed)

| requests | before | a removed branch takes its folders | and the squash, the ancestry check bounded |
|---|---|---|---|
| 1 to 50 | 42 ms | 28 | 17 |
| 51 to 100 | 90 | 46 | 15 |
| 101 to 150 | 152 | 61 | 20 |
| 151 to 200 | 212 | 80 | 21 |

Over 3000 requests it stays there: 18 to 21 ms a request, about fifty a
second on the one thread, at this level (the repository alone: the
request's own record, its envelope and the runtime's pass come on top).
The branches listed: 1 ms a call throughout. The ancestry check: under
1 ms a call. Found on the way: the squash alone does not take the
ancestry check away, the request's own record is still merged, and
every merge asks it; so the check itself was made to read only what the
two histories have apart.

**On the human's laptop** (the local agent, 2026-11-15, `main` at
`c8200f7`, after the repairs: `local-note.md`; 14 cores, an Intel Core
Ultra 5 225H under WSL2, ext4 on its virtual disk; the same tool, 480
seconds, no error). Beside ours, four cores:

| | here, 4 cores | the laptop, 14 cores |
|---|---|---|
| a plain loop on all cores, against one | 2.5 to 4 times | 6.3 times |
| one writer, commits a second | 107 to 119 | 183 to 207 |
| 2 writers | 185 to 231 | 291 to 326 |
| 4 | 240 to 262 | 414 to 525 |
| 8 | 262 to 349 | 589 to 675 |
| 12 | | 707 to 883 |
| 14 | | 806 to 865 |
| 16 | | 790 to 857 |
| 24 | | 823 to 1064 |
| a folder of 10 children, one writer | 137 | 225 |
| of 100 | 119 | 206 |
| of 1000 | 55 | 110 |
| of 10,000 | 11 | 18 |
| of 100, five levels deeper | 91 | 151 |
| 12,000 commits on one branch | 130 to 148 | 231 to 310 |
| `main` in the Corestore | 112 | 207 |
| native git | 24 | 61 |
| a request's cycle, requests 1 to 200 | 15 to 21 ms | 12.6 to 15 ms |

(Threads and processes together in a row; two single runs far above
the others, 1122 and 1214, left out.) The same shape, about twice as
fast a writer: the commits go on gaining up to about the number of
cores, 800 to 900 a second, and no further; threads and processes
alike; width costs the same share; the cycle is flat there too, the
branches listed in 1 ms, the ancestry check in 0.6 ms.

**Git against plain files** (the human: "how does this git performance
compare to filesystem folder file operations?"; measured here,
2026-11-15, four cores, ext4, one thread, the same small document at
`swarms/n<x>/.node.json`; our engine, p2p-git, in JavaScript; a scratch
script, not kept). Operations a second:

| | plain files, a folder of 100 | git, 100 | plain files, 10,000 | git, 10,000 |
|---|---|---|---|---|
| a document written over | 8,200 (2,200 forced to disk) | 129 (a commit each) | 13,500 (1,900) | 13 |
| a node added | 3,600 | 105 | 42,600 | 11 |
| a document read | 196,000 | 232 | 134,000 | 24 |
| the folder listed | 104 (2,100 entries by then) | 292 (400 entries) | 20 (12,000) | 26 (10,040) |
| 1000 documents written in one commit | | 1,490 documents | | 850 documents |

- **That was git on the filesystem** (the human: "are you testing git
  on filesystem or git on corestore?"). The same engine with the
  Corestore under it (a Hyperdrive, as `main` is stored with the `p2p`
  storage), measured after, operations a second:

  | | filesystem, 100 | Corestore, 100 | filesystem, 10,000 | Corestore, 10,000 |
  |---|---|---|---|---|
  | a commit | 114 | 99 | 11 | 9 |
  | a document read | 354 | 472 | 22 | 22 |
  | the folder listed | 474 | 664 | 21 | 26 |
  | documents a second, all in one commit | 324 | 306 | 730 | 381 |

  The same within the spread of a run: a commit a little slower on the
  Corestore, a read a little faster, many documents in one commit of a
  wide folder half as fast. So the cost is the engine's (each object
  compressed, hashed, read back and parsed), not what it stores into.
- **Files and folders on the Corestore without git** (the human: "is
  there another one? folder and file type on corestore (no git)?").
  There is: a Hyperdrive (13.3.4, here already: our git engine keeps its
  objects in one, and `p2p-store` opens them). Used directly, a path a
  file, operations a second:

  | | a folder of 100 | of 10,000 |
  |---|---|---|
  | a document written over | 1,430 | 1,490 |
  | a node added | 1,680 | 1,840 |
  | a document read | 8,000 | 6,100 |
  | read at a fixed version | 11,400 | 4,800 |
  | the folder listed | 23 (1,100 entries) | 2 (11,000 entries) |
  | documents a second, 1000 in one batch | 2,970 | 3,610 |

  Against git on the same store: a write 12 times faster in the narrow
  folder and over a hundred times in the wide one, because width does
  not matter to it (the paths are keys in one sorted tree, not a
  listing a folder); a read 20 to 280 times faster. Listing a folder is
  its weak side: about 40 microseconds an entry, five times git's.
  - **What it has of what git gives us**: every write a version, in
    one line; the drive read as it was at a version (tried: one opened
    at a version does not see what is written after: no dirty reads);
    many writes as one batch, whole or not at all; the difference
    between two versions; names in order; replication, its own.
  - **What it has not**: branches (one line of versions a drive, one
    writer), so no request's branch beside `main`, no merge, no
    squash: a request's work would be a batch, or a drive of its own;
    and no id for a folder's content, so nothing says "this folder is
    the same as before" without comparing.
  - To settle, if it is wanted: what a request's branch becomes without
    branches, and whether two batches can be open at once.
- **Per operation git is one to three orders slower**: a write about
  60 times (17 against a write forced to disk), a read about 800
  times. Listing is alike, an entry a few microseconds either way.
- **Why a write**: a commit is five objects (the document, a tree a
  folder on its path, the commit), each compressed, hashed and written,
  then the branch moved. **Why a read**: nothing is kept between two
  reads; each walks from the branch down: the branches listed (0.6 ms),
  the commit, the root, the folder, the node (0.3 ms an object), the
  document: 2.6 ms. The wide folder's listing alone takes 36 ms to read
  at 10,000 entries (1 ms at 100): width costs a read as it costs a
  commit.
- **What is had for it**: a change that is whole or not at all, its
  history, a fixed state to read at, an id for every folder's content,
  writers side by side on branches, and replication.
- **What narrows it**:
  - **many changes a commit**: 1000 documents in one commit, 1,490 a
    second, eleven times one commit each: the grain is a step's batch,
    not a record;
  - **keeping what was read, by its id**: an object never changes, so a
    tree read once need not be read again: a read is then its document
    alone (0.25 ms), or nothing. Nothing does this today. The XPath
    node set as a pointer is the same idea: each tree read once a
    query;
  - **narrow folders**, for reads as for commits;
  - to look at: how much of the 36 ms is our own (the listing sorted
    again as it is read).

**Ours** (not answered)

- **Git is not the limit for the commits themselves**: about 110 to 140
  a second a writer, more with the cores, steady over a long history.
  Multithreading helps the executions; it does not help the train,
  which is one thread by design.
- **The limit was the train's bookkeeping**: repaired (above). What a
  request costs at this level is now steady, so a frequency can be
  chosen from it: about 20 ms a request's cycle with one commit, 6 to
  7 ms each commit more.
- **Keep folders narrow**: under about a thousand children a folder; a
  wider set split over subfolders. A commit a step, not a commit a node.
- **Space**: about 20 KB a commit on the filesystem and nothing
  collected. With the squash and the branches cleaned up, what a
  request wrote on its branch can go with it: a collection of objects
  nothing refers to is to build for the filesystem layers.

**To settle**

- The objects a removed branch leaves: a collection for the filesystem
  layers.
- What the request layers cost on top (the record's own branch, its
  merges, the envelope, the runtime's pass): the cycle measured through
  a running mrepo, a request a time.

## To settle

- **The syntax**: XPath's own or ours. A URI is typed in a shell: `*`,
  `[`, `|`, `>` need quoting there.
- **The stacked merge's rule**: which layer is on top (local data, the
  sources in their order), and whether a node on top replaces the one
  below whole or their documents are combined.
- **A command that is not a read, executed at a selection** (`haicc
  swarms/* service/start`): its answers are not node sets (the human: "a
  response can contain any data type"); what the merge does with them,
  and with one that fails.
- **A hop that cannot be made**: the linked mrepo not running, the
  protocol not active there, no answer in time.
- **Where the merge lives** (an action of the `haicc` protocol, the
  request layer) and where the rewrite's code does.
- **How the plan is recorded**, so a run can be repeated exactly.
- **The read of a replica**: `tasks.md`, task 2, noted reading through a
  link as a local read of a replica, beside the `haicc` jump. By this
  design a link is crossed with `haicc`; whether the replica read
  remains as a second way.

## Where

What is there today, to start from; check it again, the code may have
moved.

- `pear-full-square/mycelium-xpath`: `select`, a plain path and `*` at
  any step, names matched exactly; generic, knows no mrepo.
- `pear-full-square/mrepo-base-xpath/internal/resolve/`: a URI resolved
  to one position; one that runs through a shortcut is refused; a
  shortcut's sources are a list, the first one in use.
- `pear-full-square/mrepo-base-haicc/external/goto/`: at a shortcut the
  command that follows is sent on, one command to one place; no fan-out.
- `pear-full-square/mrepo-base-crud`: `*` as the last name part only; a
  URI does not run through a shortcut.
- `pear-full-square/mrepo-base-request`: a command interpreted on its
  way in (`lib/command.js`), where a rewrite would sit.
- `vision.md`, "Pipelines, and mycelium as a database server" and
  "Overlays"; `tasks.md`, task 1 (the prefix, the jumps, selections as
  arrays) and "Predicates in a URI".
