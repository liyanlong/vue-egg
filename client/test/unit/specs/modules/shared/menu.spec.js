const menu = require('shared/menu')
describe('shared menu test', function () {
  it('unique basic array', () => {
    expect(menu.getMeta('product').code).to.be.equal('menu.product')
  })
})
