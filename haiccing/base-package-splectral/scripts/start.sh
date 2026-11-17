# start: the mrepo brought into service, its server started by its start hook, run for it (HAICC_AT)
set -e
haicc "$HAICC_AT" service/initialise
haicc "$HAICC_AT" service/start
