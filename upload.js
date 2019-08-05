var multer = require('multer')
// 指定上传文件的位置
var storage = multer.diskStorage({
    // destination:目标、目的地，它表示文件存放的位置
    destination: 'wwwroot/uploads',
    // filename: 表示上传后的文件名
    filename: function(req, file, cb) {
        // 指定文件名
        var username = req.cookies.username
        // console.log(username)
            // cb(1,2)
            // 参数2 文件名，字符串类型
        cb(null, `${username}.jpg`)
    }
})
var uploads = multer({
    storage: storage
})

module.exports = uploads