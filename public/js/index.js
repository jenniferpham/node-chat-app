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

// socket.emit('createMessage', { //first argument is event name. second argument is messageObject, third argument is callback function
//     from: 'Frank',
//     text: 'hi'
// }, function(data){
//     console.log('got it.', data)
// });

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){

    });
});