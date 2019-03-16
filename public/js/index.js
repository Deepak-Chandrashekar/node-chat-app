var socket = io();

/**
 * Make sure to give as "connect" in socket.on method to establish the initial connection 
 */

/**
 * (1) socket.on is called as soon as page is loaded in browser
 * (2) socket.emit is called when a user make the request for a particular socket.emit route(using the route name)
 */

socket.on('connect', function () {
    console.log('Connected to server');
});

/**
 * Make sure to give as "disconnect" in socket.on method to notify user when server is disconnected
 */

socket.on('disconnect', function () {
    console.log('Disconnected from server');

});


socket.on('newMessage', function (message) {
    console.log('New Message', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'User',
//     text: jQuery('[name = message]').val()
// }, function () {

// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name = message]').val()
    }, function (data) {
        console.log(data)

    });
});