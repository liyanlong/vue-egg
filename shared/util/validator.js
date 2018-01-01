const util = require('./index');
const isArray = util.isArray;
const isObject = util.isObject;
const isString = util.isString;
const isUndefine = util.isUndefine;
const def = util.def;
const undef = util.def;
const noop = util.noop;

const validators = {};

const sharedRule = {

  /**
   * 用户名检查
   * @param {string} input
   * 
   * @return {boolean}
   */
  username: function (input) {
    // 用户名格式要求
    // 字母，数字，下划线，减号
    return /^[a-zA-Z0-9_-]{4,16}$/.test(input)
  },
  
  /**
   * 检查 input 在 min, max之间
   * @param {string|number} input
   * @param {number} min
   * @param {number} max
   * 
   * @return {boolean}
   */
  between (input, min, max) {
    min = Number(min);
    max = Number(max);
    if (isNaN(min) || isNaN(max)) {
      throw TypeError('[validate error]. the between function params is not valid!');
    }
    
    let val;
    if (isString(input)) {
      val = input.length;
    } else {
      val = parseFloat(input);
    }
    return val >= min && val <= max;  
  },

  /**
   * email检查
   * @param {string} input
   * 
   * @returns {boolean}
   */
  email (input) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return reg.test(input);
  },

  /**
   * url地址检查
   * @param {string} input
   * 
   * @return {boolean}
   */
  url (input) {
    const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return reg.test(input)
  },

  /**
   * 检查是否为小写
   * @param {string} str
   * 
   * @return {boolean}
   */
  lowercase (str) {
    return /^[a-z]+$/.test(str);
  },

  /**
   * 检查是否为大写字母
   * @param {string} input
   * 
   * @return {boolean}
   */
  uppercase (input) {
    return /^[A-Z]+$/.test(input);
  },
  

  /**
   * 大小写字母
   * @param {string} input
   * 
   * @return {boolen}
   */
  alphabets (input) {
    return /^[A-Za-z]+$/.test(str);
  },

  /**
   * 正则表达式
   * @param {string} input 
   * @param {string} regexp 
   * 
   * @return {boolean}
   */
  exp (input, regexp) {
    let reg = new RegExp(regexp);
    return reg.test(input);
  }
};

// KEYS
const SHARE_RULES =  Object.keys(sharedRule).join('|');


/**
 * 
 * 注册 validator
 * 
 * @param {string} name 
 * @param {Validator} validator 
 */
function registerValidator (name, validator) {
  var _validators = validators;
  if (!(validator instanceof Validator)) {
    throw new TypeError('[register error]. unsupport type to register,' + ' the type is ' + typeof validator);
  }

  // 已经注册, 直接返回取消注册函数
  if (validator.$isRegister) {
    return validator.$unRegister;
  }

  // 允许 validators 设置多个
  if (isArray(_validators[name])){
    _validators[name].push(validator);
  } else if (_validators[name] instanceof Validator) {
    // to array
    _validators[name] =[_validators[name], validator];
  } else {
    _validators[name] = validator;
  }
  def(validator, '$isRegister', true);
  def(validator, '$unRegister', function () {
    if (isArray(_validators[name])) {
      // 从数组中移除 validator 对象
      _validators[name].splice(_validators[name].indexOf(validator), 1);
    } else if (_validators[name] instanceof Validator) {
      undef(_validators, name);
    }
    def(validator, '$isRegister', false);
  });
}

function registerValidatorObj (name, obj) {
  let rule;
  switch(obj['rule']) {
    case 'function':
      rule = obj['fn'] || noop;
      break;
    case 'min': {
      rule = obj['rule'] + ':' + obj['value'];
      break;
    }
    case 'between': {
      rule = obj['rule'] + ':' + [obj['min'], obj['max']].join(',');
      break;
    }
    default:
      rule = obj['rule'];
  }
  return registerValidator(name, new Validator(rule, obj['message']));
}

function registerValidatorArr (name, arr) {
  for (let validator of arr) {
    registerValidator(name, validator)
  }
}

const parseRule = (function () {
  const regStr = '^(' + SHARE_RULES + ')(?:\:(.+))?$';
  const reg = new RegExp(regStr);
  return function parseRule (rule) {
    if (isString(rule)) {
      let result = reg.exec(rule);
      if (result) {
        let strategy = result[1];
        if (sharedRule.hasOwnProperty(strategy)) {
          let params = isUndefine(result[2]) ? undefined : result[2].split(',');
          return new Rule(sharedRule[strategy], params);
        }
      }
    }
    return new Rule(rule);
  }
})();

/**
 * 验证rule 与 val的值
 * 
 * @param {Rule} rule 
 * @param {*} val 
 */
function checkValidator (rule, val) {
  let r = rule.$value;
  let params = rule.$params;
  if (r instanceof RegExp) {
    return r.test(val) === true;
  }
  if (r instanceof Function) {
    let args = [val];
    if (isArray(params)) {
      args = args.concat(params.slice(0));
    }
    return r.apply(this, args) === true;
  }
  return r === val;
}

/**
 * @author liyanlong
 * @description 验证类
 */
class Rule {
  constructor (value, params) {
    def(this, '$value', value);
    def(this, '$params', params);
  }
}

/**
 * 验证 Validator 类
 * 
 * @author liyanlong
 * @version 0.0.1
 * @description 验证基类
 */
class Validator {
  
  constructor (rule, message, options = {}) {
    def(this, '$rule', parseRule(rule));
    def(this, '$message', '' + message);
    def(this, '$options', options);
  }

  /**
   * 检查结果值
   * 
   * @param {any} input 
   * @returns 
   * @memberof Validator
   */
  validate (input) {
    return checkValidator(this.rule, input);
  }

  register(name) {
    if (!this.$isRegister) {
      this.$unRegister = registerValidator(name, this);   
    }
  }

  unregister () {
    if (this.$isRegister) {
      this.$unRegister && this.$unRegister();
      this.$unRegister = null;
      def(this, '$isRegister', false);      
    }
  }

  get rule () {
    return this.$rule;
  }

  get message() {
    return this.$message;
  }

}

const validator = {
  Validator: Validator,
  register (name, obj) {

    function _registerValidator (name, o) {
      if (o instanceof Validator) {
        return registerValidator(name, o);        
      } else if (isObject(o)) {
        return registerValidatorObj(name, o);
      }
      return noop;
    }

    if (isArray(obj)) {
      let unRegisterFn = []
      for (let _validator of obj) {
        unRegisterFn.push(_registerValidator(name, _validator));
      }
      return function () {
        unRegisterFn.forEach(unRegister => unRegister());
      }
    }
    return _registerValidator(name, obj);
  },

  unregister (name, validator) {
    if (validator instanceof Validator) {

    }
  },

  /**
   * 
   * @param {*} type 
   * @param {*} input 
   * @param {*} options 
   */
  validate (type, input, options = {}) {
    // 检查是否为深度验证， 深度验证返回 message 集合
    let deep = options.deep ? options.deep : false;
    if (!validators[type]) {
      throw new TypeError('[type error]. type is not exists!');
    }
    let _validators = isArray(validators[type]) ? validators[type].slice(0) : validators[type];
    
    let messages = [];
    for (let i = 0, len = _validators.length; i < len; i++) {
      let validator = _validators[i];
      if (true !== validator.validate(input)) {
        messages.push(validator.message);
      }
      if (messages.length && !deep) {
        break;
      }
    }

    return {
      error: messages.length === 0 ? null : true,
      message: deep ? messages : messages[0]
    };
  },

  isValidate (type, input) {
    let result = this.validate(type, input);
    return result.error === true;
  }
}

validator.register('username', new Validator('username', '请输入正确的用户名'));

validator.register('password', [
  new Validator('exp:^[A-Z]', '密码首字母要求大写'),
  {rule: 'between', min: 6, max: 40, message: '密码长度要求在 6~14之间'},
]);

validator.register('email', [
  {rule: 'min', value: 10, message: '密码长度要求在 6~14之间'},  
  {rule: 'email', message: '请输入合法的email地址'}
]);

def(validator, '$validators', validators);
module.exports = validator;
