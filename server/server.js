// server.js


const express = require('express');
const app = express();
const server = require('http').Server(app);
const { v4: uuidv4 } = require('uuid');


//Import socket for websockets and peer for peerservers to connect to each other
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, { debug: true, });


app.use('/peerjs', peerServer);
app.use(express.static('public'));

app.get('/', (req, res) => {
    // res.redirect(`/${uuidv4()}`);
});

const ROOM_ID = '1234'


//on connection run callback
io.on('connection', (socket) => {
    //someone connected to our socket

    // if someone sends a join-room package
    socket.on('join-room', (roomId, userId) => {
        
        // retrieve the roomID and userID from the join-room package
        // set the socket to join the roomid
        socket.join(roomId);

        // send everyone in the room the joining users id inside of a user-connected data package
        socket.to(roomId).broadcast.emit('user-connected', userId);
    });
});




server.listen(8080, () => {
    console.log("Server is Running on port 8080!")
});
