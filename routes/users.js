const router = require('koa-router')();
let infoModel = require('../mysql.js');

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/blog', async (ctx, next) => {

  await infoModel.blogtest().then((res) => {
    ctx.body = {
      state: 0,
      msg: '成功',
      data: res
    }
  })


})
module.exports = router
