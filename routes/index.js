var exp = require('express')
var User = require('../mongoose')
var Message = require('../mongoodb')
var formatTime = require('../formatTime')
var route = exp.Router()
// 显示
route.get(
    '/',
    (req, res) => {
        Message.find().select('connect username _id createTime upNumber userphoto downNumber replys')
            .exec((error, data) => {
                if (error) {
                    console.log('fail','系统错误110')
                } else {
                    // console.log(data);
                    res.render('reveal',
                   {messages: data.reverse()}
                )
                }
            })
    })
    module.exports = route