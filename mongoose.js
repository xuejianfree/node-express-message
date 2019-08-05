var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/post-bar')
var db = mongoose.connection
db.on('error',(err)=>{console.log('数据库链接失败')})
db.on('open',()=>{console.log('数据库链接成功')})

// 数据模型
var User = mongoose.model('users', {
    username: String,
    password: Number,
    isMale: Boolean,
    age: Number,
    phone: String,
    email: String,
    hobby: String,
    ip: String,
    userphoto:String,
    createTime: Date,
    updateTime:Date,
    description:String,
})

// 导出
module.exports=User