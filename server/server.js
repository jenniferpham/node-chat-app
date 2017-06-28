const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, "../public/" ); //resolves file structure without dots

require('../config/config');
const port = process.env.PORT || 3000; //process.env.PORT comes from config/config.json.  Need this for heroku




var app = express();

app.use(express.static(publicPath)); //configure express static middleware that serves up public folder

// app.get('/', function (req, res){
//     res.sendFile(path.join(publicPath + 'index.html'));
// })

//configure express static middleware
//serve up the public folder

//app.listen on port and console.log port #
//app.listen(3000); (doesn't need callback function)
app.listen(port, () => {
    console.log('starting app on port ', port);
})
