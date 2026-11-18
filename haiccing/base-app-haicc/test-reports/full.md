# Test report: haiccing/base-app-haicc

The package did not pass its `full` set: 21 of 23 units passed, 338 of 340 tests and 2261 of 2264 asserts.

| | |
|---|---|
| Package | `haiccing/base-app-haicc` |
| Set | `full` |
| Result | failed |
| Units | 21 of 23 passed |
| Tests | 338 of 340 passed |
| Asserts | 2261 of 2264 passed |
| Run | 2026-11-18 01:29 UTC |
| Bare | v1.36.0 |
| Content | `1e4c283c9d9e66949dc06e59ebe77b2ba462fb49390c009c7b16db084dbc40cd` |

## Units

| Unit | Result | Tests | Asserts |
|---|---|---|---|
| `/test/command` | passed | 8 of 8 | 71 of 71 |
| `/test/info` | passed | 1 of 1 | 2 of 2 |
| `/test/code` | passed | 1 of 1 | 2 of 2 |
| `/test/mrepo` | passed | 1 of 1 | 1 of 1 |
| `/test/package` | passed | 1 of 1 | 1 of 1 |
| `/test/modules/pear-full-square/haicc-base-app` | passed | 18 of 18 | 182 of 182 |
| `/test/modules/pear-full-square/mrepo-base-crud` | passed | 8 of 8 | 76 of 76 |
| `/test/modules/pear-full-square/mrepo-base-execute` | failed | 9 of 10 | 97 of 98 |
| `/test/modules/pear-full-square/mrepo-base-info` | passed | 8 of 8 | 57 of 57 |
| `/test/modules/pear-full-square/mrepo-base-protocol` | passed | 3 of 3 | 10 of 10 |
| `/test/modules/pear-full-square/mrepo-base-request` | failed | 16 of 17 | 186 of 188 |
| `/test/modules/pear-full-square/mrepo-base-runtime` | passed | 6 of 6 | 124 of 124 |
| `/test/modules/pear-full-square/mrepo-base-service` | passed | 2 of 2 | 13 of 13 |
| `/test/modules/pear-full-square/mrepo-base-xpath` | passed | 5 of 5 | 52 of 52 |
| `/test/modules/pear-full-square/mycelium-container-document` | passed | 1 of 1 | 8 of 8 |
| `/test/modules/pear-full-square/mycelium-git` | passed | 144 of 144 | 777 of 777 |
| `/test/modules/pear-full-square/mycelium-uri` | passed | 21 of 21 | 195 of 195 |
| `/test/modules/pear-full-square/mycelium-value-json` | passed | 1 of 1 | 3 of 3 |
| `/test/modules/pear-full-square/mycelium-xpath` | passed | 21 of 21 | 141 of 141 |
| `/test/modules/pear-full-square/p2p-mrepo` | passed | 34 of 34 | 171 of 171 |
| `/test/modules/pear-full-square/p2p-replicate` | passed | 1 of 1 | 10 of 10 |
| `/test/modules/pear-full-square/p2p-store` | passed | 5 of 5 | 20 of 20 |
| `/test/modules/pear-full-square/pkgm-base-check` | passed | 23 of 23 | 62 of 62 |

## Failures

- `/test/modules/pear-full-square/mrepo-base-execute`: the request's log: info unasked (its audit, its metrics), the action's entries under its name, as much as its flag asks
- `/test/modules/pear-full-square/mrepo-base-request`: flags: written after a command's URI, that step's; -- says where what follows starts

Written by the package's pre-release from `full.json`, beside it. The content is the hash of the bundle that was tested, its test reports left out.
