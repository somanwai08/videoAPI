var RPCClient = require('@alicloud/pop-core').RPCClient
const {accessKeyID,accessKeySecret}=require('../util/key')
const {Video}=require('../model')

function initVodClient(accessKeyId1,accessKeySecret1){
    var regionId = 'cn-shanghai'
    var client = new RPCClient({
        accessKeyId:accessKeyId1,
        accessKeySecret:accessKeySecret1,
        // accessKeyId,
        // accessKeySecret,
        endpoint:'http://vod.'+regionId+'.aliyuncs.com',
        apiVersion:'2017-03-21'
    })

    return client
}


exports.getvod = async (req,res)=>{
     console.log(accessKeyID,'accessKeyId');
     console.log(accessKeySecret,'accessSecrete');
     var client = initVodClient(accessKeyID,accessKeySecret)

    const vodback =  await client.request("CreateUploadVideo",{
        Title:'this is a sample',
        FileName:'filename.mp4'
     },{})

     res.status(200).json({vod:vodback})
    
}


exports.deleteVideo = async (req,res)=>{
    const client = initVodClient(accessKeyID,accessKeySecret)
    const videoId = req.params.vodVideoId
      console.log(req,'req');
      console.log(req.params,'req.params');
     try{
        const vodback = await client.request("DeleteVideo",{
            VideoIds:videoId
         },{})
         const dbBack = await Video.deleteOne({vodvideoId:videoId})

         res.status(200).json({msg:'成功刪除視頻！'})

     }catch{
        res.status(404).json({msg:"沒有可刪除的視頻！"})
     }
   
}