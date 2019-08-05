var exp = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var multer = require('multer')
var User = require('./mongoose')
var Message = require('./mongoodb')
var template = require('art-template')
// 禁用模板缓存
template.config('cache',false)

var app = exp()


app.use(exp.static('wwwroot'))
app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.engine('html',template.__express)
app.set('view engine','html')


// 处理请求
app.use('/reveal',require('./routes/index'))
app.use('/api/user',require('./routes/api/user'))
app.use('/user',require('./routes/user'))

// 监听
app.listen(2828,()=>{console.log('server success')})