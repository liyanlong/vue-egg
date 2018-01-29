const MENU_META_MAP = require('./meta')

const menuPermissions = (function createPermission(metaMap, prefixKey, permissions) {
  Object.keys(metaMap).forEach((key) => {
    if (metaMap[key]['meta']) {
      createPermission(metaMap[key]['meta'], prefixKey + '.' + key, permissions)
    } else {
      // 只获取子权限 product.charts 
      permissions.push({
        name: metaMap[key]['name'],
        code: prefixKey + '.' + key,
        desc: metaMap[key]['desc'] || ''
      })
    }
  })
  return permissions
})(MENU_META_MAP, 'menu', [])

module.exports = {

  getMeta (key) {
    const keys = key.split('.')
    let tmp = MENU_META_MAP
    while (keys.length) {
      let key = keys.shift()
      tmp = tmp[key]
      if (keys.length) {
        tmp = tmp['meta']
      }
      if (!tmp) {
        return null
      }
    }
    return tmp
  },

  get permissions () {
    return menuPermissions
  }
}
