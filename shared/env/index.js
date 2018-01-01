var isClient = (function () {
  return typeof window === 'object'
})();

module.exports = {
  isClient: isClient
};
