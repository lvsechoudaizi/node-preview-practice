const { Socket } = require('dgram');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})

// 注册
io.on('connection', function(socket){
    console.log('a user connected');

    // 响应用户发送的信息
    socket.on('chart message', function(msg) {
        console.log('chart Message：' + msg)

        // 广播给所有人
        io.emit('chart message', msg)
    })
    socket.on('disconnent', function(){
        console.log('user disconnnected');
    })
})



http.listen(3000, function(){
    console.log('Listen to 3000')
})