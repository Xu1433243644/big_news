$(function () {
  const layer = layui.layer
  const form = layui.form
  loadCateList()

  // 加载分类列表
  function loadCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/cate/list',
      success(res) {
        if (res.code !== 0) return layer.msg('获取文章分类列表成功!')
        const htmlStr = template('tpl-cate', res)
        $('tbody').empty().append(htmlStr)
      }
    })
  }

  let indexAdd = null
  // 点击出现弹出层
  $('#btnAdd').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      title: '添加分类名称',
      area: ['500px', '260px'],
      content: $('#dialogAdd').html()
    })
  })
  let isEdit = false
  // 需要通过委托的方式（你要监听的元素，是后来的动态创建的）
  $('body').on('submit', '#formAdd', function (e) {
    // 阻止默认提交动作
    e.preventDefault()
    // 判断弹出层是添加状态还是编辑状态
    if (isEdit) {
      $.ajax({
        method: 'PUT',
        url: '/my/cate/info',
        data: $('#formAdd').serialize(),
        success(res) {
          if (res.code !== 0) return layer.msg('修改分类失败！')
          layer.msg('修改分类成功！')
          // 因为是异步操作，如果写在后面，会造成先刷新后加载数据
          loadCateList()
        }
      })
    } else {
      $.ajax({
        method: 'POST',
        url: '/my/cate/add',
        data: $('#formAdd').serialize(),
        success(res) {
          if (res.code !== 0) return layer.msg('添加分类失败！')
          layer.msg('添加分类成功！')
          // 因为是异步操作，如果写在后面，会造成先刷新后加载数据
          loadCateList()
        }
      })
    }
    // 恢复默认状态
    isEdit = false
    layer.close(indexAdd)


  })

  // 需要通过代理的编辑按钮添加点击事件
  $('tbody').on('click', '.btnEdit', function () {
    // 判断此时处于编辑状态
    isEdit = true
    // console.log('修改了',$(this).attr('data-id'));
    indexAdd = layer.open({
      type: 1,
      title: '修改分类名称',
      area: ['500px', '260px'],
      content: $('#dialogAdd').html()
    })

    const id = $(this).attr('data-id')
    // 需要回显表单

    $.ajax({
      method: 'GET',
      url: `/my/cate/info?id=${id}`,
      success(res) {
        if (res.code !== 0) return layer.msg('获取分类详情失败')
        // 快速为表单赋值
        form.val('addFormFilter', res.data)
      }

    })
  })

  // 删除数据
  $('tbody').on('click', '.btnDelete', function () {
    const result = confirm('您确定要删除该分类吗？')
    const id = $(this).attr('data-id')
    if (result) {
      $ajax({
        method: 'DELETE',
        url: `/my/cate/del?${id}`,
        success(res) {
          if (res.data !== 0) return layer.msg('删除分类详情失败')
          layer.msg('删除分类详情成功')
          // 重新加载列表
          loadCateList()
        }
      })
    }
  })
})