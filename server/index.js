const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

const users = [];

wss.on('connection', function connection(ws) {
    users.push(ws);
    ws.on('message', function incoming(message) {
        const recievers = users.filter(user => user !== ws);

        recievers.forEach(reciever => reciever.send(message));
    });
});

console.log('Server is running on port' + process.env.PORT || 8080)

