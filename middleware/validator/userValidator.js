const {body}=require('express-validator')
const validate = require('./errorBack')
const {User} = require('../../model/index')

module.exports.register =validate([
    body('username')
    .notEmpty().withMessage('用戶名不能為空')
    .bail()
    .isLength({min:3}).withMessage('長度必須至少3位'),

    body('email')
    .notEmpty().withMessage('郵箱不能為空').bail()
    .isEmail().withMessage('郵箱格式不正確').bail()
    .custom(async val => {
        // 執行以下語句，將返回一條根據條件查詢到的結果（如有），沒有就是null
       const result = await User.findOne({email:val})
       if(result){
        // 如果找到了結果，就停止註冊，並返回提示給客戶端
        return Promise.reject('郵箱已被註冊')
       }
    }).bail(),
    body('phone')
    .notEmpty().withMessage('手機號碼不能為空').bail()
    .custom(async val => {
        // 執行以下語句，將返回一條根據條件查詢到的結果（如有），沒有就是null
       const result = await User.findOne({phone:val})
       const regex = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
       if(result){
        // 如果找到了結果，就停止註冊，並返回提示給客戶端
        return Promise.reject('手機號碼已被註冊')
       }
       if(!regex.test(val)){
           throw new Error('手機號碼格式錯誤')
       }

    }).bail()
])

module.exports.login = validate([
    body('email')
    .notEmpty().withMessage('郵箱不能為空').bail()
    .isEmail().withMessage('郵箱格式不正確').bail(),
   
    body('password')
    .notEmpty().withMessage('密碼不能為空').bail()
]) 
