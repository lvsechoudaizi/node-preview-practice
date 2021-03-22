const path = require('path');
const fs = require('fs');

module.exports = class TestNow{

    genJestSource(sourcePath = path.resolve('./')){
        // 查看测试路径是否存在，不存在则创建
        const testPath = `${sourcePath}/_test_`
        if(!fs.existsSync(testPath)){
            fs.mkdirSync(testPath)
        }

        // 遍历代码
        let list = fs.readdirSync(sourcePath)
        console.log('list', list)
        list
            //当前只读取到文件名，拼接完整路径
            .map( v => `${sourcePath}/${v}`)
            // 过滤文件,判断文件是不是文件或者文件夹,过滤掉文件夹
            .filter( v => fs.statSync(v).isFile()) 
            // 排除测试代码
            .filter( v => v.indexOf('.test') === -1)
            // 依次生成测试文件
            .map(v => this.genTestFile(v))
    }

    genTestFile(filename){
        console.log('filename', filename)
        const testFileName = this.getTestFileName(filename)

        // 判断此文件是否存在
        if(fs.existsSync(testFileName)){
            console.log('该测试代码已经存在',testFileName)
            return
        }
        console.log('-----------------', filename);
        const mod = require(filename)
        let source 
        if(typeof mod === 'object'){
            source = Object.keys(mod)
                .map(v => this.getTestSource(v, path.basename(filename), true))
                .join('\n')
        }else if(typeof mod === 'function'){
            const basename = path.basename(filename)
            source = this.getTestSource(basename.replace('.js', ''), basename)
        }
        fs.writeFileSync(testFileName, source)
    }

    /** 
     * 生成测试代码
     * @param methodName 方法名
     * @param classFile 引入的文件路径 require(path)
     * @param isClass 是否是class,决定导出的东西，是否需要解构 new class()
     */
    getTestSource(methodName, classFile, isClass = false){
        console.log('getTestSource', methodName)
        // 组装测试代码的模板,例如
        // test('测试文件名生成', () => {
        //     const ret = new (require('../index'))()
        //     expect(ret).toBe('/abc/_test_/class.test.js')
        // });
        return `
        test('${'TEST ' + methodName}', () => {
                const ${ isClass ? '{' + methodName + '}' : methodName} = require('${'../' + classFile}')
                const ret = ${methodName}()
                // expect(ret).toBe('')
        })
        `
    }
    /**
     * 生成测试文件名
     * @param {*} filename 文件名称
     */
    getTestFileName(filename){
        // filename = /abc/class.js
        // path.dirname(path) 返回path的目录名
        const dirname = path.dirname(filename)
        console.log('dirname', dirname) // = /abc
         // path.basename(path) 返回path的最后一部分
        const basename = path.basename(filename)
        console.log('basename', basename) // = /class.js
        // path.extname(path) 会返回 path 的扩展名
        const extname = path.extname(filename)
        console.log('extname', extname) // = .js
        // 现在需要把filename 转换为测试方法名/abc/_test_/class.test.js
        // 获取class.test.js
        const testname = basename.replace(extname, '.test'+extname)
        console.log('testname', testname)
        // 组装成/abc/_test_/class.test.js
        // path.format(pathObject)
        return path.format({
            root: dirname + '/_test_/',
            base: testname
        })
    }
}