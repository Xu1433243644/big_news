const layer = layui.layer
$(function () {
  // 目的：确保dom渲染完毕之后请求数据
  getUserInfo()

  // 实现退出操作
  $('#btnLogout').on('click', function () {
    layer.confirm('请确认退出吗?', { icon: 3, title: '提示' }, function (index) {

      localStorage.removeItem('big_news_token')
      location.href = '/login.html'
      layer.close(index);
    })
  })
})

// 函数表达式虽然不会提升函数，但是异步任务调用，依旧先定义后调用
// 全局变量window 只能用var 和 function来写入全局变量window上
// 调用接口获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // 在baseAPI中统一处理
    /* headers: {
      Authorization: localStorage.getItem('big_news_token')
    }, */
    success(res) {
      if (res.code !== 0) return layer.msg(res.message)
      // 按需渲染头像
      renderAvatar(res)
    }
  })
}

const renderAvatar = (res) => {
  if (res.data.user_pic) {
    $('.text-avatar').hide()
    $('.user-info img').attr('src', res.data.user_pic).show()
  } else {
    $('.layui-nav-img').hide()
    // 显示文字头像，取username第一个字母
    const name = res.data.nickname || res.data.username
    // const char = name.charAt(0).toUpperCase()
    const char = name[0].toUpperCase()
    $('.text-avatar').html(char).show()
  }
  $('.text').html(`欢迎&nbsp;&nbsp;${res.data.username}`)
}