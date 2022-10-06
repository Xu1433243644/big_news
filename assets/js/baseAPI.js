$.ajaxPrefilter(function (config) {
  // 封装数据转换成json字符串的函数
  const format2Json = source => {
    const target = {}
    source.split('&').forEach(el => {
      let kv = el.split('=')
      target[kv[0]] = kv[1]
    })
    return JSON.stringify(target)
  }
  // 拼接时有顺序，不能使用+=
  config.url = 'http://big-event-vue-api-t.itheima.net' + config.url
  // 统一设置请求头
  config.contentType = 'application/json'
  // 统一设置请求的参数-post请求
  config.data = config.data && format2Json(config.data)
  // 统一设置请求头
  // indexOf startWith endWith includes
  if (config.url.includes('/my')) {
    // config里没有headers属性，自行添加。
    config.headers = {
      Authorization : localStorage.getItem('big_news_token')
    }
  }

  // 统一添加错误回调 或者 compel
  config.error = function (err) {
    if (err.responseJSON?.code === 1 && err.responseJSON?.message === '身份认证失败！') {
      localStorage.removeItem('big_news_token')
      location.href = '/login.html'
    }
  }
})