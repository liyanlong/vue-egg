const isClient = (function () {
  return typeof window === 'object'
})();

module.exports = {
  isClient
};
