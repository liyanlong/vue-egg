
function object2key (o) {
  if (typeof o === 'object') {
    if (o === null) {
      return 'null:null'
    }
    return Object.keys(o).sort().map(function (key) {
      return key + '::' + object2key(o[key])
    }).join('|')
  }
  return typeof o + ':' + o
}

/**
 * 数组去重 函数
 * 
 */
function unique () {
  var args = Array.prototype.slice.call(arguments, 0)
  var arr = []
  var tmp = {}
  var result = []

  args.forEach(function (arg) {
    arr = arr.concat(arg)
  })

  arr.forEach(function (val) {
    var key = object2key(val)
    if (tmp[key] !== 1) {
      tmp[key] = 1
      result.push(val)
    }
  })
  return result
}

module.exports = {
  unique: unique
}