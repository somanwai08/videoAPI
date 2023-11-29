const {body}=require('express-validator')
const validate = require('./errorBack')
const {User} = require('../../model/index')

module.exports.videoValidator = validate([
    body('title')
    .notEmpty().withMessage('視頻名不能為空').bail()
    .isLength({max:20}).withMessage('視屏名長度不能大於20').bail(),
    body('vodvideoId')
    .notEmpty().withMessage('vodId不能為空').bail()
    
]) 