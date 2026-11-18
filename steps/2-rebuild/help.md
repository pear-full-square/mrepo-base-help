# Help, how-tos and haici

Offloaded (2026-11-18) into the packages, where it is kept from now on
(the human: "From now on we have to work as much as possible from the
packages"):

- **What was built**: the static side as the `info` protocol (a package's
  pages read by keywords, `base-package-info`); the how-tos as pages in
  the packages, read with `info` (`base-docs-package`, `howto/`).
- **The direction**: `base-docs-vision`, "Help and haici" (the three kinds
  of help, dynamic help, `haici`, headless Claude, feedback on a command);
  runnable how-tos, `base-docs-hdlc`, "Working demos".
- **The flags' rule** ("wrong flag or issues with underlying
  functionality don't throw errors but warnings"): `base-docs-package`,
  `mrepo/request/`, "Flags".

How it was discussed, point by point, the human's words and ours: this
file's history (`git log -p steps/2-rebuild/help.md`).
