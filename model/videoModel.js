const mongoose = require('mongoose')
const baseModel = require('./baseModel')

// 定義數據類型
module.exports = new mongoose.Schema({
   title:{
    type:String,
    required:true
   },
   description:{
    type:String,
    required:false
   },
   vodvideoId:{
    type:String,
    required:true
   },
//    記錄是哪一個用戶上傳的
   user:{
    type:mongoose.ObjectId,
    required:true,
    ref:'User'
   },
   cover:{
    type:String,
    required:false
   },
   commentCount:{
      type:Number,
      default:0
   },
   like:{
     type:Number,
     default:0
   },
   unlike:{
      type:Number,
     default:0
   },
    ...baseModel
})