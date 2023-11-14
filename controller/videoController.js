exports.videoList = async (req,res)=>{
    console.log(req.method);
    res.send('/videoList')
}

exports.playList = async (req,res)=>{
    console.log(req.method);
    // JSON.parse(')')
    res.send('/playList')
}