const prefix = 'sopr_v1_'

const caches = {}

export function setItem (name, value, options = {}) {
  name = prefix + name

  // cache
  caches[name] = {
    data: value,
    expire_time: options.hasOwnProperty('expire_time') ? options['expire_time'] : null
  }

  localStorage.setItem(name, JSON.stringify(caches[name]))
}

/**
 * @param {string} name
 * @param {object} options = {
 *   default: ''
 * }
 */
export function getItem (name, options = {}) {
  let result = _getItem(name)
  return !result && options.hasOwnProperty('default')
    ? options['default']
    : result
}

function _getItem (name) {
  name = prefix + name
  let result = null

  if (caches[name]) {
    result = caches[name]
  } else {
    try {
      result = JSON.parse(localStorage.getItem(name))
    } catch (e) {}
  }
  if (!result) {
    return null
  }

  // 检查是否过期
  if (result && result.hasOwnProperty('expire_time') && +Date.now() - result['expire_time'] > 0) {
    // 清除 storage
    localStorage.removeItem(name)
    delete caches[name]
    return null
  }
  return result['data']
}
