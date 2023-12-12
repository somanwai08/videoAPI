const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const {body,validationResult} =require('express-validator')
const validator = require('../middleware/validator/userValidator')
const {verifyToken}=require('../util/jwt')
const multer = require('multer')
const upload = multer({dest:'public/'})

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
.post('/headimg',
verifyToken(),
upload.single('headimg'),
// 連接數據庫進行校驗
userController.headimg)
.get('/userLists',
verifyToken(),
userController.list)
// 訂閱頻道
.get('/subscribe/:userId',
verifyToken(),
userController.subscribe)
.put('/',verifyToken,validator.update,userController.update)
// 取消訂閱頻道
.get('/unsubscribe/:userId',
verifyToken(),
userController.unsubscribe)
// 獲取頻道（用戶）信息
.get('/getuser/:userId',
verifyToken(false),
userController.getUser)
// 獲取用戶關注列表
.get('/getsubscribe/:userId',
userController.getSubscribe)
// 獲取用戶粉絲列表（老師的路由是getchannels）
.get('/getfans',
verifyToken(),
userController.getFans)


module.exports = router