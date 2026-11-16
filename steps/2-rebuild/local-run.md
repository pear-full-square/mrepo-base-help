# The local runs: the releases

## 2026-11-16: the release `r-61acff6`

On the human's word ("this time we will release to github all going
well"; the shape proposed and confirmed: "yes, you know what needs to go
in the release"), after every test of `prompt-local.md` passed on that
commit (`local-note.md`, 2026-11-16). Unsigned; Bare not published.

- **Commit tested and built:** `61acff6` (`main`), Bare v1.36.0, the
  sources of `tools/bare tools/release.js --strict` (the last build of
  the run), every report `current`.
- **Tag:** `r-61acff6` (`r-` and the tested commit, seven characters), the
  same on each of the sixteen repositories of `haiccing/`, a release
  each, titled as its tag, created with `gh release create` as
  `jules-tenbos`. Each tag points at the head of its repository's default
  branch at that moment: `base-app-haicc` a20f927, `base-component-boot` 650f204, `base-component-haicc` e1febce, `base-linux-haicc` c94ab88, `base-package-boot` 2952b14, `base-package-container` 6f7f7e7, `base-package-crud` 296fcdd, `base-package-haicc` 6bc34e9, `base-package-help` 03b5fd8, `base-package-howto` 905c43d, `base-package-protocol` fb09a3a, `base-package-runtime` 7ddd1cf, `base-package-service` 2ce996b, `base-package-splectral` 40fc7e3, `package-docs-mrepo` 988fd8e, `package-docs-template` a3fb63f.
  Whether each repository's head held `61acff6`'s copy of the package was
  not checked: the assets are what was built and tested.
- **Assets, per package:** `<package>.bundle` (as in `sources/haiccing/`,
  its sha256 checked against the manifest); `<package>.manifest.json`
  (`{ package, commit, entry }`: `entry` the package's entry in
  `sources/haiccing/manifest.json` as it is); `<package>-addons.tar` (its
  native addons, the entry's `addons` list, each at `addons/<sha256>`,
  a plain tar, PAX, owner 0, mtime 0; each checked against its hash).
  `base-linux-haicc`: `haicc-install.sh` alone. 46 assets, 161 MB; the
  addons are repeated in each package's tar (17.4 MB for the packages
  with the runtime's code, 0.98 MB for the others).
- **Downloaded from:**
  `https://github.com/haiccing/<package>/releases/download/r-61acff6/<file>`.
- **Checked after:** every asset's size and digest on GitHub against the
  staged file (46, no mismatch); `base-package-howto.bundle` downloaded
  and its sha256 matched.
- The earlier release, `setup-a6d039296165` of `base-package-boot`
  (2026-11-09, signed), is left as it is.

| repository | file | bytes | sha256 |
|---|---|---|---|
| `base-app-haicc` | `base-app-haicc.bundle` | 4,309,100 | `4f27c313e98d6363acd788506aae5d916a673318c1486002be90b3a39a9cacd7` |
| `base-app-haicc` | `base-app-haicc.manifest.json` | 2,648 | `135f6d0fa40ef9d2893b85b92517de23e0078f4b335dbbaf7b5087ebbda29ca2` |
| `base-app-haicc` | `base-app-haicc-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-component-boot` | `base-component-boot.bundle` | 4,332,198 | `10b93a8b4ecf31fcf3c2394e871878c7816702fdbabc08f38d58ca71d1e26fa3` |
| `base-component-boot` | `base-component-boot.manifest.json` | 2,658 | `0b64eb26394ba40ced12d3a154f89b89f693ee6c5495a60d8a90243d84e14a49` |
| `base-component-boot` | `base-component-boot-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-component-haicc` | `base-component-haicc.bundle` | 1,059,236 | `bc107afc273f8bb4754a327d9ee032bbe4cd8e193137238600f3f5ac81191c47` |
| `base-component-haicc` | `base-component-haicc.manifest.json` | 2,125 | `fbbaaa81c4ebcfc0a770a9f6f8209c6bb0d07b939f545c4485c2d2262540b5af` |
| `base-component-haicc` | `base-component-haicc-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-package-boot` | `base-package-boot.bundle` | 4,297,483 | `0064ed67fdb248b1911298d60f03805d70897f8686a010b42c2e1f8509b742d9` |
| `base-package-boot` | `base-package-boot.manifest.json` | 2,659 | `cd09603a46f16afa747ae62916be0d5666f5d8347c205afd4f574875a08c8bfe` |
| `base-package-boot` | `base-package-boot-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-package-container` | `base-package-container.bundle` | 4,339,441 | `8222e8f648ac7e4507c5e097dd44b119d99e9c2f90b5dfb575a1ee6605bca8bf` |
| `base-package-container` | `base-package-container.manifest.json` | 2,669 | `4be109ea33c8afb606a719072cad3c6abb2094ef8f799fed3491bf0613e96c23` |
| `base-package-container` | `base-package-container-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-package-crud` | `base-package-crud.bundle` | 1,168,489 | `263b61c804a5d2bafa3e88047c2625a87d06bfdbced3df7f4f85e791b954e0d3` |
| `base-package-crud` | `base-package-crud.manifest.json` | 2,141 | `3e6f8d3f2e3c956172ff29110039b35afa7831ee06d7ef59478e903129230b73` |
| `base-package-crud` | `base-package-crud-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-package-haicc` | `base-package-haicc.bundle` | 1,144,790 | `dd4d4df7da7cd1ab7490e14a54000687718d0b1c7bf2ff27901b992755e2830e` |
| `base-package-haicc` | `base-package-haicc.manifest.json` | 2,143 | `678a8114dd60958274fe6561ecdac3f8d110111a73af2994a6e68c63c7908a56` |
| `base-package-haicc` | `base-package-haicc-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-package-help` | `base-package-help.bundle` | 1,053,709 | `daf8e51ec9e94d389e47e54272fe8a16fbc75abc4e1dc57a0707eb4bf8cda107` |
| `base-package-help` | `base-package-help.manifest.json` | 2,141 | `f55a426cdddfd24a4b1f73dd7dea8751387dacf79358450c4544097d1f95d182` |
| `base-package-help` | `base-package-help-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-package-howto` | `base-package-howto.bundle` | 1,085,239 | `f0f9c3bd6124490b1fb81e054d558a201d35f84884143a270033cc3bd96bd590` |
| `base-package-howto` | `base-package-howto.manifest.json` | 2,143 | `84695b0502b840c58e4e073bf413195cc3f085df9080ebd5cc6d1d6eaa2e1f2c` |
| `base-package-howto` | `base-package-howto-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-package-protocol` | `base-package-protocol.bundle` | 1,057,183 | `ab6ea403817fdc6d410f956516816eb6e9d791f1e5b6d15ff69dd916f274f8c7` |
| `base-package-protocol` | `base-package-protocol.manifest.json` | 2,149 | `b3b00a8ad399e8a3945d7df9ada8c7a85c8b78e74d8d6a077e5e07a576ff52a0` |
| `base-package-protocol` | `base-package-protocol-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-package-runtime` | `base-package-runtime.bundle` | 4,214,078 | `a15c21a83b39362149987b24b6410c8753b07af57744fae323d86a11dd6d2334` |
| `base-package-runtime` | `base-package-runtime.manifest.json` | 2,678 | `6a901108f3b6f1ac1ed1d3f5e29e9855c069a4856b377ff48df68218bd546dd5` |
| `base-package-runtime` | `base-package-runtime-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-package-service` | `base-package-service.bundle` | 3,958,798 | `c914bf3ee4753ece1c227e92e6c477ae89c069ae0593343db7d07ec866ffd986` |
| `base-package-service` | `base-package-service.manifest.json` | 2,665 | `5fd8710d631de781866eecf6137ec2a2e17a445db40f143d35a0c37d8da98deb` |
| `base-package-service` | `base-package-service-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-package-splectral` | `base-package-splectral.bundle` | 4,161,992 | `057b6fae90860af9b318e1181226820b92955a492e98ef7f9aaab2e135f11503` |
| `base-package-splectral` | `base-package-splectral.manifest.json` | 2,682 | `03faa2b1809bd6220fa9fb5436a88ce5b82fc2044dbd2afc207c35196f025df8` |
| `base-package-splectral` | `base-package-splectral-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `package-docs-mrepo` | `package-docs-mrepo.bundle` | 1,072,505 | `62a544c534db5e3bb12caa8b13a46121a2c843f5014d48fb69b96dbe176c5734` |
| `package-docs-mrepo` | `package-docs-mrepo.manifest.json` | 2,120 | `7d2497fbbf4475390b99016ff1bd6629b3f0b2cece0ce6fea0258fe88104d746` |
| `package-docs-mrepo` | `package-docs-mrepo-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `package-docs-template` | `package-docs-template.bundle` | 1,057,778 | `55893305f979597c96596d6afc9dd1d3500e07ca20d438b3b8bda97e213e5f76` |
| `package-docs-template` | `package-docs-template.manifest.json` | 2,126 | `bdae42ff57de5477a382f144ccf9e54fb897d29f885e9ff0934c01237a0c369a` |
| `package-docs-template` | `package-docs-template-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-linux-haicc` | `haicc-install.sh` | 11,895 | `4bfadf44249acab624ac59c7c7d2e60882f373ba2c1cc5986887c9dd53bb67e7` |

## 2026-11-09: the first release of the rebuilt platform

2026-11-09, on the local machine (Linux x86-64, WSL2; Node.js 24.21.0, npm
11.19.0; `gh` as `jules-tenbos`), following `prompt-local.md`, with the
human's word to publish.

- **Commit:** `61dd0a4` (`main`).
- **Release:** `setup-a6d039296165` of `haiccing/base-package-boot`, latest,
  published 2026-11-09T10:02:12Z:
  https://github.com/haiccing/base-package-boot/releases/tag/setup-a6d039296165
  Assets: `haicc-setup.sh` (28,807,819 bytes, sha256 `02032870…abd9b7c`),
  `manifest.json` (4,861 bytes).
- **The publisher's key:** made here, `~/haicc-publisher/` (the secret on
  this machine only). Public key
  `21d1d69a7c9930073e30b962a97b4fedc99c2f485b2189163fc28aa47ef7f5bd`.

### What was run, and the results

| Step | Command | Result |
|---|---|---|
| Clone, install | `git clone` (branch `main`), `PUPPETEER_SKIP_DOWNLOAD=1 npm install` | done, 78 s; 0 vulnerabilities |
| The key | `tools/bare tools/setup/keygen.js ~/haicc-publisher` | made; the secret 0600 |
| Build and check, not published | `sh tools/publish.sh ~/haicc-release --key-dir="$HOME/haicc-publisher"` | passed, 45 s; `read /`, `read /packages`, `read /packages/manifest.json` answered as expected |
| Publish, first try | the same with `--push` | build and check passed; the publishing failed on a network timeout (`TLS handshake timeout`); nothing published |
| Publish, second try | the same with `--push` | passed, published, 71 s |
| From GitHub | `curl -fL -o haicc-setup.sh https://github.com/haiccing/base-package-boot/releases/latest/download/haicc-setup.sh` | identical to the local build (sha256) |
| The setup, from GitHub | `sh haicc-setup.sh ~/haicc-work`, `env -i`, `PATH=/usr/local/sbin:/usr/sbin:/sbin:/bin:/usr/bin` | passed, 3.8 s (setup and boot together) |
| The setup, without Node.js | the same download, a PATH of links to the system's tools leaving out `node`, `nodejs`, `npm`, `npx`, `corepack` | passed, 4.8 s; `haicc status` as below |

`haicc status` from the published release (`~/haicc-work`):

```json
{
  "level": {
    "repository": "level",
    "id": "1b06446b-2f47-451c-8386-59f8c1745a23",
    "key": "32746da4e175c97af480aa68d0c6fd6819b61d54e70c8d1104ef5ff30e5161dd",
    "work": "/home/herma/haicc-work"
  },
  "layers": [
    "/execute/main",
    "/main",
    "/packages",
    "/request/done",
    "/request/executing",
    "/request/pending/default"
  ],
  "manifest": {
    "sequence": 1794218496,
    "signed": true,
    "runtime": {
      "bare": "v1.36.0"
    }
  },
  "packages": [
    {
      "package": "haiccing/base-package-boot",
      "id": "1a45fc119571dc48",
      "bytes": 3457773,
      "deployed": false
    },
    {
      "package": "haiccing/base-package-haicc",
      "id": "32f43a5b8bec86f0",
      "bytes": 3406806,
      "deployed": true
    }
  ]
}
```

### Not checked

The setup on another machine, or on another platform than Linux x86-64
under WSL2; the tests from the bundle (not built yet, `readme.md`); that a
tampered manifest or bundle is refused, end to end.

### Found, for the implementer (not fixed here)

1. **"Node.js off the PATH" does not hold where Node.js is in `/usr/bin`**,
   as here: `tools/publish.sh`'s check and the handover's use a PATH with
   `/usr/bin`, so `node` was still reachable. The setup does pass without
   it (the last row above, by hand), but the script's check does not prove
   that on such a machine.
2. **The tag is the boot bundle's hash only.** Reading `tools/publish.sh`: a
   release changing only `base-package-haicc` (or the setup's other content)
   gets the tag of the one before, and the script then says "there already"
   and publishes nothing. Here the same tag came from different builds:
   the cloud session's and this one, and the setups of two builds of this
   commit differ (28,807,286 and 28,807,819 bytes; the manifest's sequence
   differs too).
3. **A failed check for an existing release reads as "not there".** The
   script's `gh release view` failing for any reason goes on to `gh release
   create`. Harmless here (the create failed as well), but only the create's
   own refusal stands between a network error and a second release.
4. `prompt-local.md` says to push this record to `main`; `rules.md` says
   `main` changes only by merges from `execute/*`. It went to `execute/main`
   and was merged.
