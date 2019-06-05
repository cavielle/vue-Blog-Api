const router = require('koa-router')();
let infoModel = require('../mysql.js');


router.prefix('/api')

router.put('/updateShow', async (ctx, next) => {
     let id = ctx.query.id
     let show = ctx.query.show
    try {
        let data = await infoModel.updateShow(id,show)
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