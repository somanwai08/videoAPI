const {redis} =require('./index')

exports.hotInc = async (videoId,incNum)=>{
  
    let hasScore = await redis.zscore('videohots',videoId)

    let inc
    if(hasScore){
        // 如果有序集合有這條記錄，就增加熱度
      inc =  await redis.zincrby('videohots',incNum,videoId)
    }else{
        //   如果沒有記錄，就新增記錄
      inc = await redis.zadd('videohots',incNum,videoId)
    }

     return inc
}

exports.topHots = async(num)=>{

     let rank =  await redis.zrevrange('videohots',0,-1,'withscores')
    //  console.log(rank,'rank');
     const newRank = rank.slice(0,2*num)
     let obj={}
     for(let i=0;i<newRank.length;i++){
      if(i%2===0){
        obj[newRank[i]]=newRank[i+1]
      }
     }

     return obj

}