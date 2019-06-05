const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const getArticleInfo = require('./routes/getArticleInfo')
const getArticle = require('./routes/getArticle')
const postArticle = require('./routes/postArticle')
const updateShow = require('./routes/updateShow')
const updateArticle = require('./routes/updateArticle')

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

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(getArticleInfo.routes(), getArticleInfo.allowedMethods())//获取所有文章详情
app.use(getArticle.routes(), getArticle.allowedMethods())//根据id获取文章详情
app.use(postArticle.routes(), postArticle.allowedMethods())//发送文章
app.use(updateShow.routes(), updateShow.allowedMethods())//更改文章显示
app.use(updateArticle.routes(), updateArticle.allowedMethods())//更新文章

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
