const router = require('koa-router')();
const JwtUtil = require('../token.js');
router.prefix('/api')
router.get('/token', async (ctx, next) => {
    let token = ctx.headers.authorization;
    console.log(ctx.headers)
    try {
        let jwt = new JwtUtil(token);
        let data = jwt.verifyToken();
        console.log(data)
        if (data == 'err') {
            throw Error
        } else {
            ctx.body = {
                state: 200,
                msg: '登录成功',
                data: ''
            }
            await next()
        }
    }
    catch (error) {
        ctx.body = {
            state: 403,
            msg: '登录已过期,请重新登录',
        }
    }

})


module.exports = router