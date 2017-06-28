const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, "../public/" ); //resolves file structure without dots
require('../config/config');
const port = process.env.PORT || 3000; //process.env.PORT comes from config/config.json.  Need this for heroku

var app = express();
var server = http.createServer(app); //app.listen() also calls http.createServer(app) (express uses this)
var io = socketIO(server); //access to localhost:3000 port and also to socket.io/socket.iojs

app.use(express.static(publicPath)); //configure express static middleware that serves up public folder

io.on('connection', (socket) => { //register an event listener and do something when that event listens. listen for new connection.  socket represents individual socket. if one is down, they keep trying to reconnect
    console.log('new user connected');

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
