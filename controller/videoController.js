const {Video, VideoComments, VideoLike}=require('../model/index')

exports.videoList = async (req,res)=>{
    const {pageNum=1,pageSize=10 }=req.body
    console.log(pageNum,'pagenum');
    const list = await Video.find() //查到所有視頻
                            .skip((pageNum-1)*pageSize)      //跳過某一頁之前的所有數據
                            .limit(pageSize)                 //獲取該頁的所有數據
                           // .sort({createAt:-1})             //按上傳視頻時間的倒序排列
                            .populate('user','_id username cover')      //把user這個字段進行關聯查詢
                            // 獲取總的視頻條數
    const videoCount = await Video.countDocuments()

    res.status(200).json({list,videoCount})
}

exports.playList = async (req,res)=>{
    console.log(req.method);
    // JSON.parse(')')
    res.send('/playList')
}

exports.createVideo = async (req,res) => {
    const data = req.body
    data.user = req.user._id
    console.log(data,'data');
    console.log(req.user,'req.user');
    const videoModel = new Video(data)
    try{
        const dbBack = await videoModel.save()
        res.status(201).json({dbBack})
    }catch (error){
           res.status(500).json({err:error})
    }
    
    
    // res.send(req.body)
}

exports.video = async(req,res)=>{

    console.log(req.params,'params');

    const {videoId}=req.params
     console.log(videoId,'videoId');
const dbBack = await Video.find({vodvideoId:videoId})
                          .populate('user','_id username cover')
    console.log(dbBack,'dbBack');

    res.status(200).json({videoInfo:dbBack})


}

exports.addComments = async(req,res)=>{
    
    console.log(req.user,'req.user');
    const user = req.user._id
    const videoId = req.params.videoId
    const content = req.body.content
    // 根據videoId查找數據庫看看是否有這一條視屏
    const hasVideo = await Video.find({_id:videoId})

    // 如果有，往數據庫添加數據
        //  視頻評論數+1
        if(hasVideo){
            await new VideoComments({
                user,
                video:videoId,
                content
            }).save()
            
           const video = await Video.findById({_id:videoId})
           video.commentCount++
           video.save()
           res.status(200).json({message:'添加評論成功！'})
        }else{
            return res.status(404).json({message:"沒有找到該視頻！"})
        }
    
    //如果沒有，返回404 
}

exports.getCommentList = async(req,res)=>{
    const videoId = req.params.videoId
    const video = await Video.find({_id:videoId})
    console.log(video,'video');
    if(video.length!==0){
        const {pageNum=1,pageSize=10}=req.body
        commentList = await VideoComments.find({video:videoId})
                                        .skip((pageNum-1)*pageSize).limit(pageSize).populate('user','username cover')
        console.log(commentList,'commentlist');
        res.status(200).json({commentList})
    }else{
        return res.status(404).json({message:'該視頻不存在！'})
    }
    
}

exports.deleteComments = async(req,res)=>{
     console.log(req.params,'req,params');
     const {videoId,commentId}=req.params
     console.log(videoId);
    //  查看是否有該視頻
    const video = await Video.findById({_id:videoId})
    console.log(video,'video');
    if(!video)return res.status(404).json({msg:'該視頻不存在！'})
    // 查看該視頻是否評論
        const {pageNum=1,pageSize=10}=req.body
    const comment = await VideoComments.findById({_id:commentId})
                                        
    if(!comment) return res.status(404).json({msg:"該視頻沒有該評論！"})
    console.log(comment.user,'comment.user');
       console.log(req.user._id,'req.user');
    if(!comment.user.equals(req.user._id)){
        return res.status(402).json({msg:"不能刪除其他人的評論"})
    }

    // 數據庫刪除該記錄
      await VideoComments.deleteOne({_id:commentId})
    //   視頻評論數-1
     const result = await Video.findById({_id:videoId})
           result.commentCount--
        result.save()
         res.status(200).json({msg:"刪除評論成功！"})

}

exports.likeVideo = async(req,res)=>{
    //  用戶資訊
    const userId = req.user._id
    // 視頻資訊
    const videoId = req.params.videoId
    // 視頻是否存在
    const video = await Video.findById({_id:videoId})
    if(!video){
        res.status(404).json({msg:"傳入了錯誤的視頻id！"})
    } else{
        
       // 該視頻的like記錄是否存在
       const record = await VideoLike.findOne({
        video:videoId,
        user:userId,
    })
       console.log(record,'record');
       if (!record){
        // 如果沒有記錄，就寫入數據
       await new VideoLike({
            user:userId,
            video:videoId,
            like:1
        }).save()
        // 視頻的like數加1
         video.like++
         video.save()
         return res.status(200).json({msg:'成功讚好視頻！',video})
       }else if(record.like === 1){
            // 如果有like過這條片，取消這條記錄
            await VideoLike.deleteOne({user:userId,video:videoId,like:1})
            video.like--
            video.save()
            return res.status(200).json({msg:'已經取消讚好視頻',video})
       }else if(record.like === -1 ){
            // 如果有unlike這條片，改成like
            record.like=1
            console.log(record,'record');
           await record.save()
        //    await VideoLike.deleteOne({usr:userId,video:videoId,like:-1})
            video.unlike--
            // await video.save()
            video.like++
           await video.save()
            return res.status(200).json({msg:'成功讚好視頻！!!',video})
       }
       
    }
    
    
}

exports.unlikeVideo = async(req,res)=>{
    //  用戶資訊
    const userId = req.user._id
    // 視頻資訊
    const videoId = req.params.videoId
    // 視頻是否存在
    const video = await Video.findById({_id:videoId})
    if(!video){
        res.status(404).json({msg:"傳入了錯誤的視頻id！"})
    } else{
        
       // 該視頻的unlike記錄是否存在
       const record = await VideoLike.findOne({
        video:videoId,
        user:userId,
    })
    //    console.log(record,'record');
       if (!record){
        // 如果沒有記錄，就寫入數據
       await new VideoLike({
            user:userId,
            video:videoId,
            like:-1
        }).save()
        // 視頻的unlike數加1
         video.unlike++
         video.save()
         return res.status(200).json({msg:'成功unlike視頻！',video})
       }else if(record.like === 1){
            // 如果有like這條片，改成unlike
            record.like=-1
            record.save()
            video.unlike++
            video.like--
            video.save()
            return res.status(200).json({msg:'成功unlike視頻！!',video})
       }else if(record.like === -1 ){
           

            // 如果有unlike過這條片，取消這條記錄
            await VideoLike.deleteOne({user:userId,video:videoId,like:-1})
            video.unlike--
            video.save()
            return res.status(200).json({msg:'已經取消unlike視頻',video})
       }
       
    }
    
    
}


