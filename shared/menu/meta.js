const prefix = 'menu'

function generateMetaMap(metaConfig, prefixKey, META_MAP) {
  Object.keys(metaConfig).forEach((key) => {
    const currentKey = prefixKey === '' ? key : prefixKey + '.' + key
    const metaChildren = metaConfig[key]['children']
    if (metaChildren) {
      delete metaConfig[key]['children']      
    }
    META_MAP[currentKey] = Object.assign({
      // permission key
      code: currentKey
    }, metaConfig[key])
    if (metaChildren) {
      generateMetaMap(metaChildren, currentKey, META_MAP)
    }
  })
  return META_MAP
}

const metaConfig = {
  product: {
    icon: '', 
    name: '产品与功能', 
    desc: '',
    authority: true,
    children: {
      charts: {
        icon: '', 
        name: '图形集合', 
        desc: '',
        children: {
          chart: {icon: '', name: '基本图表', desc: '', },
          advance_chart: {icon: '', name: '高级图表', desc: '', authority: true},
        }
      },
      tables: {
        icon: '', 
        name: 'Table集合', 
        desc: '',
        children: {
          table: {icon: '', name: '表格', desc: ''},
        }
      },
      forms: {
        icon: '',
        name: '表单集合',
        desc: '',
        children: {
          form: {icon: '', name: '表单', desc: ''}
        }
      }
    }
  },
  system: {
    icon: '', 
    name: '系统',
    desc: '',
    children: {  
      permission: {icon: '', name: '个人权限'}
    }
  }
}
const META_MAP = generateMetaMap(metaConfig, 'menu', {})

module.exports = {
  getMeta (key) {
    return META_MAP[prefix + '.' + key] || null
  },
  getMetaMap () {
    return META_MAP
  }
} 
