
const fs = require('fs') 

// 当有个src的时候自动产生一个测试用例

test('集成测试，测试生成测试代码文件', () => {
    // 准备环境
    // 删除测试文件夹 
    fs.rmdirSync(__dirname + '/data/_test_', {
        recursive: true
    })

    const src = new (require('../index'))()
    src.genJestSource(__dirname + '/data')

});

// test('测试测试代码生成', () => {
//     const src = new (require('../index'))()
//     const ret = src.getTestSource('func', 'class.js', true)
//     console.log('ret', ret)
//     expect(ret).toBe(`
//         test('TEST func', () => {
//                 const {func} = require('../class.js')
//                 const ret = func()
//                 // expect(ret).toBe('')
//         })
//         `)
// });

// test('测试类的解构', () => {
//     const { d } = require('../index')
//     console.log('ddd', d())
// });

// test('测试文件名生成', () => {
//     const src = new (require('../index'))()
//     const ret = src.getTestFileName('/abc/class.js')
//     console.log('getTestFileName', ret)
//     expect(ret).toBe('/abc/_test_/class.test.js')
// });