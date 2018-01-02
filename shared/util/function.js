
function object2key (o, ) {
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
export function unique () {
  let args = Array.prototype.slice.call(arguments, 0)
  let arr = []
  let tmp = {}
  let result = []

  args.forEach(function (arg) {
    arr = arr.concat(arg)
  })

  arr.forEach(function (val) {
    let key = object2key(val)
    if (tmp[key] !== 1) {
      tmp[key] = 1
      result.push(val)
    }
  })
  return result
}

function isEqual (a, b) {

}

function extend () {
  
}
export default {
  unique: unique
}
