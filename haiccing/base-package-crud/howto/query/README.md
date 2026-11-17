# query

Nodes selected by a query: every child, those whose document matches a filter, a value inside a document.

A URI that selects is a query, XPath's forward part (`base-docs-xpath`).
Nothing selected is an empty answer, not an error.

## Steps

```sh
# some structure to select from
haicc . crud/create swarms/swarm-1 '{"size":3,"owner":{"name":"ann"}}'
haicc . crud/create swarms/swarm-2 '{"size":1}'
# every child
haicc . crud/read "swarms/*"
# those whose document a filter holds for
haicc . crud/read "swarms/*[size>2]"
haicc . crud/read "swarms/*[owner/name='ann']"
# a value inside a document
haicc . crud/read swarms/swarm-1/owner/name
# the records of another layer: the requests done
haicc . crud/read "done/*" --flags layer=request
# the selection removed
haicc . crud/delete "swarms/*[size<2]"
```

## Notes

- **A key in a filter in its URI form**: `publicKey` is written
  `public-key`.
