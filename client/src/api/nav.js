import httpClient, {handlerResponse} from '@/plugins/axios'

export default {
  loadMenu () {
    return httpClient.get('nav/menu').then(handlerResponse)
  }
}
