// 1.对两个元素写js样式———————————————————————————————————————————
$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
})
// 2.表单验证——————————————————————————————————————————
// 引入layui的对象，和jQuery对象一样使用，layui是layui的一个对象
var form = layui.form;
form.verify({
    // 自定义了一个叫做 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败,则return一个提示消息即可
        var pwd = $('.reg-box [name=password]').val()
        if (pwd !== value) {
            return '两次密码不一致！'
        }
    }
})
// 3.ajax请求———————————————————————————————————————————
// 跟路径
// let baseUrl = 'http://ajax.frontend.itheima.net';
// function submitData(e) {
//     // a. 阻止默认的提交行为
//     e.preventDefault()
//     // b.获取表单数据
//     let dataStr = $(this).serialize();
//     // c.发送异步请求
//     $.ajax({
//         url: 'dataStr+/api/reguser',
//         method: 'POST',
//         data: dataStr,
// success: function (res) {
// 不论成功是否，都显示消息
//              layui.layer.msg(res.message);
// 注册出错
//             if (res.status !== 0) return；

//                 
//  注册成功
// $('#regForm')[0].reset()
// $('#link_login').click();
//清空注册表单

//             }
//         }
//     })
// }
// 3.ajax———————————————————————————————————————————
var layer = layui.layer;
// 监听注册表单的提交事件
$('#form_reg').on('submit', function (e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function (res) {
        if (res.status !== 0) {
            return layer.msg(res.message)
        }
        // 把注册成功后的用户名和密码直接给到登录框
        // let uname=$('.reg-box[name=username]').val().trim();
        // $('.login-box.[name=username]').val(uname);

        // let upwd=$('.reg-box[name=paddword]').val().trim();
        // $('login-box[name=password]').val(upad)

        layer.msg('注册成功，请登录！')
        // 模拟人的点击行为
        $('#link_login').click()
    })
})


// 监听登录表单的提交事件
$('#form_login').submit(function (e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
        url: '/api/login',
        method: 'POST',
        // 快速获取表单中的数据
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('登录失败！')
            }
            //这里layui的默认是3秒后返回数据，可以用layui的回调函数减少反应时间
            layer.msg('登录成功！')
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token)
            // 跳转到后台主页
            location.href = '/index.html'
        }
    })
})
