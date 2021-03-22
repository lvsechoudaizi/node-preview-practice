
const moment = require('moment');
const { callback, promise, generator, asyncAwait, event, sync } = require('../index.js')

// test('callback', done => {
//    callback()

//    const time = moment('2020-11-09').add(128, 'days').format('YYYY-MM-DD')
//    console.log('====================================');
//    console.log(time);
//    console.log('====================================');

//    setTimeout(done, 1000);

//    promise()
// });

// test('generator', (done) => {
//    asyncAwait()

//    setTimeout(done, 1000);
// });

test('event', (done) => {
   event()

   setTimeout(done, 1000);
});