const router = require('koa-router')()
var NodeRSA = require('node-rsa')
var fs = require('fs')
var crypto = require('crypto');
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/set', async (ctx, next) => {
    var key = new NodeRSA({ b: 512 })
    key.setOptions({ encryptionScheme: 'pkcs1' })
    var privatePem = key.exportKey('pkcs1-private-pem')
    var publicPem = key.exportKey('pkcs1-public-pem')
    fs.writeFile('./pem/public.pem', publicPem, (err) => {
    if (err) throw err
    console.log('公钥已保存！')
    })
    fs.writeFile('./pem/private.pem', privatePem, (err) => {
    if (err) throw err
    console.log('私钥已保存！')
    })
})

module.exports = router
