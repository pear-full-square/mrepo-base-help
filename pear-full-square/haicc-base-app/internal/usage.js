// The app's usage: the commands it answers (haicc --help).
export const USAGE = `haicc <URI> <protocol>/<action> <argument>...   a command for the mrepos:
                                                go to this node position and
                                                execute the command that
                                                follows; its response record
                                                printed, unpacked across lines
                                                to the width (haicc output)
haicc --raw <URI> <protocol>/<action> ...       the record as it is stored,
                                                one line
haicc --output <URI> <protocol>/<action> ...    the completed form's output
                                                alone
haicc <URI> --flags <flag>... [--] <command>    flags after a URI: that
                                                step's, space separated; --
                                                says where the next command
                                                starts (optional); they hold
                                                down the chain until changed:
                                                log=info|verbose|debug, how
                                                much the request's log holds
                                                (info without it)
haicc <URI> <command> <URI> --flags <flag>...   after the last command's URI:
                                                that command's
haicc output                                    the width a record is printed
                                                to: auto, the terminal's (80
                                                when the output is none)
haicc output <width> | auto                     set, kept; back to auto
haicc boot/deploy                               the machine level: the boot
                                                mrepo put in place at the
                                                root, its runtime started
haicc boot/teardown                             every runtime stopped, what
                                                boot/deploy put in place removed
haicc sources                                   the sources registered
haicc sources unlink <folder>
haicc sources download [<what>...]              fetched over https: <org>,
                                                <org>/<package>
haicc sources https | no-https                  https as the backup, or not

  haicc boot/deploy
  haicc . boot/deploy host base-component-haicc
  haicc host service/initialise
  haicc host service/start
  haicc host boot/deploy node-1 base-package-runtime
  haicc host haicc node-1 help/get
  haicc host crud/read . --flags log=verbose
  haicc host --flags log=debug -- haicc node-1 crud/read .
  haicc host boot/teardown node-1
  haicc . boot/teardown host
  haicc boot/teardown

A URI is relative, without a leading slash: . is the local root, host the
position host in it. A position named like a command of haicc itself is
written with ./ in front: ./sources, ./boot, ./output.

Help in an mrepo: haicc . help/get, haicc host help/get . packages`
