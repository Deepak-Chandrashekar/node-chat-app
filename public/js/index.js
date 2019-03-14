var socket = io();


socket.on('connection', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
        to: 'Harvey',
        text: 'Hi, whatssup!!'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server')
});


socket.on('newMessage', function (message) {
    console.log('New Message', message);

});