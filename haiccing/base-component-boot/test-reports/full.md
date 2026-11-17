# Test report: haiccing/base-component-boot

The package did not pass its `full` set: 22 of 23 units passed, 316 of 317 tests and 2222 of 2223 asserts.

| | |
|---|---|
| Package | `haiccing/base-component-boot` |
| Set | `full` |
| Result | failed |
| Units | 22 of 23 passed |
| Tests | 316 of 317 passed |
| Asserts | 2222 of 2223 passed |
| Run | 2026-11-17 12:24 UTC |
| Bare | v1.36.0 |
| Content | `27241c0a8351843b93fa353217b921646a3695d808699a5e600b0a3082aaf0f0` |

## Units

| Unit | Result | Tests | Asserts |
|---|---|---|---|
| `/test/boot` | failed | 1 of 2 | 120 of 121 |
| `/test/info` | passed | 1 of 1 | 2 of 2 |
| `/test/code` | passed | 1 of 1 | 2 of 2 |
| `/test/mrepo` | passed | 1 of 1 | 1 of 1 |
| `/test/package` | passed | 1 of 1 | 1 of 1 |
| `/test/modules/pear-full-square/mrepo-base-boot` | passed | 6 of 6 | 100 of 100 |
| `/test/modules/pear-full-square/mrepo-base-crud` | passed | 8 of 8 | 76 of 76 |
| `/test/modules/pear-full-square/mrepo-base-execute` | passed | 10 of 10 | 98 of 98 |
| `/test/modules/pear-full-square/mrepo-base-info` | passed | 8 of 8 | 57 of 57 |
| `/test/modules/pear-full-square/mrepo-base-protocol` | passed | 3 of 3 | 10 of 10 |
| `/test/modules/pear-full-square/mrepo-base-request` | passed | 16 of 16 | 187 of 187 |
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
| `/test/modules/pear-full-square/pkgm-base-check` | passed | 19 of 19 | 54 of 54 |

## Failures

- `/test/boot`: the boot: put in place, its runtime started, nothing deployed; the host deployed, redeployed, torn down, deployed again by commands; haicc; run again

Written by the package's pre-release from `full.json`, beside it. The content is the hash of the bundle that was tested, its test reports left out.
