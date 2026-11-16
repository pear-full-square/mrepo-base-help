# Prompt for the local agent: the organisation profiles

A task of its own, beside `prompt-local.md` (2026-11-16). The human: "we
need to review the org profile to bring it in line with current state",
and, on who does it: "it can do all of it, so you only need to tell it
here." The cloud session can read the profile repositories but not push
to them (a repository whose name starts with a dot cannot be attached
there), so the whole of it is yours: the review, the new text, the push.

> Review the five organisations' profiles and bring them in line with
> the platform as it is now.
>
> 1. **Where they are.** Each organisation has a repository `.github`
>    whose `profile/README.md` is its profile page on GitHub:
>    `haiccing`, `pear-full-square`, `splectrum`, `splectral`,
>    `bare-for-pear`. All five were last written on 2026-11-08 ("Profile:
>    the organisation's purpose and context, after phase 2"), before the
>    rebuild. `pear-full-square/.github` has a `README.md` at its root
>    besides: look at it too.
> 2. **What the platform is now.** Read it from this repository, at the
>    `main` you last tested: `CLAUDE.md` ("What is here"),
>    `haiccing/README.md`, each package's README, and
>    `steps/2-rebuild/handover-next.md` ("Right now"). In short: an
>    install is a boot mrepo on a machine, with mrepos deployed beside
>    and below it (a host, a swarm's nodes, each node with its replica
>    in a Docker container, Splectral); everything is done with the
>    `haicc` command, a command a request recorded with its log; every
>    package is one bundle run with Bare, tested from that bundle, with
>    its test report in it.
> 3. **What the cloud session found** (a reading of the five pages
>    against that; check each point yourself, and look for what it
>    missed):
>    - **`haiccing`: the most out of date, and its "Start here" no
>      longer works.** It installs with `haicc-setup.sh` from
>      `haiccing/base-package-haicc`'s latest release, then
>      `~/haicc-work/boot` and `./haicc list`: none of that exists any
>      more. Check what the command does today against the release you
>      published (`r-61acff6`): if it fails, that is the first thing a
>      visitor meets. It also describes the HAICC tool as declaring what
>      a project needs and making it so, a project as a swarm with
>      SPLectral and two demos (a node going quiet, a node joining by
>      invitation), a setup of 39 MB, a boot that checks git and Docker
>      and fixes what is missing, and a `log/` folder: all of the
>      earlier platform. What is true now: how one gets from nothing to
>      a running cluster with Splectral showing it (the steps of
>      `prompt-local.md`, 2 to 4 and 7 to 8, as a visitor would do
>      them), and that installing from the releases is not built yet
>      (`haicc sources download` fetches Bare only): say what works, not
>      what is planned. The organisation also still holds repositories
>      of the earlier platform (`base-demo-liveness`,
>      `base-demo-other-host`, `base-swarm-three-nodes`,
>      `base-package-pkgm`, `base-package-p2p`,
>      `base-package-third-party`): the page should not send a visitor
>      to them as if they ran.
>    - **`pear-full-square`: the families of modules are not the ones
>      there are.** It names `mycelium-`, `p2p-` ("the swarm and its
>      nodes"), `splectral-`, `haicc-` and `pkgm-`. Missing: `mrepo-`,
>      the largest family now (the runtime, request and execute, and a
>      module a protocol: boot, service, crud, haicc, help, howto,
>      container, protocol, xpath). `p2p-` in use is the store, its
>      replication and the repositories on it; the node, its manager,
>      the DHT and the name service are of the earlier platform and
>      rest in their repositories. `splectral-` in use is the server
>      alone, on an mrepo; the model, the shell, the views' platform
>      rest. `haicc-` is the `haicc` command's app.
>    - **`splectral`: it describes what is resting as what runs.** The
>      views and scenarios there (the map, the two demos) belong to the
>      earlier platform. Splectral's first step on the mrepos is in
>      `haiccing/base-package-splectral` and
>      `pear-full-square/splectral-server`: one page showing an install
>      as a tree and its commands as they complete. The components come
>      back as the platform needs them.
>    - **`splectrum`** and **`bare-for-pear`**: nothing found that is
>      wrong; check them against the same state all the same (the three
>      pillars, where things live, what rests).
> 4. **Write the new text.** Keep each page's voice and its length:
>    plain, short, what is there now and where to start; no promises,
>    nothing that is planned said as if it were built. Keep the links
>    between the organisations and to
>    [splectrum.world](https://splectrum.world). A command on a page is
>    one you ran, as written, on this machine.
> 5. **Show the human before you push.** These pages are public: put
>    the five texts (or the changes to them) to the human, and push
>    only on the human's word. Then one commit a repository, on its
>    `main`.
> 6. **Write a note back**, in `steps/2-rebuild/local-note.md`, a new
>    section at the top, dated: for each organisation what you changed
>    and why, the commit, and anything in the cloud session's reading
>    that was wrong. Commit only that file on `execute/main`, merge it
>    into `main` (a plain merge), push both.
>
> Do not change the code. If a page needs something that does not exist
> yet (an install from the web), say so in your note: it is a finding,
> not something to write around.
