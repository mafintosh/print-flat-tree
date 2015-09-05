# print-flat-tree

Converts a [flat tree](https://github.com/mafintosh/flat-tree) to a string

```
npm install print-flat-tree
```

## Usage

``` js
var print = require('print-flat-tree')

// your tree represented as a flat tree (each index means that node exists in the tree)
var tree = [0, 1, 2, 3, 7, 8, 9, 10]
console.log(print(tree))
```

Running the above outputs

```

  0──┐
     1──┐
  2──┘  │
        3──┐
           │
           │
           │
           7
  8──┐
     9
 10──┘

```

As can be seen from the above diagram `7` is the parent of `3` and `3` is the parent of `1` etc.

## API

#### `str = print(tree, [opts])`

Returns a string representation of the tree (represented as an array of [flat tree](https://github.com/mafintosh/flat-tree) indexes).
Per default ansi colors are used to color the tree. Pass `{color: false}` to disable this.

## Command line tool

There is also a command line tool available

```
npm install -g print-flat-tree
print-flat-tree 0 1 2 3 7 8 9 10 # print the above example
print-flat-tree {0..10} # print a tree with nodes 0->10
```

Yellow nodes are the leaf nodes and red nodes are nodes that can be fully rooted inside this tree

## License

MIT
