var exp = require('express')
var User = require('../mongoose')
var Message = require('../mongoodb')
var route = exp.Router()
// 退出
route.get(
    '/signout',
    (req, res) => {
        res.clearCookie('username')
        res.json({
            code: 'success'
        })
    })
// 个人资料
route.get(
    '/edit',
    (req, res) => {
        function send(code, message, data) {
            res.json({
                code,
                message,
                data
            })
        }
        var username = req.cookies.username
        User.find({
            username: req.cookies.username
        }).select('username').exec((err, data) => {
            if (err) {
                send('fail', '系统错误111')
            } else {
                data = data[0].id
                send('success', '成功', data)
            }
        })
    })
route.get(
    '/:id', 
    (req, res) => {
        User.findById(req.params.id, (err, data) => {
            if (err) {// 
            } else {
                // 渲染"编辑"页面
                res.render('user', {
                    users: data
                })
            }
        })
    })


module.exports = route