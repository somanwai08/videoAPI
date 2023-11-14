const mongoose = require('mongoose')
const userModel = require('./userModel')

async function main(){
        await  mongoose.connect('mongodb://localhost:27017/rexpress-video')
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
