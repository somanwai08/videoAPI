var RPCClient = require('@alicloud/pop-core').RPCClient
const {accessKeyID,accessKeySecret}=require('../util/key')

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

