export const NODE_ENV = String(process.env.NODE_ENV).toLowerCase()

export const isProd = NODE_ENV === 'production'
export const isDev = NODE_ENV === 'development'
export const isTest = NODE_ENV === 'test'

export const baseURL = process.env.baseURL

export const isClient = (function() {
  return typeof window === 'object' && Object.prototype.toString.apply(o) === '[object Window]'
})()
