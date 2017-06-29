const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, "../public/" ); //resolves file structure without dots
require('../config/config');
const port = process.env.PORT || 3000; //process.env.PORT comes from config/config.json.  Need this for heroku

var app = express();
var server = http.createServer(app); //app.listen() also calls http.createServer(app) (express uses this)
var io = socketIO(server); //access to localhost:3000 port and also to socket.io/socket.iojs

app.use(express.static(publicPath)); //configure express static middleware that serves up public folder

io.on('connection', (socket) => { //register an event listener and do something when that event listens. listen for new connection.  socket represents individual socket. if one is down, they keep trying to reconnect
    console.log('new user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chatroom'));

//socket.broadcast.emit sends message to all OTHER users (not the main user)
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined'));

    // socket.emit('newEmail', {
    //     from: 'mike@example.com',
    //     text: 'hey whats up',
    //     createdAt: 123
    // });

    // socket.emit('newMessage', {
    //     from: 'Jon Martinez',
    //     text: 'Im learning js',
    //     createdAt: 123
    // })

    socket.on('createMessage', function(message, callback){
        console.log('Client created a message', message);
        // io.emit('newMessage', {  //io.emit sends message to all users taht are connected
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // })
         io.emit('newMessage', generateMessage(message.from, message.text));
         callback('Data successfully went to the server as it is called on the server on listener');  //acknowledgement. server can send something to event listener in client side
    })

    socket.on('createLocationMessage', function(coords){
        // io.emit('newMessage', generateMessage('Admin', `Lat: ${coords.latitude}, Lon: ${coords.longitude}`));
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    })

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    })

    socket.on('disconnect', ()=> {
        console.log('User was disconnected - gfrom client');
    })
})
// app.get('/', function (req, res){
//     res.sendFile(path.join(publicPath + 'index.html'));
// })

//configure express static middleware
//serve up the public folder

//app.listen on port and console.log port #
//app.listen(3000); (doesn't need callback function)
server.listen(port, () => {
    console.log('starting app on port ', port);
})
