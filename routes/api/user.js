var exp = require('express')
var multer = require('multer')
var User = require('../../mongoose')
var Message = require('../../mongoodb')
var route = exp.Router()
var uploads = require('../../upload')
// 注册
route.post(
    '/register',
    (req, res) => {
        function send(code, message) {
            res.json({
                code,
                message
            })
        }
        req.body.ip = req.ip
        req.body.createTime = new Date()
        req.body.updateTime = req.body.createTime
        req.body.userphoto = '../uploads/'+req.body.username+'.jpg'
        User.find({
            username: req.body.username
        }).select('username').exec((err, data) => {
            if (err) {
                send('fail', '系统错误101')
            } else {
                if (data.length == 0) {
                    new User(req.body).save((error) => {
                        if (error) {
                            send('fail', '注册失败')
                        } else send('success', '注册成功')
                    })
                } else send('register error', '该用户已注册')
            }
        })
    })

// 登陆
route.post(
    '/signin',
    (req, res) => {
        function send(code, message) {
            res.json({
                code,
                message
            })
        }
        User.find({
                username: req.body.username
            })
            .select('username password')
            .exec((err, data) => {
                if (err) {
                    send('err', '系统错误102')
                } else {
                    if (data.length == 0) {
                        send('register error', '该用户未注册')
                    } else {
                        // console.log(data[0])
                        if (data[0].toObject().password == req.body.password) {
                            res.cookie('username', req.body.username);
                            send('success', '开始你的奇幻之旅吧!')
                        } else send('signin error', '密码错误，请重新输入!')
                    }
                }
            })
    })
// 留言
route.post(
    '/advise',
    (req, res) => {
        function send(code, message) {
            res.json({
                code,
                message
            })
        }
        // console.log(req.body)
        req.body.ip = req.ip
        req.body.createTime = new Date()
        req.body.userphoto = '../uploads/'+req.body.username+'.jpg'
        new Message(req.body).save((error) => {
            if (error) {
                send('fail', '留言失败')
            } else send('success', '留言成功')
        })
    })
// 评论
route.post(
    '/comment',
    (req, res) => {
        var username = req.cookies.username

        function send(code, message) {
            res.json({
                code,
                message
            })
        }
        req.body.username = username
        req.body.ip = req.ip
        req.body.createTime = new Date()
        req.body.userphoto = '../uploads/'+req.body.username+'.jpg'
        req.body.question = req.cookies.ID
        // console.log(req.body)
        Message.findByIdAndUpdate(req.body.question, {
            $push: {
                replys: req.body
            }
        }, (err, data) => {
            // console.log(data)
            send('success', '评论成功')
        })
    })
// 点赞
route.post(
    '/counter',
    (req, res) => {
        var Id = req.body.ID

        function send(code, message) {
            res.json({
                code,
                message
            })
        }
        if (req.body.counter == 'up') {
            Message.find({
                _id: req.body.ID
            }).select('upNumber').exec((err, data) => {
                if (err) {
                    send('fail', '系统错误103')
                } else {
                    if (!data[0].upNumber) {
                        Message.findByIdAndUpdate(req.body.ID, {
                            upNumber: 1
                        }, (err, data) => {
                            if (err) send('fail', '系统错误104')
                            else send('success', '你点了顶1!')
                        })
                    } else {
                        var datt = data[0].upNumber
                        datt++
                        Message.findByIdAndUpdate(req.body.ID, {
                            upNumber: datt
                        }, (err, data) => {
                            if (err) send('fail', '系统错误105')
                            else send('success', '你点了顶2!')
                        })
                    }
                }
            })
        } else {
            Message.find({
                _id: req.body.ID
            }).select('downNumber').exec((err, data) => {
                if (err) {
                    send('fail', '系统错误106')
                } else {
                    if (!data[0].downNumber) {
                        Message.findByIdAndUpdate(req.body.ID, {
                            downNumber: 1
                        }, (err, data) => {
                            if (err) send('fail', '系统错误107')
                            else send('success', '你点了踩1!')
                        })
                    } else {
                        var datt = data[0].downNumber
                        datt++
                        Message.findByIdAndUpdate(req.body.ID, {
                            downNumber: datt
                        }, (err, data) => {
                            if (err) send('fail', '系统错误108')
                            else send('success', '你点了踩2!')
                        })
                    }
                }
            })
        }
    })
// 个人资料
route.post(
    '/edit',
    (req, res) => {
        function send(code, message) {
            res.json({
                code,
                message
            })
        }
        req.body.ip = req.ip
        req.body.updateTime = new Date
        // console.log(req.body)
        User.findByIdAndUpdate(req.body.id, req.body, (err) => {
            if (err) {
                res.json({
                    code: 'error',
                    message: '系统错误112'
                })
            } else res.json({
                code: 'success',
                message: '成功'
            })
        })
    })

// 修改头像
route.post(
    '/photo',
    uploads.single('photo'),
    (req, res) => {
        console.log('开始上传')
        res.json({
            code: 'success',
            message: '上传成功'
        })
    })

module.exports = route