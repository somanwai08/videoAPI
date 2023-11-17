// 引入用戶註冊數據集合
const {User}= require('../model/index')
const {createToken}=require('../util/jwt')

// 用戶註冊
exports.register = async (req,res)=>{
    // 打印獲取到的數據
     console.log(req.body);
    

    //  return
    // 寫入數據
    const userModel = new User(req.body)
    // 保存
    const dbBack = await userModel.save()
    // delete user.password
      user =  dbBack.toJSON()
   
      delete user.password
    
    res.status(201).json({user})
}


// 用戶登錄
exports.login = async(req,res)=>{
  //  連接數據庫 查找是否有這用戶
  let dbBack = await User.findOne(req.body)
  console.log(dbBack,'dbBack');
  if(!dbBack){
    res.status(402).json({error:"郵箱或者密碼不正確"})
  }else{
    dbBack=dbBack.toJSON()
    // 簽發jwt
      const token = createToken(dbBack)
    // console.log(Token,'token');
    dbBack.token = token
     
    // 返回給客戶端
    res.status(200).json({message:"登錄成功！",user:{dbBack}})
  }
}

exports.list = async (req,res)=>{
    console.log(req.method);
    res.send('/userList')
}

