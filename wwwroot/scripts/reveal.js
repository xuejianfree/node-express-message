// 读取"cookie"中的内容
var username = $.cookie('username')
console.log(username)

var i=$('.glyphicon-thumbs-up').length;
$('#number').html(i)

if(username){
    // 如果有用户登录则把用户名显示到页面上
    $('#user').find('span').last().text(username)
}
$.get('/',null,(res)=>{
    console.log(123)
})

// 注销
$('.navbar .dropdown-menu li').last().click(function(){
    $.get('/user/signout', null, function(res){
        if(res.code == 'success'){
            location.href = 'index.html'
        }
    })
})

// 留言
$('#adivseForm').submit(function(ev){
    ev.preventDefault()
    var data = $(this).serializeArray()
    data.push({
        name: 'username',
        value: username
    })
    $.post(
        '/api/user/advise',
        data,
        (res)=>{
            if (res.code == 'success') {
                // 刷新当前页面
                console.log(res);
                $('textarea').val('')
                location.reload()
            }else alert(res.message)          
        }
    )
})

// 评论
$('.reply').on('click','[suggestion]',function(){
    $.cookie('ID', $(this).attr('suggestion'))
    var Id = $.cookie('ID')
    console.log($.cookie('ID'))
    $(this).next().slideToggle()
    // 提交
    $(this).next().submit(function(ev){
    ev.preventDefault();
    var data = $(this).serializeArray()
    $.post(
        '/api/user/comment',            
        data,
        (res)=>{
            if (res.code == 'success') {
                // 刷新当前页面
                console.log('评论成功')
                $("input[name='connect']").val('')
                location.reload()
            }else alert(res.message)          
        }
    )
    })
})

// 点赞
$('.reply').on('click','.glyphicon',function(){
    $.cookie('ID', $(this).attr('suggestion'))
    console.log($.cookie('ID'))
    // var username = $.cookie('username')
    // console.log($.cookie('username'))
    var counter=[] 
    counter.push({
        name: 'ID',
        value: $(this).attr('suggestion')
    })
    if(($(this).attr('class') == 'glyphicon glyphicon-thumbs-up')){
        counter.push({
            name: 'counter',
            value: 'up'
        })
    }else{
        counter.push({
            name: 'counter',
            value: 'down',
        })
    }
    console.log(counter)
    $.post(
        '/api/user/counter',
        counter,
        (res)=>{
            if (res.code == 'success') {
                // alert('操作成功')
                // alert(res.message) 
                location.reload()
            }else alert(res.message)          
        }
    )
})

// 个人资料
$('.navbar .dropdown-menu li').first().click(function(){
    // location.href='user.html'
    // console.log(username)
    $.get(
        '/user/edit',
        null,
        (res)=>{
            if(res.code == 'success'){
                id=res.data
                console.log(id)
                console.log(typeof id)
                location.href = '/user/' + id
            }
        }
    )
})

