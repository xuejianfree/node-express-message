var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/post-bar')
var db = mongoose.connection
db.on('error',(err)=>{console.log('数据库链接失败')})
db.on('open',()=>{console.log('数据库链接成功')})

// 数据模型
var Message = mongoose.model('messages', {
    connect: String,
    username: String,
    userphoto:String,
    ip: String,
    createTime: Date,
    upNumber: Number,
    downNumber: Number,
    replys: [{
        connect: String,
        question: String,
        username: String,
        userphoto:String,
        ip: String,
        createTime: Date,
    }]
})
// 导出
module.exports=Message