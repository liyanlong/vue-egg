// const menuConfigCache = {}
// const metaMap = {}
// const prefixKey = 'menu'

// function importAll(r) {
//   r.keys(key => menuConfigCache[key] = r(key))
// }
// function generateMetaMap(menuConfig, prefixKey, META_MAP) {
  
//   if (menuConfig['module']) {
//     META_MAP[prefixKey] = Object.assign({
//       code: prefixKey
//     }, menuConfig['module']['meta'])
//   }
  
//   Object.keys(menuConfig).forEach((key) => {
//     const currentKey = prefixKey === '' ? key : prefixKey + '.' + key
//     const metaChildren = menuConfig[key]['children']
//     if (metaChildren) {
//       delete menuConfig[key]['children']      
//     }
//     META_MAP[currentKey] = Object.assign({
//       // permission key
//       code: currentKey
//     }, menuConfig[key])
//     if (metaChildren) {
//       generateMetaMap(metaChildren, currentKey, META_MAP)
//     }
//   })
//   return META_MAP
// }

// importAll(require.context("./", false, /[^index]\.js$/));

// Object.keys(menuConfigCache).forEach(key => {
//   generateMetaMap(menuConfigCache[key], prefixKey + '.' + key, metaMap)
// })

const meta = require('./meta');
const metaMap = meta.getMetaMap();

const PERMISSIONS = Object.keys(metaMap).map((key) => {
  const data = metaMap[key];
  return {
    name: data['name'],
    code: data['code'],
    desc: data['desc'] 
  };
});

module.exports = {

  getMeta (key) {
    
    // return meta.getMeta(key);
  },

  get permissions () {
    return PERMISSIONS;
  }
}
