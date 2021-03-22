const logTime = name => {
    console.log(`Log... ${name}   ` + new Date().toLocaleDateString())
}

// 1.回调地狱
exports.callback = () => {
    setTimeout(() => {
        
        logTime('callback 1')

        setTimeout(() => {
            logTime('callback 2')

            setTimeout(() => {
                logTime('callback 3')

                setTimeout(() => {
                    logTime('callback 4')
                }, 100);
            }, 100);
        }, 100);
    }, 100); 
}

// 2.Propmise对象 串行操作，不出现回调地域
const promise = (name, delay = 100) => {
    // new Promise((resolve, reject) => {})
    return new Promise(resolve => {
        setTimeout(() => {
            logTime(name)
            resolve()
        }, delay);
    })
}

exports.promise = () => {
    promise('Promise 1')
        .then(promise('Promise 2'))
        .then(promise('Promise 3'))
        .then(promise('Promise 4'))
}

// 3.Generator函数：function * func()、yield、next()
function * func() {
    console.log('one')
    yield '12'
    console.log('two')
    yield '22'
    console.log('three')
    yield '32'

    console.log('four ' + (yield '666'))
    yield '42'

    console.log('five')
    yield '52'
}

exports.generator = () => {
    // const f = func()
   
    // console.log('next', f.next())
    // console.log('next', f.next())
    // console.log('next', f.next())
    // console.log('next', f.next())

    // console.log('next', f.next())

    // 通过迭代器
    // for...of循环可以自动遍历 Generator 函数运行时生成的Iterator对象，且此时不再需要调用next方法。
    // for(const [key, value] of func()){
    //     console.log(`${key}`, `${value}`)
    // }

    const generator = function * (name) {
        yield promise(name + 1)
        yield promise(name + 2)
        yield promise(name + 3)
    }

    // "协程"（coroutine），意思是多个线程互相协作，完成异步任务。
    let co = generator => {
        if(it = generator.next().value){
            it.then(res => {
                co(generator)
            })
        }else{
            return
        }
    }

    co(generator('Co-Generator'))
}

// 4.async-await函数
exports.asyncAwait = async () => {
    await promise('Async-Await1')
    await promise('Async-Await2')
    await promise('Async-Await3')
}
// 异步处理，就是不知道什么时候结束，串行异步：把异步按照同步一样顺序执行


// 5.事件监听方式
// 订阅什么时候结束。结束的话发出通知

// exports导出一个命名为event的函数
exports.event = async () => {
    // 生命一个叫asyncFun的方法
    const asyncFun = name => event => {
        // 方法内放置的是异步方法
        setTimeout(() => {
            logTime(name)
            event.emit('end')
        }, 100);
        return event
    }

    const ary = [
        asyncFun('Event1'),
        asyncFun('Event2'),
        asyncFun('Event3'),
    ]

    const { EventEmitter } = require('events');
    // 实例化
    const event = new EventEmitter()
    let i = 0
    event.on('end', () => i < ary.length && ary[i++](event))
    event.emit('end')
}