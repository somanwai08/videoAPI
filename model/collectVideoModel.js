const mongoose = require('mongoose')
const baseModel = require('./baseModel')

// 定義數據類型
module.exports = new mongoose.Schema({
    user:{
        type:mongoose.ObjectId,
        required:true,
        ref:'User'
    },
    video:{
        type:mongoose.ObjectId,
        required:true,
        ref:'Video'
    },
    ...baseModel
})