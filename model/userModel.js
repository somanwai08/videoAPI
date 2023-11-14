const mongoose = require('mongoose')
const md5=require('../util/md5')
const baseModel = require('./baseModel')

// 定義數據類型
module.exports = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        set:value=>md5(value),
        select:false
    },
    phone:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:null
    },
    email:{
        type:String,
        required:true,
    },
    ...baseModel
})