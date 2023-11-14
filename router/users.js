const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const {body,validationResult} =require('express-validator')
const validator = require('../middleware/validator/userValidator')


router
// 註冊
.post('/registers',
validator.register
,userController.register)
// 登錄認證
.post('/logins',
// 認證客戶端傳過來的數據是否有效
validator.login,
// 連接數據庫進行校驗
userController.login)
.get('/userLists',userController.list)


module.exports = router