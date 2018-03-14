import httpClient, {handlerResponse} from '@/plugins/axios'

// 查询用户信息
export default {
  /**
   * 获取用户的权限查询
   * @param {string} username
   * @return
   */
  getPermissions (username) {
    return httpClient.get('/user/permissions', {
      username
    }).then(handlerResponse)
  }
}
