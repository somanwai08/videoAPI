const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const router = require('./router')

// 解析客戶端發送過來的json文件
app.use(express.json())
// 解析客戶端發送過來的urlencoded格式數據
app.use(express.urlencoded())
// 支持跨域請求
app.use(cors())
// 關於日誌記錄的中間件
app.use(morgan('dev'))
app.use('/api/v1',router)


const PORT = process.env.PORT||3000


app.listen(PORT,()=>{
    console.log((`server running at http://localhost:${PORT}`));
})