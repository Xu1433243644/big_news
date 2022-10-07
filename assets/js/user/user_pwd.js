$(function () {
  const layer = layui.layer
  const form = layui.form
  
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    // 校验新密码和旧密码是否一致
    samePwd:function(value) {
      if (value === $('[name=old_pwd]').val()) {
        return '新旧密码不能一致！'
      }
    },
    // 校验两次密码是否一致
    repwd:function(value) {
      if (value !== $('[name=new_pwd]').val()) {
        return '两次密码不一致，请重新输入！'
      }
    }
  })

  // 监听表单的提交事件
  $('.layui-form').on('submit',function (e) {
    e.preventDefault()

    $.ajax({
      method: 'PATCH',
      url:'/my/updatepwd',
      data: form.val('userForm'),
      success(res) {
        if(res.code !== 0) return layer.msg('修改密码失败！')
        layer.msg('修改密码成功！')
        // 清空表单 dom元素的reset方法
        $('.layui-form')[0].reset()
      }

    })
  })
})
