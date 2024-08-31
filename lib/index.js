"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseTime = exports.parseDate = exports.generateId = exports.debounce = void 0;
/**
 * 生成随机字符
 * @param {string} characters 字符集
 * @returns {string} 随机字符
 */
const getRandomCharacter = characters => {
  const index = Math.floor(Math.random() * characters.length);
  return characters.charAt(index);
};

/**
 * 生成id
 * @param {number} length id长度
 * @param {boolean} onlyNumber 是否生成仅数字id
 * @returns {string} 生成的id
 */
const generateId = (length = 8, onlyNumber = false) => {
  if (typeof length !== 'number' || length <= 0) {
    throw new Error('Length must be a positive number.');
  }
  if (typeof onlyNumber !== 'boolean') {
    throw new Error('onlyNumber must be a boolean.');
  }
  const numberCharacters = '0123456789';
  const alphabetCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  // 如果只允许数字，字符集为数字；否则包括字母和数字
  const characters = onlyNumber ? numberCharacters : alphabetCharacters + numberCharacters;
  let result = '';

  // 如果是数字ID，确保第一位不为0
  if (onlyNumber) {
    result += getRandomCharacter(numberCharacters.slice(1)); // 第一位为1-9
  } else {
    result += getRandomCharacter(characters);
  }

  // 生成剩余部分
  for (let i = 1; i < length; i++) {
    result += getRandomCharacter(characters);
  }
  return result;
};
/**
 * 防抖函数
 * @param {function} func
 * @param {number} wait
 * @returns {(function(...[*]): void)|*}
 */
exports.generateId = generateId;
const debounce = (func, wait = 300) => {
  if (typeof func !== 'function') {
    throw new Error('func must be a function.');
  }
  if (typeof wait !== 'number' || wait <= 0) {
    throw new Error('wait must be a positive number.');
  }
  let timeout;
  return function (...args) {
    // 清除上一次的定时器
    if (timeout) clearTimeout(timeout);

    // 设置新的定时器
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};
/**
 * 格式化时间的基础函数。
 * @param {Date|string|number|null} time - 要格式化的时间，可以是 Date 对象、时间戳（字符串或数字）或 null。如果传入 null，则使用当前时间。
 * @param {string} cFormat - 格式化模板，默认为 '{y}-{m}-{d} {h}:{i}:{s}'。模板中的占位符会被相应的时间值替换。
 * @param {boolean} isLocalTime - 指定是否使用本地时间进行格式化，默认为 true。如果为 false，则使用 UTC 时间。
 * @returns {string} 格式化后的时间字符串。
 * @throws {Error} 如果传入的 time 参数无效（既不是 Date 对象，也不是有效的时间戳），则抛出错误。
 */
exports.debounce = debounce;
const parseTimeBase = (time, cFormat, isLocalTime = true) => {
  let date = null;
  const format = cFormat;
  if (time) {
    if (typeof time === 'object') {
      if (Object.prototype.toString.call(time) === '[object Date]') {
        date = time;
      } else {
        throw new Error('The time parameters are not valid');
      }
    } else {
      if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
        time = parseInt(time);
      }
      if (typeof time === 'number' && time.toString().length === 10) {
        time = time * 1000;
      }
      date = new Date(time);
    }
  } else {
    date = new Date();
  }
  const formatObj = {
    y: isLocalTime ? date.getFullYear() : date.getUTCFullYear(),
    m: isLocalTime ? date.getMonth() + 1 : date.getUTCMonth() + 1,
    d: isLocalTime ? date.getDate() : date.getUTCDate(),
    h: isLocalTime ? date.getHours() : date.getUTCHours(),
    i: isLocalTime ? date.getMinutes() : date.getUTCMinutes(),
    s: isLocalTime ? date.getSeconds() : date.getUTCSeconds(),
    a: isLocalTime ? date.getDay() : date.getUTCDay()
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
};
/**
 * 格式化时间为指定格式的字符串。
 * @param {Date|string|number|null} time - 要格式化的时间，可以是 Date 对象、时间戳（字符串或数字）或 null。如果传入 null，则使用当前时间。
 * @param {string} cFormat - 格式化模板，默认为 '{y}-{m}-{d} {h}:{i}:{s}'。模板中的占位符会被相应的时间值替换。
 * @param {boolean} isLocalTime - 指定是否使用本地时间进行格式化，默认为 true。如果为 false，则使用 UTC 时间。
 * @returns {string} 格式化后的时间字符串。
 */
const parseTime = (time, cFormat = '{y}-{m}-{d} {h}:{i}:{s}', isLocalTime = true) => {
  return parseTimeBase(time, cFormat, isLocalTime);
};
/**
 * 格式化时间为指定格式的日期字符串（不包含时间）。
 * @param {Date|string|number|null} time - 要格式化的时间，可以是 Date 对象、时间戳（字符串或数字）或 null。如果传入 null，则使用当前时间。
 * @param {string} cFormat - 格式化模板，默认为 '{y}-{m}-{d}'。模板中的占位符会被相应的日期值替换。
 * @param {boolean} isLocalTime - 指定是否使用本地时间进行格式化，默认为 true。如果为 false，则使用 UTC 时间。
 * @returns {string} 格式化后的日期字符串。
 */
exports.parseTime = parseTime;
const parseDate = (time, cFormat = '{y}-{m}-{d}', isLocalTime = true) => {
  return parseTimeBase(time, cFormat, isLocalTime);
};
exports.parseDate = parseDate;