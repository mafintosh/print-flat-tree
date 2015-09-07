var flat = require('flat-tree')
var chalk = require('chalk')

module.exports = print

function print (tree, opts) {
  var list = []
  var i
  var j

  for (i = 0; i < tree.length; i++) list[Math.abs(tree[i])] = tree[i] >= 0
  if (!opts) opts = {}

  var width = list.length.toString().length + 1
  var roots = flat.fullRoots(list.length - list.length % 2)
  var blank = Array(width + 1).join(' ')
  var grey = opts.color === false ? echo : chalk.grey
  var yellow = opts.color === false ? echo : chalk.yellow
  var red = opts.color === false ? echo : chalk.red
  var matrix = []
  var max = 0

  var down = opts.down || '│'
  var left = opts.left || '─'
  var turnDown = opts.turnDown || '┐'
  var turnUp = opts.turnUp || '┘'

  for (i = 0; i < list.length; i++) max = Math.max(max, flat.depth(i) + 1)

  for (i = 0; i < list.length; i++) {
    matrix[i] = []
    for (j = 0; j < max; j++) matrix[i][j] = blank
  }

  for (i = 0; i < list.length; i++) {
    if (!list[i]) continue
    var depth = flat.depth(i)
    var children = flat.children(i)

    matrix[i][depth] = pad(i.toString(), ' ')

    if (children) {
      addPath(children[0], i, depth, 1)
      if (children[1] < list.length) addPath(children[1], i, depth, -1)
    }
  }

  for (i = 0; i < list.length; i += 2) {
    if (list[i] && roots.indexOf(i) === -1) matrix[i][0] = yellow(matrix[i][0])
  }

  for (i = 0; i < roots.length; i++) {
    var r = roots[i]
    var d = flat.depth(roots[i])
    if (list[roots[i]]) matrix[r][d] = red(matrix[r][d])
  }

  var str = ''
  for (i = 0; i < matrix.length; i++) {
    str += matrix[i].join('') + '\n'
  }

  str = str.replace(new RegExp('[' + left + down + turnDown + turnUp + ']', 'g'), function (s) {
    return grey(s)
  })

  return str

  function addPath (child, parent, parentDepth, dir) {
    if (!list[child]) return

    var depth = flat.depth(child)
    var ptr = depth + 1

    while (ptr < parentDepth) matrix[child][ptr++] = pad(left, left)
    matrix[child][ptr] = pad(dir < 0 ? turnUp : turnDown, left)

    while ((child += dir) !== parent) matrix[child][ptr] = pad(down, ' ')
  }

  function pad (str, val) {
    while (str.length < width) str = val + str
    return str
  }
}

function echo (str) {
  return str
}
