const jwt = require('jsonwebtoken')
const {uuid} = require('../config/config.default')

module.exports.verifyToken = (req,res,next) =>{
           //    獲取header的authorization信息
         let token = req.headers.authorization
         
        if(!token){
                // 如果沒有token，服務器返回錯誤信息
                res.status(402).json({error:'請傳入token'})
        }else{
            // 如果有token，要驗證是否正確
                 // 能走到這裡，就是可以獲取token，去掉’bearer ‘，再進行驗證
             token = token.split('Bearer ')[1]

           jwt.verify(token,uuid,(err,decoded)=>{
                if(err===null){
                    // 走到這裡，就是token有效
                    // 把用戶信息附加在req，留待下個中間件可以繼續使用
                    req.user = decoded
                    next()
                }else{
                    //  token無效，返回錯誤信息
                    res.status(402).json({error:"無效的token"})
                }
            })
            
        }
        
       
}

module.exports.createToken= (dbBack)=>{
       return jwt.sign(dbBack,uuid,{expiresIn:'1h'})
}

