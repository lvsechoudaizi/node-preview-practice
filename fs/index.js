// 文件系统：所有的文件系统操作都具有同步的、回调的、以及基于 promise 的形式。
const fs = require('fs');
const fs_promises = require('fs').promises;
const path = require('path');

const filename = __dirname + '/test.js'
const dirname = __dirname



//异步的形式总是把完成回调作为其最后一个参数。 传给完成回调的参数取决于具体方法，但第一个参数总是预留给异常。 如果操作被成功地完成，则第一个参数会为 null 或 undefined。 
// fs.unlink(path, callback) 异步地删除文件或符号链接
// fs.unlink(filename, (err) => {
//     if(err) throw err
//     console.log('已成功地删除文件')
// })

const testFile = () => {
    // 同步的形式会阻塞 Node.js 事件循环和进一步的 JavaScript 执行，直到操作完成。 异常会被立即地抛出，可以使用 try…catch 处理，也可以冒泡。
    try {
        console.log('filename', filename)
        if(fs.existsSync(filename)){
            console.log('文件已经存在')
        }else{
            console.log('文件不存在，需要创建文件')
            fs.writeFileSync(filename, 'hello')
            console.log('文件创建成功')
        }
    } catch (error) {
        console.log('文件同步处理出现错误')
    }

    // promise的形式
    // (async function(path) {
    //     try {
    //         console.log('path', path)
    //         await fs_promises.unlink(path)
    //         console.log('promise形式，已成功地删除文件')
    //     } catch (error) {
    //         console.log(`出错了： ${error}`)
    //     }
    // })(filename)
}


const dir = fs.opendir(dirname, () => {
    console.log('opendir：异步地打开目录,创建了fs.Dir 类')
})

async function print(path) {
    // 创建一个 fs.Dir类
    const dir = await fs_promises.opendir(path)
    console.log('async', dir.path)
    // 读取完成之后，则会返回 Promise（resolve 时会传入 fs.Dirent 或 null（如果读取不到目录项））
    // const dirent = dir.read().then((res) => {
    //     // fs.Dirent
    //     console.log('res', res.isDirectory(), res.isFile(), res.name)
    // })

    for await (const it of dir) {
        // 遍历读取，返回的fs.Dirent 类
        console.log(it,it.name,it.isFile());
      }

    // 返回：fs.Dirent 类
    //   const dirent = await fs_promises.readdir(path)
    //   console.log('async-dirent', dirent)
    //   if(dirent.isFile()){
    //     console.log(`${dirent}是文件`)
    //   }
    //   for await (const dirent1 of dirent) {
    //       if(dirent1.isFile()){
    //           console.log(`${dirent1}是文件`)
    //       }else if(dirent1.isDirectory){
    //         console.log(`${dirent1}是目录`)
    //       }
    //     console.log(dirent1);
    //   }
}


print(dirname)

// testFile()
// sss 

// fs.watch(filename[, options][, listener])
// filename 是文件或目录
// 第二个参数是可选的。 如果 options 传入字符串，则它指定 encoding。 否则， options 应传入对象
// 监听器回调有两个参数 (eventType, filename)。 eventType 是 'rename' 或 'change'， filename 是触发事件的文件的名称
fs.watch(filename, {}, (eventType, filename) => {
    console.log(111)
    if(filename){
        console.log('file', filename)
    }
})
// fs.stat(path[, options], callback) 异步就会有回调
//  回调有两个参数 (err, stats)，其中 stats 是 fs.Stats 对象
fs.stat(filename, (err, stats) => {

})
// fs.appendFile(path, data[, options], callback)
// 异步地追加数据到文件，如果文件尚不存在则创建文件
fs.appendFile(filename, (err) => {

})

// fs.copyFile(src, dest[, mode], callback)
// 异步地将 src 拷贝到 dest。 默认情况下，如果 dest 已经存在，则覆盖它
fs.copyFile(fileSrc = './', targetDest= './' ,() => {

})