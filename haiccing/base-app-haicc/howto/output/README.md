# output

A response printed whole, as stored, or its output alone; the width it is printed to.

A command's response is a record. By default it is printed whole,
unpacked across lines to a width; `--raw` prints it as stored, one line;
`--output` prints only what the action answered.

## Steps

```sh
# the record whole, unpacked to the width
haicc . info/get
# as stored: one line
haicc --raw . info/get
# the output alone: what the action answered
haicc --output . crud/read .
# the width: auto (the terminal's), set, back to auto
haicc output
haicc output 120
haicc output auto
```

## Notes

- **`HAICC_RAW` and `HAICC_OUTPUT`** set the same for every command.
