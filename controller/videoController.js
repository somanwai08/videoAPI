const {Video}=require('../model/index')

exports.videoList = async (req,res)=>{
    console.log(req.method);
    res.send('/videoList')
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