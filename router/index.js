const express = require('express')
const router = express.Router()

// 引入video路由模塊
router.use('/video',require('./video'))

// 引入user路由模塊
router.use('/user',require('./users'))



module.exports=router