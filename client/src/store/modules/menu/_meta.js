export const META_DATA_MAP = {
  product: {
    default: {icon: '', title: '产品与功能', desc: ''},
    chart: {icon: '', title: '图表', desc: ''},
    table: {icon: '', title: '表格', desc: ''},
    form: {icon: '', title: '表单', desc: ''}
  },
  system: {
    default: {icon: '', title: '系统'},
    permission: {icon: '', title: '个人权限'}
  }
}

export default function getMeta (module, name) {
  const moduleMetaMap = META_DATA_MAP[module]
  if (moduleMetaMap && moduleMetaMap[name]) {
    return moduleMetaMap[name]
  }
  return {}
}
