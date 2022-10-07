$(function () {
  const layer = layui.layer
  const form = layui.form

  // 初始化用户相关信息信息
  const initUserInfo = () => {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success(res) {
        if (res.code !== 0) return layer.msg('请求用户信息失败')
        // console.log(res);
        // 通过layui中的form.val()方法来统一赋值
        form.val('userForm', res.data)
      }
    })
  }
  // 获取用户相关信息
  initUserInfo()


  // 重置按钮
  $('#btnReset').on('click', function (e) {
    // 阻止默认行为
    e.preventDefault()
    // 重新加载用户相关信息
    initUserInfo()
  })
  //监听表单提交事件
  $('.layui-form').on('submit', function (e) {
    // 阻止默认行为
    e.preventDefault()
    // console.log(form.val('userForm'));
    $.ajax({
      method: 'PUT',
      url: '/my/userinfo',
      data: form.val('userForm'),
      
      success(res) {
        if (res.code !== 0) return layer.msg('用户更新信息失败！')
        // 刷新整体页面
        window.parent.getUserInfo()
        layer.msg('更新用户信息成功！')
      }
    })
  })
})
