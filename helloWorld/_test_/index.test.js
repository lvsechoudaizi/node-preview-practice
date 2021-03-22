
test('测试hello Word', () => {
    // ret === return
    const ret = require('../index'); 
    // 1.如果只是console.log相当于人工的方式进行辨识是否正确
    // console.log('====================================');
    // console.log('helloWorld', helloworld);
    // console.log('====================================');
    // 2.所以使用expect() 断言 toBe('XX' == ret 这通过，否则失败) 
    expect(ret).toBe('Hello World!')
    // 【测试驱动代码调试】
    // 3.该测试方式可以快速定位错误,代码会更干净简洁、测试用例随时检验测试的方法变量
});