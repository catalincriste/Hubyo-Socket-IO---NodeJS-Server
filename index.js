var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


//Node Serve html file
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

//Socket IO Connection
io.on('connection', function (socket) {
    //io.emit('chat message','A User Connected');    
    
    console.log('a user connected');            //On Connect Info
    //Catches the disconnection event on a user leaving the server
    socket.on('disconnect', function () {
      //  io.emit('chat message','Someone Disconnected');            
        console.log('user disconnected');   //On Disconnect Info
    });
    //Catches the chat message event, When the user submits the data
    socket.on('chat message', function (data) {
        console.log(data);
        io.emit('chat message', data);        
    });
});

//Creates the server in a specific port
http.listen(3000, function () {
    console.log('listening on *:3000');
});
