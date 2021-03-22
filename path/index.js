// 路径
const path = require('path');

// CommonJS 模块
// 1.在 Node.js 模块系统中，每个文件都被视为一个独立的模块

// 2.赋值给 `exports` 不会修改模块，必须使用 `module.exports`。

// 模块作用域

// 3.__dirname :获取当前模块的目录名
// E:\private_space\kaikeba\project\node-preview-lesson\path
console.log('__dirname', __dirname) 

// 4.__filename 当前模块的文件名。 这是当前的模块文件的绝对路径
// E:\private_space\kaikeba\project\node-preview-lesson\path\index.js
console.log('__filename', __filename) 

// 5. exports :对于 module.exports 的更简短的引用形式
class MyModuleClass{
    constructor(){
        console.log('1111,MyModuleClass')
    }

    set(name){
        console.log(name)
    }
}

class MyClass{
    constructor(){
        console.log('222, MyClass')
    }
}
// module.exports 用于指定一个模块所导出的内容，即可以通过 require() 访问的内容
// 其他js通过const XX = require('../XX')调用
module.exports = MyModuleClass

exports.f = 'hello'


// path 模块

const filename = __filename

console.log('当前的模块文件的绝对路径', filename)

// path.basename(path[, ext]) 
// ext 可选的文件扩展名
const basename = path.basename(filename)
console.log('basename:返回 path 的最后一部分', basename)

const basenameExt = path.basename(filename, '.js')
console.log('basename:ext 可选的文件扩展名', basenameExt)

// 'E:\\private_space\\kaikeba\\project\\node-preview-lesson\\path\\index.js'
const delimiter = filename.split(path.delimiter) 
console.log('delimiter:提供平台特定的路径定界符', delimiter)

const dirname = path.dirname(filename)
console.log('dirname:返回 path 的目录名', dirname)

const extname = path.extname(filename)
console.log('extname:返回 path 的扩展名', extname)

// path.format(pathObject) 方法从对象返回路径字符串
// 当为 pathObject 提供属性时，注意以下组合，其中一些属性优先于另一些属性：
// 如果提供了 pathObject.dir，则忽略 pathObject.root。
// 如果 pathObject.base 存在，则忽略 pathObject.ext 和 pathObject.name。
// const format = path.format({
//     dir: '',
//     root: '',
//     base: '',
//     name: '',
//     ext: ''
// })

// 如果提供了 `dir`、 `root` 和 `base`，
// 则返回 `${dir}${path.sep}${base}`。
// `root` 会被忽略。
const formatDir = path.format({
    root: '/ignored',
    dir: '/home/user/dir',
    base: 'file.txt'
});  
console.log('formatDir', formatDir)
// 返回: '/home/user/dir/file.txt'

// 如果未指定 `dir`，则使用 `root`。 
// 如果只提供 `root`，或 'dir` 等于 `root`，则将不包括平台分隔符。 
// `ext` 将被忽略。
const formatRoot = path.format({
    root: '/',
    base: 'file.txt',
    ext: 'ignored'
  });
  console.log('formatRoot', formatRoot)
  // 返回: '/file.txt'

  
  // 如果未指定 `base`，则使用 `name` + `ext`。
const formatNameExt = path.format({
    root: '/',
    name: 'file',
    ext: '.txt'
  });
  console.log('formatNameExt', formatNameExt)
  // 返回: '/file.txt'

  const isAbsolute = path.isAbsolute(filename)
  console.log('isAbsolute:检测 path 是否为绝对路径', isAbsolute)

//   path.join([...paths])
const joinPath = path.join('目录1', '目录2', 'dir', 'base')
console.log('joinPath:方法会将所有给定的 path 片段连接到一起（使用平台特定的分隔符作为定界符），然后规范化生成的路径', joinPath)

const normalize = path.normalize(formatDir)
console.log('normalize规范化给定的 path', normalize)

const parse = path.parse(formatDir)
console.log('parse', parse)

console.log('sep提供平台特定的路径片段分隔符', path.sep)