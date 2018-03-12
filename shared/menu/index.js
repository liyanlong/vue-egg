var menuConfigCache = {
  product: require('./products'),
  system: require('./systems')
};

var metaMap = {};

var prefixKey = 'menu';

/**
 * 创建metaMap
 * @param {*} prefix 
 * @param {*} MENUS_CONFIG 
 * @param {*} META_MAP 
 */
function generateMetaMap(prefix, MENUS_CONFIG, META_MAP) {
  function generateMeta(code, menu) {
    return Object.assign({code: code}, menu['meta']);
  }
  for (var key in MENUS_CONFIG) {
    var code = prefix + '.' + key;
    var menuConfig = MENUS_CONFIG[key];
    META_MAP[code] = generateMeta(code, menuConfig['module']);

    for (var key2 in menuConfig['categories']) {
      var code2 = code + '.' + key2;
      META_MAP[code2] = generateMeta(code2, menuConfig['categories'][key2]);
      
      for (var key3 in menuConfig['items']) {
        var code3 = code2 + '.' + key3;
        META_MAP[code3] = generateMeta(code3, menuConfig['items'][key3]);
      }
    }
  }
  return META_MAP
}

generateMetaMap(prefixKey, menuConfigCache, metaMap)

module.exports = {

  getMeta: function (key) {
    return this.metaMap[prefixKey + '.' + key] || {};
  },

  getPermissions: function () {
    var metaMap = this.metaMap;
    return Object.keys(metaMap).map(function (key) {
      var data = metaMap[key];
      return {
        name: data['name'],
        code: data['code'],
        desc: data['desc'] 
      };
    });
  },
  generateMetaMap: generateMetaMap
}

Object.defineProperty(module.exports, 'metaMap', {
  enumerable: false,
  configurable: false,
  writable: false,
  value: metaMap
})