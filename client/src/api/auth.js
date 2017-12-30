import httpClient, {handlerResponse} from '@/plugins/axios'

export default {

  /**
   * 登录验证
   * @param {string} username
   * @param {string} password
   * @return
   */
  login (username, password) {
    return httpClient.post('/auth/login', {
      username,
      password
    }).then(handlerResponse)
  },

  logout () {
    return httpClient.post('/auth/logout')
  },

  getInfo () {
    return httpClient.get('/auth/info')
    .then(handlerResponse)
  }
}
