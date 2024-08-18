"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateId = void 0;
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
exports.generateId = generateId;