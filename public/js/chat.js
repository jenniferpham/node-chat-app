var socket = io(); //initiating request from client to server to create the connection. this starts the connection process btw client and server.  events can be emitted from client and server and either one can listen to it

function scrollToBottom(){
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //Heights
    var clientHeight = messages.prop('clientHeight'); //height currently visible of #messages as seen by user
    var scrollTop = messages.prop('scrollTop'); //height between top of browser and top of clientHeight
    var scrollHeight = messages.prop('scrollHeight'); //total height of #messages
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    
    if((clientHeight + scrollTop + newMessageHeight + lastMessageHeight) >= scrollHeight){ //if height of messages is past or under the client view, meaning latest messages are at bottom
        // console.log('should scroll')
        messages.scrollTop(scrollHeight); //move to bottom
    }
}

socket.on('connect', function () {
    console.log('connected to server');

    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function(err){
        if(err){
            alert(err);
            window.location.href = "/";  //redirecting user to root page
        } else{
            console.log('no error');
        }
    })

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

socket.on('updateUserList', function (users) {
    console.log('Users list', users);
    var ol = jQuery('<ol></ol>');
    
    users.forEach(function (user){
        ol.append(jQuery('<li></li>').text(user))
    })

    jQuery('#users').html(ol);
})

socket.on('newEmail', function(email){
    console.log('new email', email);
})

 socket.on('newMessage', function(message){
    var htmlTemplate = jQuery('#message-template').html();  //grabs what will be the html base of the template
    var formattedTime = moment(message.createdAt).format('h:mm:ss a');
    var renderedHtml = Mustache.render(htmlTemplate, { //first arg is the html template base and second arg is the variables passed into the template as an object
        text: message.text,
        from: message.from,
        time: formattedTime

    });

    jQuery('#messages').append(renderedHtml);
    scrollToBottom();

    // console.log('Server sent me a new message', message);
    // var formattedTime = moment(message.createdAt).format('h:mm:ss a');

    // var li = $('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // jQuery('#messages').append(li);
})

socket.on('newLocationMessage', function(message){
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');

    // var formattedTime = moment(message.createdAt).format('h:mm:ss a');

    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);
    // jQuery('#messages').append(li);
    var formattedTime = moment(message.createdAt).format('h:mm:ss a');

    var htmlTemplate = jQuery("#location-message-template").html();
    var renderedHtml = Mustache.render(htmlTemplate, {
        from: message.from,
        url: message.url,
        time: formattedTime
    })

    jQuery("#messages").append(renderedHtml);

     scrollToBottom();
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

