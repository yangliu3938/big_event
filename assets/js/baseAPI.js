// $的对象的一个方法——————预处理过滤器，在页面基于$发起每次的ajax请求，都经过这个处理


// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象———就是想ajax整个对象的url，说明ajax也是一个封装的对象。
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})