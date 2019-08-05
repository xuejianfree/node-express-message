$('#register').click(function(){
    location.href = 'register.html'
})
$('form').submit(function(ev){
    ev.preventDefault()
    var data = $(this).serialize()
    $.post('/api/user/signin', data, function(res){
        if(res.code == 'success'){
            location.href = '/reveal'
        }
        else{
            $('.modal-body').text(res.message)
            $('.modal').modal('show')
            .on('hidden.bs.modal', function(e) {
                if(res.code == 'register error'){
                location.href = 'register.html'
            }else{
                location.reload()
            }
            })
        }
    })
})