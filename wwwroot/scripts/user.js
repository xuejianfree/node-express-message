$('form').submit(function(ev) {
    ev.preventDefault()
    var id = $(this).attr('id')
    var pass = $(':password').map(function() {
        return $(this).val()
    })

    if (pass[0] == pass[1]) {
        $('.modal-body').text('两次输入的密码不能相同！')
        $('.modal').modal('show')
    } else {
        console.log('输入密码不相同，准备提交数据')
        var data = $(this).serializeArray()
        data.push(
            {
                name:'id',
                value:id
            }
        )
        console.log(data)

        $.post('/api/user/edit', data, function(res) {
            console.log(res)

            $('.modal-body').text(res.message)
            $('.modal').modal('show')
                .on('hidden.bs.modal', function(e) {
                    if (res.code == 'success') {
                        location.href = '/reveal'
                    }
                })
        })
    }
})