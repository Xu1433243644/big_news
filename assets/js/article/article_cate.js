$(function() {
  const layer = layui.layer
  loadCateList()
  
  // 加载分类列表
  function loadCateList() {
    $.ajax({
      method: 'GET',
      url:'/my/cate/list',
      success(res) {
        console.log(res);
        if (res.code !== 0) return layer.msg('获取文章分类列表成功!')
        const htmlStr = template('tpl-cate',res)
        $('tbody').append(htmlStr)
      }
    })
  }
})