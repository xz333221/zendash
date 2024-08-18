/**
 *  fileName:test
 *  time:2024/8/18
 *  todo:测试
 */
const zendash = require('../../lib');
const id = zendash.generateId(8);
console.log(`id ==> `, id)

const numId = zendash.generateId(6, true)
console.log(`numId ==> `, numId)
