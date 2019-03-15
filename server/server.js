const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app)
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connect', (socket) => {
    console.log('New user is connected');

    // socket.emit('newEmail', {
    //     from: 'abc@gmail.com',
    //     text: 'Hello world',
    //     created: '17:58'
    // });

    // socket.emit('newMessage', {
    //     from: 'qwerty',
    //     text: 'Hey there!',
    //     createdAt: '12:22'
    // });

    socket.emit('newMessage', { //socket.emit is used to send message as soon as we open browser(i.e as soon as client-server connection is established),
        from: 'Admin',          // we should enter the specific word(newMessage) else we are not able to see it on browser.
        text: 'Welcome to chat app'
    });
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    })


    socket.on('disconnect', () => {
        console.log('User is disconnected');
    });

    socket.on('createMessage', (message) => {// socket.on is used to send messages to a particular event name(i.e createMessage in this case)
        console.log(message);
        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });
});



server.listen(port, () => {
    console.log(`started on ${port}`)

})


