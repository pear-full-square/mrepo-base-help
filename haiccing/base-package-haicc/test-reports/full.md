# Test report: haiccing/base-package-haicc

The package did not pass its `full` set: 13 of 15 units passed, 252 of 254 tests and 1570 of 1572 asserts.

| | |
|---|---|
| Package | `haiccing/base-package-haicc` |
| Set | `full` |
| Result | failed |
| Units | 13 of 15 passed |
| Tests | 252 of 254 passed |
| Asserts | 1570 of 1572 passed |
| Run | 2026-11-17 11:48 UTC |
| Bare | v1.36.0 |
| Content | `ec19a9111181d913c8a43bc43a084f5cf86e0ffad088324988fe87ea8cac7630` |

## Units

| Unit | Result | Tests | Asserts |
|---|---|---|---|
| `/test/mounted` | passed | 8 of 8 | 42 of 42 |
| `/test/info` | passed | 1 of 1 | 2 of 2 |
| `/test/code` | failed | 0 of 1 | 1 of 2 |
| `/test/mrepo` | failed | 0 of 1 | 0 of 1 |
| `/test/package` | passed | 1 of 1 | 1 of 1 |
| `/test/modules/pear-full-square/mrepo-base-haicc` | passed | 6 of 6 | 50 of 50 |
| `/test/modules/pear-full-square/mrepo-base-info` | passed | 8 of 8 | 57 of 57 |
| `/test/modules/pear-full-square/mrepo-base-request` | passed | 16 of 16 | 187 of 187 |
| `/test/modules/pear-full-square/mrepo-base-xpath` | passed | 5 of 5 | 52 of 52 |
| `/test/modules/pear-full-square/mycelium-container-document` | passed | 1 of 1 | 8 of 8 |
| `/test/modules/pear-full-square/mycelium-git` | passed | 144 of 144 | 777 of 777 |
| `/test/modules/pear-full-square/mycelium-uri` | passed | 21 of 21 | 195 of 195 |
| `/test/modules/pear-full-square/mycelium-value-json` | passed | 1 of 1 | 3 of 3 |
| `/test/modules/pear-full-square/mycelium-xpath` | passed | 21 of 21 | 141 of 141 |
| `/test/modules/pear-full-square/pkgm-base-check` | passed | 19 of 19 | 54 of 54 |

## Failures

- `/test/code`: its code: the modules it carries and its own, none against the rules
- `/test/mrepo`: its mrepo side: its structure, its protocols, what it carries, none against the rules

Written by the package's pre-release from `full.json`, beside it. The content is the hash of the bundle that was tested, its test reports left out.
