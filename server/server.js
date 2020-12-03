require('./config/config');

const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
//app.use(express.static(path.resolve(__dirname, '../public')));
app.use(require('./routes'));

module.exports.clients = [];
module.exports.io = socketIO(server);
require('./socket/socket');

server.listen(process.env.PORT, async() => {
    console.log('Escuchando puerto: ', process.env.PORT);
});