const router = require('koa-router')();
let infoModel = require('../mysql.js');


router.prefix('/api')

router.post('/postArticle', async (ctx, next) => {
    console.log('111111111111111')
    let id = ctx.query.id
    let ImgUrl = ctx.query.imgurl
    let show = ctx.query.show
    let title = ctx.query.title
    let summary = ctx.query.summary
    let content = ctx.query.content
    let tag = ctx.query.tag

    try {
        let data = await infoModel.postArticle(id,ImgUrl, show, title, summary, content, tag)
        ctx.body = {
            state: 200,
            msg: '成功',
            data: data
        }
        console.log(data)
    } catch (error) {
        ctx.body = {
            state: 101,
            msg: error,
            data: []
        }
    }
})
module.exports = router