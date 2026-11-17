# Test report: haiccing/base-component-boot

The package did not pass its `full` set: 22 of 23 units passed, 312 of 313 tests and 2190 of 2192 asserts.

| | |
|---|---|
| Package | `haiccing/base-component-boot` |
| Set | `full` |
| Result | failed |
| Units | 22 of 23 passed |
| Tests | 312 of 313 passed |
| Asserts | 2190 of 2192 passed |
| Run | 2026-11-17 04:04 UTC |
| Bare | v1.36.0 |
| Content | `2955bbfaf7b06e08a81a2ac37612bcf499a617401199265a534db9d7b7ef598a` |

## Units

| Unit | Result | Tests | Asserts |
|---|---|---|---|
| `/test/boot` | failed | 1 of 2 | 119 of 121 |
| `/test/info` | passed | 1 of 1 | 2 of 2 |
| `/test/code` | passed | 1 of 1 | 2 of 2 |
| `/test/mrepo` | passed | 1 of 1 | 1 of 1 |
| `/test/package` | passed | 1 of 1 | 1 of 1 |
| `/test/modules/pear-full-square/mrepo-base-boot` | passed | 5 of 5 | 91 of 91 |
| `/test/modules/pear-full-square/mrepo-base-crud` | passed | 8 of 8 | 76 of 76 |
| `/test/modules/pear-full-square/mrepo-base-execute` | passed | 10 of 10 | 93 of 93 |
| `/test/modules/pear-full-square/mrepo-base-info` | passed | 7 of 7 | 52 of 52 |
| `/test/modules/pear-full-square/mrepo-base-protocol` | passed | 3 of 3 | 10 of 10 |
| `/test/modules/pear-full-square/mrepo-base-request` | passed | 16 of 16 | 187 of 187 |
| `/test/modules/pear-full-square/mrepo-base-runtime` | passed | 6 of 6 | 122 of 122 |
| `/test/modules/pear-full-square/mrepo-base-service` | passed | 2 of 2 | 11 of 11 |
| `/test/modules/pear-full-square/mrepo-base-xpath` | passed | 5 of 5 | 52 of 52 |
| `/test/modules/pear-full-square/mycelium-container-document` | passed | 1 of 1 | 8 of 8 |
| `/test/modules/pear-full-square/mycelium-git` | passed | 144 of 144 | 777 of 777 |
| `/test/modules/pear-full-square/mycelium-uri` | passed | 21 of 21 | 195 of 195 |
| `/test/modules/pear-full-square/mycelium-value-json` | passed | 1 of 1 | 3 of 3 |
| `/test/modules/pear-full-square/mycelium-xpath` | passed | 21 of 21 | 141 of 141 |
| `/test/modules/pear-full-square/p2p-mrepo` | passed | 34 of 34 | 171 of 171 |
| `/test/modules/pear-full-square/p2p-replicate` | passed | 1 of 1 | 10 of 10 |
| `/test/modules/pear-full-square/p2p-store` | passed | 5 of 5 | 20 of 20 |
| `/test/modules/pear-full-square/pkgm-base-check` | passed | 17 of 17 | 46 of 46 |

## Failures

- `/test/boot`: the boot: put in place, its runtime started, nothing deployed; the host deployed, redeployed, torn down, deployed again by commands; haicc; run again

Written by the package's pre-release from `full.json`, beside it. The content is the hash of the bundle that was tested, its test reports left out.
