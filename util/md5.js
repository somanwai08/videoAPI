const crypto = require('crypto')

// 加密密碼的函數

module.exports=(string)=>{
   return crypto
    .createHash('md5') //使用md5方式進行加密
    .update( 'by'+ string )  //加密的內容
    .digest('hex')  //加密算法
}