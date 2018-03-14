import axios from 'axios'
import {
  isProd,
  baseURL
} from '@/utils/env'
import {Message} from 'element-ui'
import router from '@/router'
const sharedEnvCode = require('shared/env/code')

const httpClient = axios.create({
  baseURL,
  timeout: isProd ? 15000 : 30000,
  // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfCookieName: '__csrfToken', // default
  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN' // default
})

// interceptor
httpClient.interceptors.request.use(config => {
  // add authroization token
  return config
})

httpClient.interceptors.response.use(response => {
  response.status === 200 && handlerError(response)
  return response
}, error => {
  const response = error.response
  response.status === 401 && handlerRedirect(response)
  response.status === 404 && handlerNotFound(response)
  return Promise.reject(response)
})

// 调用接口失效
function handlerRedirect (response) {
  router.push({
    name: 'auth-login'
  })
}

function handlerNotFound ({data}) {
  Message({
    message: `[Request Error] reason: ` + data.error || '404 NotFound',
    type: 'error'
  })
}

function handlerError ({data}) {
  if (!sharedEnvCode.equalCode('success', data.errCode) && data.errMsg) {
    Message({
      message: `[Error] ` + data.errMsg,
      type: 'error'
    })
  }
}

export default httpClient

export function handlerResponse (response) {
  if (response.data && sharedEnvCode.equalCode('success', response.data.errCode)) {
    return Promise.resolve(response.data)
  }
  return Promise.reject(response)
}
