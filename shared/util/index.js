function noop () {}
function isArray (arr) {
  return Object.prototype.toString.apply(arr) === '[object Array]';
}

function isObject (obj) {
  return Object.prototype.toString.apply(obj) === '[object Object]';
}

function isString (str) {
  return Object.prototype.toString.apply(str) === '[object String]';
}

function isDefine (o) {
  return !isUndefine(o);
}

function isUndefine (o) {
  return Object.prototype.toString.apply(o) === '[object Undefined]';  
}

function isClient () {
  return typeof window === 'object' && isNative(window.constructor)
}

function isNative (fn) {
  return /native code/.test(fn.toString());
}

function def(o, name, value) {
  Object.defineProperty(o, name, {
    enumerable: true,
    writable: false,
    configurable: true,
    value: value    
  })
}

/**
 * map 递归
 * @param {string|array} arr 
 * @param {*} callback 
 */
function map (arr, callback) {
  var res = [];
  var kValue, mappedValue;

  for (var k = 0, len = arr.length; k < len; k++) {
    if ((typeof arr === 'string' && !!arr.charAt(k))) {
      kValue = arr.charAt(k);
      mappedValue = callback(kValue, k, arr);
      res[k] = mappedValue;
    } else if (typeof arr !== 'string' && k in arr) {
      kValue = arr[k];
      mappedValue = callback(kValue, k, arr);
      res[k] = mappedValue;
    }
  }
  return res;
}

function camelCaseToUnderline (str, isVariable) {
  if (isUndefine(isVariable)) {
    isVariable = true;
  }
  var firstChar = str.charAt(0);
  if (isVariable) {
    firstChar = firstChar.toLocaleLowerCase();
  }
  return firstChar + str.substr(1).replace(/[A-Z]/g, function (char) {
    return '_' + char.toLocaleLowerCase();
  });
}

function undef(o, name) {
  if (o.hasOwnPropety(name)) {
    delete o[name];
  }
  if (o[name]) {
    o[name] = null;
  }
}
module.exports = {
  noop: noop,
  isArray: isArray,
  isObject: isObject,
  isString: isString,
  isDefine: isDefine,
  isUndefine: isUndefine,
  isClient: isClient,
  isNative: isNative,
  map: map,
  camelCaseToUnderline: camelCaseToUnderline,
  def: def,
  undef: undef
};
