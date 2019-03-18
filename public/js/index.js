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

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    console.log(message.url);
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    console.log("A is:-", a)
    jQuery('#messages').append(li);
})

// socket.emit('createMessage', {
//     from: 'User',
//     text: jQuery('[name = message]').val()
// }, function () {

// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function (data) {
        messageTextbox.val('');

    });
});


var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('geolocation not supported by your browser.')
    }


    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.')
    })

})