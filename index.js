const { dir } = require('console');
const { Socket } = require('dgram');
const { dirname } = require('path');

let app = require('express')();

let http = require('http').Server(app);

let io = require('socket.io')(http);

app.get('/', (req,res)=> {
    res.sendFile(__dirname + '/index.html');
});


http.listen(3000, () => {
    console.log('iam connected');

});


io.on('connection', (socket) => {
   io.emit('connections', Object.keys(io.sockets.connected).length)

    socket.on('disconnect', () => {
        console.log('disconnected the socket');
    });    

/// to listen to the server (index.html) maa pani xa created hook maa
    socket.on('created',(data)=>{
        socket.broadcast.emit('created', (data))
  });

     socket.on('chat-message', (data) => {
         socket.broadcast.emit('chat-message', (data))
     });
    
    
     socket.on('typing', (data) => {
         socket.broadcast.emit('typing', (data))
     });
     
     socket.on('stopTyping', (data) => {
         socket.broadcast.emit('stopTyping', (data))
     });
     
     socket.on('joined', (data) => {
         socket.broadcast.emit('joined', (data))
     });

     socket.on('leaved', (data) => {
        socket.broadcast.emit('leaved', (data))
    });
     
  
});
