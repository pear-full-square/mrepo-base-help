// A Splectral component's renderer, this process: the component's packages
// loaded from its Splectral side, each page the server asks for made, until
// it is ended (SIGTERM, SIGINT), its mrepo's folder is gone or its mrepo's
// runtime has ended. Started by the component's start hook:
//   runtime/start . splectral/packages/splectral/base-package-renderer
//   (bare <bundle> --dir=<the mrepo's folder> --runtime=<pid> --state=<file>)
import process from './modules/node_modules/bare-process/index.js'
import { program } from './modules/pear-full-square/splectral-base-renderer/index.js'

await program(process.argv.slice(2))
process.exit(0) // ended: here (its signal handlers would hold the process open)
