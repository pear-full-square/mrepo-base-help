# start: the mrepo brought into service, run for it (HAICC_AT)
set -e
haicc "$HAICC_AT" service/initialise
haicc "$HAICC_AT" service/start
