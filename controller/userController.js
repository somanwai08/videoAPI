// 引入用戶註冊數據集合
const {User, Subscribe}= require('../model/index')
const {createToken}=require('../util/jwt')
const fs = require('fs')
const lodash=require('lodash')

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
    // console.log(req.method);
    console.log(req);
    res.send('/userList')
}

exports.update = async(req,res)=>{
  console.log(req.user,'req.user');
  const result = await User.findByIdAndUpdate(req.user._id,req.body,{new:true})
  console.log(result,'result');
  
   res.status(202).json({user:result})
}

exports.headimg = async (req,res)=>{
  // 傳到public文件夾的文件，會有新的filename
  // 把這個filename和文件名後綴關聯起來
  console.log(req.file);
  const array=req.file.originalname.split('.')
  const suffix = array[array.length-1]
  // fileName是新的文件名連後綴
  const fileName =  req.file.filename +'.'+ suffix
  // 把這個文件寫入public
      fs.rename('./public/'+req.file.filename,'./public/'+fileName,(err)=>{
                   if(err){ 
                    res.status(500).json({error:'服務器內部錯誤！'})
                  }else{
                    res.status(200).json({message:"上傳成功！",filename:fileName})
                  }
      })

  
}

//訂閱頻道
exports.subscribe = async (req,res)=>{
        console.log(req.user._id,'req.user');
        console.log(req.params,'req.params');
        if(req.user._id===req.params.userId){
          res.status(401).json({error:'不能關注自己！'})
        }
          // 查看是否已經關注
          const userId=req.user._id
          const channelId=req.params.userId
          const dbBack = await Subscribe.findOne({
            user:userId,
            channel:channelId})
          console.log(dbBack,'dbBack');
          if(dbBack){
            res.status(401).json({error:'已經訂閱了此頻道'})
          }else{
                //  a關注b的記錄要寫進數據庫
              await new Subscribe({user:userId,channel:channelId}).save()
                 // b的粉絲數加1
             const user = await User.findById(channelId)
             user.subscribrCount++
             console.log(user,'user');
             await user.save()
             res.status(200).json({message:'關注成功！'})
          }

}

//取消訂閱頻道
exports.unsubscribe = async (req,res)=>{
  if(req.user._id===req.params.userId){
    return res.status(401).json({error:'傳入了自己的取消關注id！'})
  }
    // 查看是否已經關注
    const userId=req.user._id
    const channelId=req.params.userId
    const dbBack = await Subscribe.findOne({
      user:userId,
      channel:channelId})
    if(!dbBack){
     return res.status(401).json({error:'沒有訂閱過此頻道！'})
    }else{
          //  a關注b的記錄要刪除
        await Subscribe.deleteOne({user:userId,channel:channelId})
           // b的粉絲數減1
       const user = await User.findById(channelId)
       user.subscribrCount--
       console.log(user,'user');
       await user.save()
       res.status(200).json({message:'取消關注成功！'})
    }

}

// 獲取頻道（用戶）信息
exports.getUser = async(req,res)=>{
  const channelId = req.params.userId
  let isSubscribed = false
  const channel = await User.findOne({_id:channelId})
    console.log(channel,'channel');
  if(req.user){
    // 如果有登錄,又能又有關注該頻道
    const dbBack = await Subscribe.findOne({user:req.user._id,channel:channelId})
    if(dbBack){
      isSubscribed=true
    }
  }
    return res.status(200).json({
      ...lodash.pick(channel,[
        '_id',
        'username',
        'image',
        'cover',
        'channeldes',
        'subscribrCount'
      ]),
      isSubscribed
    })
}

// 獲取用戶關注列表
exports.getSubscribe = async(req,res)=>{
     const userId = req.params.userId
     let List = await Subscribe.find({user:userId}).populate('channel')
     console.log(List,'list');
    const newList = List.map(item=>{
      return lodash.pick(item.channel,[
        '_id',
        'username',
        'image',
        'cover',
        'channeldes',
        'subscribrCount'
      ])
        
      
    })
     res.status(200).json({subscribeList:newList})

}

// 獲取用戶粉絲列表
exports.getFans = async(req,res)=>{
      const id = req.user._id
      const {pageNum=1,pageSize=1}=req.body
     let list = await Subscribe.find({channel:id})
                               .skip((pageNum-1)*pageSize)
                               .limit(pageSize)
                               .populate('user')
     const newList = list.map(item=>{
      return lodash.pick(item.user,[
        '_id',
        'username',
        'image',
        'cover',
        'channeldes',
        'subscribrCount'
      ])
     })
    //  console.log(newList,'list');

     res.status(200).json({fansList:newList})
   

}