const router = require('koa-router')();
let infoModel = require('../mysql.js');


router.prefix('/api')

router.get('/getArticleInfo', async (ctx, next) => {
    // let key = ctx.query.id
    try {
        let data = await infoModel.getArticleInfo()
        ctx.body = {
            state: 200,
            msg: '成功',
            data: data
        }
    } catch (error) {
        ctx.body = {
            state: 0,
            msg: error,
            data: []
        }
    }
})

module.exports = router