$('form').submit(function(ev) {
    ev.preventDefault();
    var data = new FormData(this)
    $.post({
        url: '/api/user/photo',
        data: data,
        contentType: false,
        // 表单的编码；类型如果为formdata，应该吧processData设置为false
        // 他的作用：不希望转换表单内容编码
        processData: false,
        success: (res) => {
            if (res.code == 'success') {
                location.href = '/reveal'
            } else {
                $('.modal-body').text('上传失败')
                $('.modal').modal('show')
            }
        }
    })
})