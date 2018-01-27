console.log('load a');

exports.name = 'a';

const b = require('./b');
console.log(b);
exports.foo = {
  foo: function () {
    console.log('foo()');
  }
}
console.log('loaded a');
