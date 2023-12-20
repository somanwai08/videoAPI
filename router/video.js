const express = require('express')
const router = express.Router()
const videoController = require('../controller/videoController')
const vodController = require('../controller/vodController')
const { verifyToken } = require('../util/jwt')
const {videoValidator} = require('../middleware/validator/videoValidator')

router
.delete('/deletecomment/:videoId/:commentId',verifyToken(),videoController.deleteComments)
.delete('/deletevideo/:vodVideoId',
verifyToken(),
vodController.deleteVideo)
.get('/commentlist/:videoId',videoController.getCommentList)
.post('/comment/:videoId',verifyToken(),videoController.addComments)
.post('/description/:videoId',verifyToken(),videoController.addDescription)
.get('/videolists', videoController.videoList)
.get('/video/:videoId',verifyToken(false),videoController.video)
.get('/getvod',
// verifyToken(),
vodController.getvod)
.post('/createvideo',verifyToken(),videoValidator,videoController.createVideo)
.post('/likevideo/:videoId',verifyToken(),videoController.likeVideo)
.post('/unlikeVideo/:videoId',verifyToken(),videoController.unlikeVideo)
.get('/likelist',verifyToken(),videoController.likeList)




module.exports=router