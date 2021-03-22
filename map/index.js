const menu = [
    {
        name: '张三',
        age: 23
    },
    {
        name: '李四',
        age: 25
    },
    {
        name: '王五',
        age: 34
    },
    {
        name: '赵四',
        age: 37
    },
]

const newMenu = []

// console.log('循环前')

const asyncFunc = item => {
    // 返回一个 Promise 是一个对象， 生成Promise实例
    // Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果
    return new Promise((resolve) => {
        setTimeout(() => {
            if(item.age === 23){
                newMenu.push({ ...item, adult: true})
                console.log('当前是23年龄的人', item.name)
            }else{
                newMenu.push({ ...item, adult: false})
                console.log('不是23年龄的人')
            }
            resolve()
        }, 1000);
    })
}

// map方法是同步，map方法内如果是异步，会先跳过
// menu.map(item => {
//     console.log('进入map中了')
//     asyncFunc(item)
// })

// 通过map循环不能将异步转同步
// const executeEach = async () => {
//     console.log('循环前')
//     menu.map(async item => {
//         // await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
//        try {
//         //    let [foo, bar] = await Promise.all([getFoo(), getBar()]);
//            await asyncFunc(item)
//        } catch (error) {
//            console.log('运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。')
//        }
//     })
//     console.log('循环后',newMenu)
// }


// 通过for()循环将异步转同步
// 通过for..of..
// 通过for..in..
// const executeEach = async () => {
//     console.log('循环前')
//     // for(let i =0 ; i<menu.length; i++){
//     for(let i  of menu){
//         // await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
//        try {
//         //    let [foo, bar] = await Promise.all([getFoo(), getBar()]);
//         //    await asyncFunc(menu[i])
//         await asyncFunc(i)
        
//        } catch (error) {
//            console.log('运行结果可能是rejected，所以最好把await命令放在try...catch代码块中。')
//        }
//     }
//     console.log('循环后',newMenu)
// }

// 通过promise.all 将循环内方法异步转同步
// const executeEach = async () => {
//     console.log('循环前')
//     Promise.all(menu.map( async item => {
//         return await asyncFunc(item)
//     })).then(() => {
//         console.log('循环后',newMenu)
//     })
// }

// executeEach()

// generator写法 与async、await做对比
const generator = function * executeEach() {
    console.log('循环前')
    for(let i =0 ; i<menu.length; i++){
        yield asyncFunc(menu[i])
    }
    console.log('循环后',newMenu)
}

let co = generator => {
    if(it = generator.next().value){
        it.then(res => {
            co(generator)
        })
    }else{
        return
    }
}

co(generator())

// for(const value of executeEach()){
//     console.log('sss', value)
//     if(value === menu.length -1){
//         console.log('newMenu', newMenu)
//     }
// }
// const execute = executeEach()
// execute.next()
// execute.next()
// execute.next()
// execute.next()
// execute.next()