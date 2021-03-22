const Koa = require('koa');
const router = require('koa-router')();
const static = require('koa-static');
const app = new Koa()
const axios = require('axios');
const querystring = require('querystring');


app.use(static(__dirname + '/'))

const config = {
    client_id: 'fbc96a5329e11928090c',
    client_secret: '41cc41ebe0419be86515c010c0c9a45ba5f848ae '
}

// 1.重定向后端路径
router.get('/github/login', async ctx => {
    // 重定向到第三方服务器.
    let path = `https://github.com/login/oauth/authorize`
    path += `?client_id=${config.client_id}`
    // 1.重定向跳转到第三方服务器，请求他们的GitHub身份，第三方认证
    ctx.redirect(path)
})


// 实现注册时的回调地址
router.get('/auth/github/callback', async ctx => {
    // 2.用户通过GitHub认证，重定向回到您的站点即注册时的回调地址内，并且带上认证code
    // 认证通过走这个回调
     console.log('callback....回调成功');
     const { code } = ctx.query
     console.log('code', code);

    //  3.用此code申请访问令牌
    const params = {
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: code,
    }
    let ret = await axios.post('https://github.com/login/oauth/access_token',params)
    //获取到令牌
    const { access_token } = querystring.parse(ret.data)

    //通过令牌，获取用户信息 
    ret = await axios.get(`https://api.github.com/user?access_token=${access_token}`)
    console.log('user', ret);

    ctx.body = `
        <h1> Hello ${ret.user.login}</h1>
    `
})

app.use(router.routes())

app.listen(7001)