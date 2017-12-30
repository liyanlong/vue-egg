const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./plugins', false, /\.js$/)

export default {
  install () {
    requireAll(req)
  }
}
