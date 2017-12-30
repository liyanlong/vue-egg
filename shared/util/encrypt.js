const base64js = require('base64-js');
const utils = require('./index');
const env = require('../env');
const isClient = env.isClient;
const isNative = utils.isNative;
const map = utils.map;

function Base64 () {
}

Base64.prototype.encode = (function () {

  if (isClient && isNative(window.atob)) {
    return function b64EncodeUnicode(str) {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
          return String.fromCharCode('0x' + p1)
      }))
    }
  }

  function charCodeAt (char) {
    return char.charCodeAt();
  }

  return function base64Encode (str) {
    return base64js.fromByteArray(map(str, charCodeAt));
  }
})();

Base64.prototype.decode = (function () {
  if (isNative(window.atob)) {
    return function b64DecodeUnicode(b64Str) {
      return decodeURIComponent(atob(b64Str).split('').map(function(char) {
          return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2)
      }).join(''))
    }
  }
  function fromCharCode (byte) {
    return String.fromCharCode(byte);
  }
  return function base64Decode(b64Str) {
    let arr = base64js.toByteArray(b64Str)
    return map(arr, fromCharCode).join('');
  }
})();

Base64.encode = Base64.prototype.encode;
Base64.decode = Base64.prototype.decode;

module.exports = {
  Base64
}
