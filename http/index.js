// http缓存机制

// web缓存： 浏览器加载html页面时，外部资源js/img/css都会进行加载
// 提高加载速度，优化用户体验
// 缓存好理解，但是什么时候更新，更新策略更为复杂

// 1.强缓存策略：不需要请求服务器，从本地副本读取
// http 1.0
// a.设置头部信息expires缓存字段，
// setHeader('Expires', new Data() + 1)
// http 1.1
// b.cache-control
//  常见 = no-cache 不需要强缓存，需要使用协商缓存确定缓存

// 2.协商缓存：访问本地缓存直接验证，会去请求服务器验证资源是否更新，没更新则304,本地问服务器是否更新
// a.last-modified /if-modified-Since  基于时间的
// b.etag / if-None-Match 基于内容的

const http = require('http');

const updataTime = () => {
    this.timer = this.timer || setInterval(() => {
        this.time = new Date().toLocaleTimeString()
    }, 5000);
    return this.time
}

http.createServer((req, res) => {
    const {url} = req
    if('/' === url){
        res.end(`
        <html>
            Html Updata Time ${updataTime()}
            <script src='main.js'></script>
        </html>
        `)
    }else if(url === '/main.js'){
        const content = `document.writeln('<br/> JS Update Time: ${updataTime()}')`
        // 强缓存
        // 设置了缓存时间10秒钟
        // res.setHeader('Expires', new Date(Date.now() + 10 *1000).toUTCString())
        // 设置缓存20秒后过期
        // res.setHeader('Cache-Control', 'max-age=20')

        // 协商缓存
        res.setHeader('Cache-Control', 'no-cache')
        // res.setHeader('last-modified', new Date().toUTCString())
        // if(new Date(req.headers['if-modified-since']).getTime() + 3 *1000 > new Date()){
        //     console.log('协商缓存命中')
        //     res.statusCode = 304
        //     res.end()
        //     return
        // }

        // crypto 模块提供了加密功能，包括对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装。
        const crypto = require('crypto');
        // crypto.createHash() 方法用于创建 Hash 实例
        const hash = crypto.createHash('sha1').update(content).digest('hex')
        res.setHeader('Etag', hash)
        if(req.headers['if-none-match'] === hash){
            console.log('Etag协商缓存命中')
            res.statusCode = 304
            res.end()
            return
        }
        res.statusCode = 200
        res.end(content)
    }else if(url === '/favicon.ico'){
        res.end('')
    }
}).listen(3000, () => {
    console.log('HTTP cache Test Run at ' + 3000)
})