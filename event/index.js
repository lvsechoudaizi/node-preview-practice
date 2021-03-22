// events（事件触发器）
// 触发器，Emitter对象， 又称监听器，Listener
// 所有能触发事件的对象都是 EventEmitter 类的实例
const EventEmitter = require('events');
// const { listeners } = require('process');

class MyEmitter extends EventEmitter{}

const myEmitter = new MyEmitter();

// npm 查看模块XXX版本命令
// npm view XXX versions

//  eventEmitter.on() 用于注册监听器
// myEmitter.on('event', () => {
//     console.log('触发了event监听器');
// })

// // eventEmitter.emit() 用于触发事件
// // 触发event事件
// myEmitter.emit('event')

// // EventEmitter 以注册的顺序同步地调用所有监听器,同步函数，内部可以使用异步方法，切换为异步
// myEmitter.on('async', (a, b) => {
//     // 先支持浏览器的同步代码，同步代码执行完成后立即执行setImmediate
//     // setImmediate(() => {
//     //   console.log('异步地发生');
//     // });
//     console.log('EventEmitter已注册顺序同步执行')
//     setTimeout(() => {
//         console.log('异步地发生');
//     }, 1000);
//   });

// myEmitter.emit('async', 'a', 'b');


// // 将参数和 this 传给监听器
// // myEmitter.on('params', (a,b) => {
// //     // 使用箭头函数，则this指向不是EventEmitter实例
// //     console.log('触发了event传多个参数的测试', a, b, this);
// // })

// myEmitter.on('params', function(a,b){
//     // 不使用箭头函数，则this指向EventEmitter实例
//     console.log('触发了event传多个参数的测试', a, b, this, this === myEmitter);
// })

// // eventEmitter.emit() 方法可以传任意数量的参数到监听器函数
// myEmitter.emit('params', 'first', 'second')


// let callCount = 0

// // 当使用 eventEmitter.on() 注册监听器时，监听器会在每次触发命名事件时被调用。
// myEmitter.on('call', () => {
//     console.log('测试on()调用后处理次数', ++callCount)
// })
// // 触发
// myEmitter.emit('call')
// // 触发
// myEmitter.emit('call')
// // 触发，每次触发都有执行注册事件
// myEmitter.emit('call')


// let onceCount = 0
// // 使用 eventEmitter.once() 可以注册最多可调用一次的监听器。 当事件被触发时，监听器会被注销，然后再调用
// myEmitter.once('onceCall', () => {
//     console.log('测试once()调用后处理次数', ++onceCount)
// })

// // 只执行一次
// myEmitter.emit('onceCall')
// // 不触发，后面触发将不再执行
// myEmitter.emit('onceCall')
// // 不触发
// myEmitter.emit('onceCall')

// // 错误事件，当 EventEmitter 实例出错时，应该触发 'error' 事件
// myEmitter.on('error', (error) => {
//     console.error('触发了错误事件', error)
// })

// myEmitter.emit('error', new Error('错误'))

// // EventEmitter 实例在新的监听器被添加到其内部监听器数组之前，会触发自身的 'newListener' 事件。
// // newListener事件是EventEmitter类内的自身事件，当新的监听器被注册on(),将会先触发newListener事件
// // 在 'newListener' 回调中注册到相同 name 的任何其他监听器将插入到正在添加的监听器之前。
// myEmitter.once('newListener', (event, listeners) => {
//     console.log('-----', event, listeners)
//     if(event === 'testListener'){
//         myEmitter.on('testListener', () => {
//             console.log("newListener回调中注册相同名称的监听器，会插入到正在监听的监听器之前",event)
//         })
//     }
// })

// myEmitter.on('testListener',() => {
//     console.log("测试newListener事件")
// })

// myEmitter.emit('testListener')

// myEmitter.on('testListener1',() => {
//     console.log("测试newListener1事件")
// })

// // myEmitter.emit('testListener1')

// // 'removeListener' 事件在 listener 被移除后触发。
// myEmitter.on('removeListener', (event, listeners) => {
//     console.log('removeListener', event, listeners)
// })

// myEmitter.once('testRemoveListener', () => {
//     console.log("测试removeListener事件")
// })

// myEmitter.emit('testRemoveListener')

// emitter.off(eventName, listener)
// myEmitter.off('testListener1', () => {
//     console.log(111)
// })

// myEmitter.removeListener('testListener1', () => {})

// console.log('当前的监听器最大限制数的值', myEmitter.listenerCount('testListener1'))

// const callbackA = () => {
//     console.log('A');
//   };
  
//   const callbackB = () => {
//     console.log('B');
//   };
  
//   myEmitter.on('event', callbackA);
  
//   myEmitter.on('event', callbackB);
  
//   myEmitter.removeListener('event', callbackB);

// //   // callbackA 移除了监听器 callbackB，但它依然会被调用。
// //   // 触发时内部的监听器数组为 [callbackA, callbackB]
//   myEmitter.emit('event');
// //   // 打印:
// //   //   A
// //   //   B
  
// //   // callbackB 现已被移除。
// //   // 内部的监听器数组为 [callbackA]
//   myEmitter.emit('event');
  // 打印:
  //   A

  
  const callbackC = () => {
    console.log('C');
  };
  
  const callbackD = () => {
    console.log('D');
  };

  const callbackE = () => {
    console.log('E');
  };

//   emitter.on(eventName, listener)
  myEmitter.on('remove1',callbackC)

  myEmitter.on('remove1', callbackD)

//   emitter.prependListener() 方法可用于将事件监听器添加到监听器数组的开头。
  myEmitter.prependListener('remove1', callbackE)

//   emitter.off(eventName, listener) 移除注册的监听器
// 从名为 eventName 的事件的监听器数组中移除指定的 listener
// 一个名为eventName的事件可能包含多个lisetener,，移除事需要指定listener
  myEmitter.off('remove1', callbackC)

//   myEmitter.removeAllListeners()

//   C D 此时监听器内是：[callbackC, callbackD],执行callbackC后，移除了监听器callbackC，只剩下【callbackD】
//   myEmitter.emit('remove1')  

// // D
//   myEmitter.emit('remove1')

//   myEmitter.emit('remove1')

  myEmitter.emit('remove1')

  myEmitter.emit('remove1')
