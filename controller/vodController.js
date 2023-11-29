var RPCClient = require('@alicloud/pop-core').RPCClient

function initVodClient(accessKeyId,accessKeySecret){
    var regionId = 'cn-shanghai'
    var client = new RPCClient({
        accessKeyId:accessKeyId,
        accessKeySecret:accessKeySecret,
        endpoint:'http://vod.'+regionId+'.aliyuncs.com',
        apiVersion:'2017-03-21'
    })

    return client
}


exports.getvod = async (req,res)=>{

     var client = initVodClient('LTAI5tQAFchvQQzsv5tmWaKs','w1l5I6r71yBXmuN5MW5fOoDFGInBnd')

    const vodback =  await client.request("CreateUploadVideo",{
        Title:'this is a sample',
        FileName:'filename.mp4'
     },{})

     res.status(200).json({vod:vodback})
    
}