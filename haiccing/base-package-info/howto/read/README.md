# read

Documentation read by keywords: the install's in the docs mrepo, an mrepo's own in it.

Keywords are written where a URI is, from the top down, no dot. The
docs mrepo documents every package of the install; any other mrepo
answers about what is deployed in it.

## Steps

```sh
# the top page and the keywords below it
haicc docs info/get
# a page by its keywords, from the top
haicc docs info/get boot/deploy
# a section of a page
haicc docs info/get hdlc/validation
# a keyword with several meanings: each a choice
haicc docs info/get boot
# an mrepo's own: what is deployed in it
haicc host info/get
# extracted again, from its packages as they are now
haicc host info/extract
```
