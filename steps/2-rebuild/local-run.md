# The local runs: the releases

## 2026-11-18: the release `r-6b4d346`

On "The next run" of `local-note.md` (2026-11-17), step 7, after its
steps 4 and 5 passed. Unsigned; Bare not published.

- **Commit built:** `6b4d346` (`main`): `e61e222`, the one the prompt
  named, with the nineteen test reports run again here (`cd2e516`; on
  `e61e222` every report was stale, the human: "you can run package-test
  yourself in this case") and the cloud session's `1133b32` merged in
  (the installer refuses a `--bin` that is its own `bin/`; the container
  test). Clean, `release.js --strict` every report current; nineteen
  packages in the manifest, every entry's commit `6b4d346`.
- **Tested:** the haicc test 303/303 three times on `e61e222` (the same
  bundles' content) and once on `6b4d346`; the install in a container
  (`container.sh`) 18/18 three times on `6b4d346`; every package's
  `/test/full` from its bundle ok.
- **The repositories first:** `tools/packages.sh` for all twenty (every
  package's reports changed). Tag targets, each repository's `main`:
  `base-app-haicc` e23f11d, `base-component-boot` 8f35fb9, `base-component-docs` a4f8a01, `base-component-haicc` 30f5b87, `base-docs-haicc` df0e745, `base-docs-hdlc` 8079d06, `base-docs-package` 6b86de5, `base-docs-uri` 95042ee, `base-docs-vision` 2151e4c, `base-docs-xpath` c88a1a8, `base-linux-haicc` 859aa09, `base-package-boot` 68f6740, `base-package-container` 3091a7a, `base-package-crud` fefcd4e, `base-package-haicc` d8e8405, `base-package-info` 1b1abef, `base-package-protocol` 049c1dc, `base-package-runtime` 0096bfc, `base-package-service` 2ecb5b4, `base-package-splectral` 0ab9619.
- **Assets:** as for `r-46a3b3f`: per package its bundle, its manifest
  entry, its addons; `base-linux-haicc` the installer and the sources'
  `haiccing/manifest.json`. 59 assets, 196,210,747 bytes; sizes and digests
  on GitHub checked, no mismatch. `base-linux-haicc`'s latest:
  `r-6b4d346`.
- **New packages, first released:** `base-component-docs`,
  `base-docs-haicc`, `-hdlc`, `-package`, `-uri`, `-vision`, `-xpath`.
  **Left without a current release** (their latest `r-46a3b3f`, the
  packages gone): `base-package-help`, `base-package-howto`,
  `package-docs-mrepo`. `package-docs-package` is `base-docs-package`
  (renamed). Also in the organisation, no release and no package here:
  `base-package-haici`, and the earlier platform's six. For the human.

| repository | file | bytes | sha256 |
|---|---|---|---|
| `base-app-haicc` | `base-app-haicc.bundle` | 4,362,711 | `1e90718382f4754f7dbbc26a4a9bb7bccf8214daf20b648df25a111fbf7bcc61` |
| `base-app-haicc` | `base-app-haicc.manifest.json` | 2,681 | `4b2f80427256b4c44299b574d679c86895a402e3e65b5e03dccb88be7bf1b4fe` |
| `base-app-haicc` | `base-app-haicc-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-component-boot` | `base-component-boot.bundle` | 4,385,515 | `e77bbc0b557eebea1401337fddf01fee9150ce926c1e1403d6f0e50ac92dd422` |
| `base-component-boot` | `base-component-boot.manifest.json` | 2,691 | `2cde6a8a4ca50faa9cc77ceb473a052b5921c27ddca9d7ef7ee0e37939448800` |
| `base-component-boot` | `base-component-boot-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-component-docs` | `base-component-docs.bundle` | 1,085,440 | `cabe10d954cb9246f4bb878f52c22d871df82a1f23706747bea857161394597f` |
| `base-component-docs` | `base-component-docs.manifest.json` | 2,156 | `6e94390c7ce25de466cf059a13254d71c434cdd80a038a077b09e8f01023a63a` |
| `base-component-docs` | `base-component-docs-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-component-haicc` | `base-component-haicc.bundle` | 1,095,653 | `1d3ed9975634d08418d6f20da4692aee3dc279aab3e44b14de14051061860316` |
| `base-component-haicc` | `base-component-haicc.manifest.json` | 2,158 | `227fe23a4328f1e96dfe5f6530e9931c2705acdbf952e13fb5cc685723620c53` |
| `base-component-haicc` | `base-component-haicc-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-docs-haicc` | `base-docs-haicc.bundle` | 1,076,642 | `e68d9259b6f2f01c9ef29523f55208bd9e9cde7b1cf3a17118049edc4b3d9c31` |
| `base-docs-haicc` | `base-docs-haicc.manifest.json` | 2,147 | `28e7ab51a21c4f6040317d5b53354acc9dc252cd792c9463d877d914fcf67dee` |
| `base-docs-haicc` | `base-docs-haicc-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-docs-hdlc` | `base-docs-hdlc.bundle` | 1,081,386 | `6509be5a3e6e465a858f786ddf51a3053f1b9203639cbc474dc74dc3dba95405` |
| `base-docs-hdlc` | `base-docs-hdlc.manifest.json` | 2,145 | `7c31276bd30593acdc1b832a9a3c6537b4dedfe1f8a874836cce3a7b9275beb3` |
| `base-docs-hdlc` | `base-docs-hdlc-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-docs-package` | `base-docs-package.bundle` | 1,144,128 | `a39dd0b8fbcd6d900c4fbff4c78690e5fe17d96f9fc88b3c4fa0910aecf5eb99` |
| `base-docs-package` | `base-docs-package.manifest.json` | 2,151 | `7d523aa1ff1d8fbda0098e1e002d8325e62add9cd148d159c6ad37c3acedf8b1` |
| `base-docs-package` | `base-docs-package-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-docs-uri` | `base-docs-uri.bundle` | 1,076,286 | `22488cc8175a9e04921da8a3173cb9f798a5eaa2161e447e2b77e9f1a3d320de` |
| `base-docs-uri` | `base-docs-uri.manifest.json` | 2,143 | `becb7740012e0f3758aa9df0aaf1f10333222541783d99280e5a349bd30dbb76` |
| `base-docs-uri` | `base-docs-uri-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-docs-vision` | `base-docs-vision.bundle` | 1,092,091 | `2d582e37c6670bc234c8cb788445095417d284083cca94afd6f8783e7697e01c` |
| `base-docs-vision` | `base-docs-vision.manifest.json` | 2,149 | `61a1594dacbe1c54deb995a57e7f23e84d81c9d194682f36abb69b0518d79c51` |
| `base-docs-vision` | `base-docs-vision-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-docs-xpath` | `base-docs-xpath.bundle` | 1,077,215 | `73d56d4ae269b43fbee1fad481ea547ad01b2409b7f24d0b64abbd41c00a1043` |
| `base-docs-xpath` | `base-docs-xpath.manifest.json` | 2,147 | `eed8aab7b339b056f12abda64d6ee7aacab527866df80b9b645363ffa7a2de3e` |
| `base-docs-xpath` | `base-docs-xpath-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-package-boot` | `base-package-boot.bundle` | 4,351,586 | `9e7715afd56ba22430e0bf5be557d211cafd9cb7f329ff824881e68d5911594e` |
| `base-package-boot` | `base-package-boot.manifest.json` | 2,692 | `d768c9afc0d52cdfa43c03e8be5d848645f99069adf4e208271022d492b007b0` |
| `base-package-boot` | `base-package-boot-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-package-container` | `base-package-container.bundle` | 4,390,738 | `7ec4e0ea1a616f62cfb9d9a1921e253b1973570be9134b1fa2bdedbce60eb1be` |
| `base-package-container` | `base-package-container.manifest.json` | 2,702 | `9ab827c0fc9265b1d09e1703d16f62d1e66794193c4cf83de3e64dcc4ad42fe6` |
| `base-package-container` | `base-package-container-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-package-crud` | `base-package-crud.bundle` | 1,204,235 | `6ec73620e3754c0aff3dbe04ace79e70f2ba2ed15ebb12b82e0cffa1a977d939` |
| `base-package-crud` | `base-package-crud.manifest.json` | 2,174 | `438c6a8a0c85459dae2e80a42b9c48230264e211feed7500ce322c5518fcadee` |
| `base-package-crud` | `base-package-crud-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-package-haicc` | `base-package-haicc.bundle` | 4,040,030 | `cadb3d0f41288a74489dafaef850a6dab1bc8fc6fde52630e37fa346480665cc` |
| `base-package-haicc` | `base-package-haicc.manifest.json` | 2,694 | `5cf0a99e674f79e5845a123d1d78f0dd2c1fdec485febfe449837a287a8830f4` |
| `base-package-haicc` | `base-package-haicc-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-package-info` | `base-package-info.bundle` | 1,086,502 | `284fb1c5ec443f4482d793b1125632920e1ff6dca52acd0114a869e696d767c9` |
| `base-package-info` | `base-package-info.manifest.json` | 2,174 | `f60bb4977b6182f4c983387b4e725fca30e335f199601ec829d541ee5cc5e231` |
| `base-package-info` | `base-package-info-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-package-protocol` | `base-package-protocol.bundle` | 1,093,335 | `d484f8f47eb6386cbe4b27625c5250d0dab97efe6fe3fe78b8d05d0a821ce904` |
| `base-package-protocol` | `base-package-protocol.manifest.json` | 2,182 | `c4b9305edfc11da46eeb840c929ac8e63e3aae18476253e03df6d93cadd2dec9` |
| `base-package-protocol` | `base-package-protocol-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-package-runtime` | `base-package-runtime.bundle` | 4,262,114 | `3a6b18cb52449a3ec937fcba958567c048d670ce37d58b29f1c2db0fe5f5f2c3` |
| `base-package-runtime` | `base-package-runtime.manifest.json` | 2,711 | `e527da6cc5b4eefe7c8bad8fb8b3af3cf50671d44928028d82995d618a95de9e` |
| `base-package-runtime` | `base-package-runtime-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-package-service` | `base-package-service.bundle` | 4,001,057 | `ace800c875950172b1a373b990f4b3932e952a93272275be18685af8afa6691a` |
| `base-package-service` | `base-package-service.manifest.json` | 2,698 | `910ed665f3d5e8676ba5ca464de7e5814ea1490d85ddf411b95fe562f30937de` |
| `base-package-service` | `base-package-service-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-package-splectral` | `base-package-splectral.bundle` | 4,200,899 | `81a40f9201602e172c27ab845a0690018747086311ada555b150eab5d5494aa1` |
| `base-package-splectral` | `base-package-splectral.manifest.json` | 2,715 | `99584b93086cebcf69d58ddb682288b43de548b0e38a3b6be4d54f2f5785961b` |
| `base-package-splectral` | `base-package-splectral-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-linux-haicc` | `haicc-install.sh` | 17,070 | `a72b51702cb0c5f011bcc18dce500d8ddab76c00e1410f186bfcea1ab51ab888` |
| `base-linux-haicc` | `manifest.json` | 45,284 | `17138e1d34498ec539742ee1cb3be556ece40cea297ef145fd5cafac3bc70389` |

## 2026-11-17: the release `r-61314e0` of `base-linux-haicc`: the installer fixed

Found installing `r-46a3b3f` from GitHub (below): a connection reset in
the middle of `base-app-haicc-addons.tar` (curl 56) failed the download,
and Bare, fetched just before, was left unregistered. Fixed (`0ff6cb9`,
`46a3b3f` and the fix; pushed as `61314e0` on `execute/main`, the scripts
the same; not merged into `main` while the documentation is being
restructured), 288/288 three times. `base-linux-haicc`'s repository
written from `0ff6cb9` (`bceb06c`), the tag pointing at it.

- **Assets:** `haicc-install.sh` (16,825 bytes, sha256
  `dc4cae38f1b7ac17526982acd00cfd5fe3286363d54d6c80c62299a9950fe8ce`),
  `manifest.json` (38,415 bytes, sha256
  `b347301c794f402a01fb672244ea328ff36721c5b97649823213a775baa54af9`):
  `r-46a3b3f`'s manifest unchanged, the packages staying at that release.
  Digests on GitHub checked.
- **Tested from GitHub**, a clean folder, the four lines as written: the
  download 99 s, 16 fetched, no retry; `prereq`, `boot/deploy`,
  Splectral (page 200), the cluster, `host howto`, `boot/teardown` exit
  0; nothing left.

## 2026-11-17: the release `r-46a3b3f`: the install from the releases

On the human's word ("yes please, and then test release from github"),
after `haicc sources download haiccing` was built and tested
(`b7ce3ea`, `local-note.md`). Unsigned; Bare not published.

- **Commit built:** `46a3b3f` (`main`), clean, `release.js --strict`
  every report current (code the same as tested: only `review.md`
  changed after). Seventeen repositories, sixteen packages in the
  manifest, every entry's commit `46a3b3f`.
- **The repositories first:** `tools/packages.sh` for every package;
  only `base-linux-haicc` changed (`f67ba6c`). Tag targets, each
  repository's `main`: `base-app-haicc` 200dccd, `base-component-boot` 81e3d20, `base-component-haicc` 5eb236f, `base-linux-haicc` f67ba6c, `base-package-boot` b0a514d, `base-package-container` b231c8d, `base-package-crud` b46ac6d, `base-package-haicc` 3cd99e3, `base-package-help` 91bac67, `base-package-howto` ff7300c, `base-package-info` bf72aac, `base-package-protocol` 651eb8a, `base-package-runtime` 0747f5c, `base-package-service` 1898373, `base-package-splectral` 68622e4, `package-docs-mrepo` 19088bd, `package-docs-package` bdbd40a.
- **Assets:** as for `r-61acff6`; `base-linux-haicc` now with
  `manifest.json` besides the installer: the sources'
  `haiccing/manifest.json` as it is, read by `haicc sources download
  haiccing` from `releases/latest/download/`. 50 assets, 170,137,402 bytes;
  sizes and digests on GitHub checked, no mismatch.
- **Tested from GitHub:** the download failed on a connection reset (the
  fix above, `r-61314e0`).

| repository | file | bytes | sha256 |
|---|---|---|---|
| `base-app-haicc` | `base-app-haicc.bundle` | 4,309,397 | `d50ae0ef3dad3f77a32204bab30243475331a217d28da26ceba8108e677c2df1` |
| `base-app-haicc` | `base-app-haicc.manifest.json` | 2,681 | `8d3253395d4152576194e13a539f7d373c734ac1fd6f062a3c4ada5bd4ba5ff9` |
| `base-app-haicc` | `base-app-haicc-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-component-boot` | `base-component-boot.bundle` | 4,332,923 | `cd81198a72962d0d43ce1c3bb1575902df287a059886c5131ba894850393399f` |
| `base-component-boot` | `base-component-boot.manifest.json` | 2,691 | `4e9ecfd86839df7ef69c64dd73bb2cee3ab094f1cdd2f803c64aaaf8a810807e` |
| `base-component-boot` | `base-component-boot-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-component-haicc` | `base-component-haicc.bundle` | 1,059,597 | `bd7f7ad88cecd7bb7f4b91d9888022c05ae6c76028faf2050b75431cc31a5926` |
| `base-component-haicc` | `base-component-haicc.manifest.json` | 2,158 | `3b1f95a29d9f89d4087e34a2f0a4fb63e8212827c7424f2566663c5807002dfe` |
| `base-component-haicc` | `base-component-haicc-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-package-boot` | `base-package-boot.bundle` | 4,297,780 | `40d96d933aa4b0e582fec5a00f6395b697f754dd0560d34cc4318fe5a3a51eb4` |
| `base-package-boot` | `base-package-boot.manifest.json` | 2,692 | `d432c5023035b2821158d2c8f33112637771e04ba673a5ed36723d291dbe080c` |
| `base-package-boot` | `base-package-boot-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-package-container` | `base-package-container.bundle` | 4,339,738 | `9cb05568d77205b69f98ebfb73dce28ea568ee703d1420ded636d602d43bc244` |
| `base-package-container` | `base-package-container.manifest.json` | 2,702 | `7778a2a510ee50c9836a38b5e8ced6a3435ebd6b5f903e0c5912ac356b1a5af9` |
| `base-package-container` | `base-package-container-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-package-crud` | `base-package-crud.bundle` | 1,168,756 | `27c896f8e5d8c7660ffc0da35941182caa1e7c94d8ce79831e89816f5f32ff80` |
| `base-package-crud` | `base-package-crud.manifest.json` | 2,174 | `448520bb80d6cbcfc190070d3a6a0690ba2df1aad8fc89e6dba547844ab61365` |
| `base-package-crud` | `base-package-crud-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-package-haicc` | `base-package-haicc.bundle` | 1,145,057 | `0089383b53b7fbb1005e855a915d6f45807205e3ed4fe834717ab44a2d0d463c` |
| `base-package-haicc` | `base-package-haicc.manifest.json` | 2,176 | `61065d1f20215fbc24d6b63c103e06c1849b75907fc9c716c29b04f602dbdda2` |
| `base-package-haicc` | `base-package-haicc-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-package-help` | `base-package-help.bundle` | 1,053,976 | `6ec88a45ffc4904faabca38df1dbfcf59146294e872e3a14bb8a372d16dd6dd1` |
| `base-package-help` | `base-package-help.manifest.json` | 2,174 | `1462226242825d34757d590b44d275f368335778feaee6febe02aa712f01bda7` |
| `base-package-help` | `base-package-help-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-package-howto` | `base-package-howto.bundle` | 1,085,506 | `a454fb293ee43410cef11e2dc640129b86d333e0f59d22fa392ec283d3ead2b5` |
| `base-package-howto` | `base-package-howto.manifest.json` | 2,176 | `e05db250f452452f0d30fed75ef0313df367a9f40b6eb29a2d5cad1c8fa30dbc` |
| `base-package-howto` | `base-package-howto-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-package-info` | `base-package-info.bundle` | 1,092,691 | `be19f541a8c523c97ad7c9d4a84d6eb0557c40c16170601cc955d78129185007` |
| `base-package-info` | `base-package-info.manifest.json` | 2,174 | `14798f3baf2eca9ac8323973b6cd3e2bcc48cfb41e32424ba26878f84bfac484` |
| `base-package-info` | `base-package-info-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-package-protocol` | `base-package-protocol.bundle` | 1,057,450 | `9959faed56a8d4713913882a8e3b5662b0b3c36d5b0e7dcf7383041de28844be` |
| `base-package-protocol` | `base-package-protocol.manifest.json` | 2,182 | `9bcca40bc81a2c28f5f268abe9f9b0dbd8bc8c8addd6b93fa1fd1fca0817a222` |
| `base-package-protocol` | `base-package-protocol-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-package-runtime` | `base-package-runtime.bundle` | 4,214,374 | `3d4c1b17834fc8da417d77222752d6ccb5750d56c0aa51000b794cd64825c789` |
| `base-package-runtime` | `base-package-runtime.manifest.json` | 2,711 | `5eef59ad2305f8ec3e8dfc6aa8d841717365278a36225d5e32160772c825878e` |
| `base-package-runtime` | `base-package-runtime-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-package-service` | `base-package-service.bundle` | 3,959,085 | `d2b7035c460858ea9a87acb1cff745bb499a163dac7a02e5c806fd044c5461f1` |
| `base-package-service` | `base-package-service.manifest.json` | 2,698 | `ab4604b9a1525ede08ce8496dca3c3a0040c2520eec5a64a6d969d251ebbf4d6` |
| `base-package-service` | `base-package-service-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `base-package-splectral` | `base-package-splectral.bundle` | 4,162,279 | `32b61a7cd8ffc53e6c8a8e834cec153a365e97465c990f2060a6160c3dae45a6` |
| `base-package-splectral` | `base-package-splectral.manifest.json` | 2,715 | `4acec457cf23c213f140b79743e631f9647aaf136968b1102e6c56e84543054a` |
| `base-package-splectral` | `base-package-splectral-addons.tar` | 17,397,760 | `b533304ce62ee6b4d09595822d7dbd0c703046697ce18fa54ecaac338668fa68` |
| `package-docs-mrepo` | `package-docs-mrepo.bundle` | 1,074,292 | `3ef146e1bb4f6884bab0a205461268c175a6262171c3404923ecfd80aa88b855` |
| `package-docs-mrepo` | `package-docs-mrepo.manifest.json` | 2,153 | `6833561c40f111da5358d8ea37928a90d7d3a229d99bce759473dc326571bd26` |
| `package-docs-mrepo` | `package-docs-mrepo-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `package-docs-package` | `package-docs-package.bundle` | 1,059,621 | `7214fe769a5d846d707fe7fe62ff9a7d192fb36e6af9630088c40684b6a55887` |
| `package-docs-package` | `package-docs-package.manifest.json` | 2,157 | `31cca6a2a0733f4ad7e5c5bf0e8c75572872f822ceb751b6152c346110a9b13a` |
| `package-docs-package` | `package-docs-package-addons.tar` | 983,040 | `0c996768f6e3a445a91e39a46ce8e8a94f9468f5c419500a3c40bc43b7851f70` |
| `base-linux-haicc` | `haicc-install.sh` | 16,371 | `f619ff2a090a60c488544d6a764606013f1a7360b7f742a7ce452ec88bb153f4` |
| `base-linux-haicc` | `manifest.json` | 38,415 | `b347301c794f402a01fb672244ea328ff36721c5b97649823213a775baa54af9` |

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
