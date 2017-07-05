const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const publicPath = path.join(__dirname, "../public/" ); //resolves file structure without dots
require('../config/config');
const port = process.env.PORT || 3000; //process.env.PORT comes from config/config.json.  Need this for heroku

var app = express();
var server = http.createServer(app); //app.listen() also calls http.createServer(app) (express uses this)
var io = socketIO(server); //access to localhost:3000 port and also to socket.io/socket.iojs
var users = new Users(); //can use all methods of the class

app.use(express.static(publicPath)); //configure express static middleware that serves up public folder

io.on('connection', (socket) => { //register an event listener and do something when that event listens. listen for new connection.  socket represents individual socket. if one is down, they keep trying to reconnect
    // console.log('new user connected');

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required');  //use callback so if there is an error, all of the other code doesnt run
        }

        socket.join(params.room);  //connects all people that have that params.room query
        // socket.leave('the office fans');
        users.removeUser(socket.id); //remove that person from any other  previous potential rooms
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room)); //message for everyone in that room

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chatroom'));

        //socket.broadcast.emit sends message to all OTHER users (not the main user)
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));

        // io.emit - to everyone (io) --> io.to('The Office Fans')
        io.to('The Office Fans').emit;
        // socket.broadcast.emit - to everyone except yourself
        socket.broadcast.to('The Office Fans').emit();
        //socket.emit - to individual
 
        callback();
    })

   

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
        console.log('disconnect');
        
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`))
        }
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
