var socket = io(); //initiating request from client to server to create the connection. this starts the connection process btw client and server.  events can be emitted from client and server and either one can listen to it

socket.on('connect', function () {
    console.log('connected to server');

    // socket.emit('createEmail', {
    //     to: 'jen@example.com',
    //     text: 'Hey this is Jenn'
    // })

    // socket.emit('createMessage', {
    //     from: 'Jenn',
    //     text: 'you can do it'
    // })
}) // listen for event

socket.on('disconnect', function () { //use regular functions instead of arrow functions so it works across all devices
    console.log('disconnected from server')
})

socket.on('newEmail', function(email){
    console.log('new email', email);
})

 socket.on('newMessage', function(message){
    console.log('Server sent me a new message', message);

    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
})

socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
})
// socket.emit('createMessage', { //first argument is event name. second argument is messageObject, third argument is callback function
//     from: 'Frank',
//     text: 'hi'
// }, function(data){
//     console.log('got it.', data)
// });

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function(){  //callback used for server acknowledgement once it finishes with the server
        messageTextbox.val(""); //set value of textbox to blank string. empty form field
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('geolocation not supported by your browser')
    }

    locationButton.attr('disabled', 'disabled');
    locationButton.text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        locationButton.removeAttr('disabled');
        locationButton.text('Location');
        
        // var coords = pos.coords;
        // console.log(`Latitude: ${coords.latitude}`);
        // console.log(`Longitude: ${coords.longitude}`);
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
        
    }, function(){ //error handler
        alert('unable to get location') //if user doesnt want to share their location or we cant get their position
         locationButton.removeAttr('disabled');
        locationButton.text('Location');
    })
})