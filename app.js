const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const JwtUtil = require('./token.js');

const index = require('./routes/index')
const users = require('./routes/users')
const getArticleInfo = require('./routes/getArticleInfo')
const getArticle = require('./routes/getArticle')
const postArticle = require('./routes/postArticle')
const updateShow = require('./routes/updateShow')
const updateArticle = require('./routes/updateArticle')
const cryptPwd = require('./routes/cryptPwd')
const tokens = require('./routes/token')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})



//验证token
app.use(async (ctx, next) => {
  let { url = '' } = ctx
  console.log(url)

  console.log(url.indexOf('/api/getArticleInfo') > -1)

  if ((url.indexOf('/postArticle') > -1)||(url.indexOf('/updateArticle') > -1)||(url.indexOf('/updateShow') > -1)) {
    let token = ctx.headers.authorization;
    console.log(ctx.header.authorization)
    let jwt = new JwtUtil(token);
    let result = jwt.verifyToken();
    // // 如果考验通过就next，否则就返回登陆信息不正确
    console.log(result +'-----------')
    console.log((result == 'err'))
    if (result == 'err') {
      console.log(result);
      ctx.body = {
        state: 403,
        msg: '登录已过期,请重新登录',
      }
      // ctx.render('login.html');
    }
    else {
      await next();
    }
  } else {
    await next();
  }
})




// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(getArticleInfo.routes(), getArticleInfo.allowedMethods())//获取所有文章详情
app.use(getArticle.routes(), getArticle.allowedMethods())//根据id获取文章详情
app.use(postArticle.routes(), postArticle.allowedMethods())//发送文章
app.use(updateShow.routes(), updateShow.allowedMethods())//更改文章显示
app.use(updateArticle.routes(), updateArticle.allowedMethods())//更新文章
app.use(cryptPwd.routes(), cryptPwd.allowedMethods())//login密码加密
app.use(tokens.routes(), tokens.allowedMethods())//检验token是否正确

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
