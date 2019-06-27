const router = require('koa-router')();
let infoModel = require('../mysql.js');
var NodeRSA = require('node-rsa')//rsa加密
var fs = require('fs')
const path = require('path');
var crypto = require('crypto')//md5加密
// const jwt = require('jsonwebtoken')//token
const JwtUtil = require('../token.js');
router.prefix('/api')
router.get('/cryptPwd', async (ctx, next) => {
    let username = ctx.query.uname
    let password = ctx.query.pwd
    // console.log(username, password)
    let file = ''
    await encrypt(password)
        .then(data => {
            file = data;
        })
    try {
        let data = await infoModel.cryptPwd(username, cryptPwd(file))
        if (data == '') {
            console.log('111')
            ctx.body = {
                state: 401,
                msg: '登录失败',
                data: []
            }
        } else if (data[0].password == cryptPwd(file)) {
            console.log(data.length)
            let uid = data[0]['id']
            let jwt = new JwtUtil({ uid });
            let token = jwt.generateToken();

            ctx.body = {
                state: 200,
                msg: '登录成功',
                data: {
                    token: token,
                    name: data[0]['name']
                }
            }
        }
    } catch (error) {
        ctx.body = {
            state: 404,
            msg: error,
            data: []
        }
    }

})

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}
function encrypt(pwd) {
    return new Promise((resolve, reject) => {
        fs.readFile('./pem/private.pem', (err, data) => {
            var key = new NodeRSA(data);
            let cipherText = key.encryptPrivate(pwd, 'base64');
            resolve(cipherText)
        });
    })
}


module.exports = router