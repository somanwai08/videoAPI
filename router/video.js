const express = require('express')
const router = express.Router()
const videoController = require('../controller/videoController')
const vodController = require('../controller/vodController')
const { verifyToken } = require('../util/jwt')
const {videoValidator} = require('../middleware/validator/videoValidator')

router
.delete('/deletecomment/:videoId/:commentId',verifyToken(),videoController.deleteComments)
.get('/commentlist/:videoId',videoController.getCommentList)
.post('/comment/:videoId',verifyToken(),videoController.addComments)
.get('/videolists', videoController.videoList)
.get('/video/:videoId',verifyToken(false),videoController.video)
.get('/getvod',
verifyToken(),
vodController.getvod)
.post('/createvideo',verifyToken(),videoValidator,videoController.createVideo)
.post('/likevideo/:videoId',verifyToken(),videoController.likeVideo)
.post('/unlikeVideo/:videoId',verifyToken(),videoController.unlikeVideo)



module.exports=router