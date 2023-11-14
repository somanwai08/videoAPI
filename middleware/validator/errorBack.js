const {validationResult}=require('express-validator')


module.exports = validator =>{

    return async (req,res,next)=>{
        await Promise.all(validator.map(validate=>validate.run(req)))

        const errors= validationResult(req)
    if(!errors.isEmpty()){
        // 給客戶端返回錯誤信息
        return res.status(401).json({error:errors.array()})
    }else{
        next()
    }
    }
}