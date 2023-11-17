const mongoose = require('mongoose')
const userModel = require('./userModel')
const {mongodbPath}=require('../config/config.default')

async function main(){
        await  mongoose.connect(mongodbPath)
}

// 連接數據庫
main().then(res=>{console.log('successfull');}).catch(err=>{
    console.log('failed');
    console.log(err,'err');
})


// 創建集合
const user_Model = mongoose.model('User',userModel)

module.exports = {
    User:user_Model
}
