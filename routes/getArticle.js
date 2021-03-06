const router = require('koa-router')();
let infoModel = require('../mysql.js');


router.prefix('/api')

router.get('/getArticle', async (ctx, next) => {
    let id = ctx.query.id
    try {
        let data = await infoModel.getArticle(id)
        ctx.body = {
            data
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