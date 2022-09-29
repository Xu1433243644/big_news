$.ajaxPrefilter(function(config){
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
  config.data = format2Json(config.data)
})