console.log('load b');
const a = require('./a');
console.log(a);

function bar () {
  console.log('bar()');
}

module.exports = {
  bar: bar
}
console.log('loaded b');