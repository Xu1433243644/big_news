$(function() {
  // 点击去注册
  $('#go2Reg').on('click',function () {
    $('.login-wrap').hide()
    $('.reg-wrap').show()
  })
  // 点击去登录
  $('#go2Login').on('click',function () {
    $('.reg-wrap').hide()
    $('.login-wrap').show()
  })

  // 需要从layui对象身上获取form
  const form = layui.form
  const layer = layui.layer
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    // 校验两次密码是否一致
    repwd:function(value) {
      const password = $('.reg-wrap [name=password]').val()
      if (password !== value) {
        return '两次密码不一致，请重新输入！'
      }
    }
  })

  
  // 注册验证
  $('#formReg').on('submit',function(e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reg',
      data:$(this).serialize(),
      success(res){
        if(res.code !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功！')
        $('#go2Login').trigger('click')
      }
    })
  })

  // 登录验证
  $('#formLogin').on('submit',function(e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data:$(this).serialize(),
      success(res){
        if(res.code !== 0) {
          return layer.msg(res.message)
        }
        localStorage.setItem('big_news_token',res.token)
        // token是令牌的意思：Bearer token字符串的格式显示那个登录失败的笑脸
        layer.msg('登录成功！')
        location.href = '/index.html'
      }
    })
  })

})