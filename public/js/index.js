var socket = io(); //initiating request from client to server to create the connection. this starts the connection process btw client and server.  events can be emitted from client and server and either one can listen to it

socket.on('connect', function () {
    console.log('connected to server');

    socket.emit('createEmail', {
        to: 'jen@example.com',
        text: 'Hey this is Jenn'
    })

    socket.emit('createMessage', {
        from: 'Jenn',
        text: 'you can do it'
    })
}) // listen for event

socket.on('disconnect', function () {
    console.log('disconnected from server')
})

socket.on('newEmail', function(email){
    console.log('new email', email);
})

 socket.on('newMessage', function(message){
    console.log('Server sent me a new message', message);
})