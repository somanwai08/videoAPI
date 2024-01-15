const mongoose = require('mongoose')
const userModel = require('./userModel')
const videoModel = require('./videoModel')
const subscribeModel = require('./subscribeModel')
const videoCommentsModel = require('./videoCommentModel')
const videoLikeModel = require('./videoLike')
const videoCollectModel = require('./collectVideoModel')
const {mongodbPath}=require('../config/config.default')

async function main(){
        await  mongoose.connect(mongodbPath)
}

// 連接數據庫
main().then(res=>{console.log('successfull');}).catch(err=>{
    console.log('failed');
    console.log(err,'err');
})


// 創建集合
const user_Model = mongoose.model('User',userModel)
const video_Model = mongoose.model('Video',videoModel)
const subscribe_Model = mongoose.model('SubscribeRecords',subscribeModel)
const videoComment_Model = mongoose.model('VideoComments',videoCommentsModel )
const videoLike_Model = mongoose.model('videoLike',videoLikeModel)
const collectVideo_Model = mongoose.model('CollectVideo',videoCollectModel)

module.exports = {
    User:user_Model,
    Video:video_Model,
    Subscribe:subscribe_Model,
    VideoComments:videoComment_Model,
    VideoLike:videoLike_Model,
    VideoCollect:collectVideo_Model
}
