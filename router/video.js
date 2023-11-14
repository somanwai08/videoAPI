const express = require('express')
const router = express.Router()
const videoController = require('../controller/videoController')

router.get('/videolists', videoController.videoList)

router.get('/playlists',videoController.playList)

module.exports=router