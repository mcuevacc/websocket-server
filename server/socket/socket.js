const { getInfo } = require('../utils');

const { io } = require('../server');
let { clients } = require('../server');

io.on('connection', socket => {
    console.log("Client connect!");
    handleConnection(socket);

    socket.on('disconnect', () => {
        console.log("Client disconnect!");
        handleDisconnection(socket);
    });
    /*
    socket.on('event', data => {
        console.log("Evento sucedido");
    });
    */
});

const handleConnection = (socket) => {
    try {
        let { domain, subdomain, type, id } = getInfo(socket);
        console.log({ domain, subdomain, type, id });

        if (!domain) {
            socket.disconnect();
            console.log("Client rejected!");
            return;
        }

        if (!(domain in clients))
            clients[domain] = {}

        if (!(subdomain in clients[domain]))
            clients[domain][subdomain] = {}

        if (!(type in clients[domain][subdomain]))
            clients[domain][subdomain][type] = id ? {} : [];

        if (id && !(id in clients[domain][subdomain][type]))
            clients[domain][subdomain][type][id] = [];

        if (id)
            clients[domain][subdomain][type][id].push(socket);
        else
            clients[domain][subdomain][type].push(socket);
    } catch (err) {
        console.log(err.message);
    }
}

const handleDisconnection = (socket) => {
    try {
        let { domain, subdomain, type, id } = getInfo(socket);
        console.log({ domain, subdomain, type, id });

        if (!(domain in clients))
            return;

        if (!(subdomain in clients[domain]))
            return;

        if (!(type in clients[domain][subdomain]))
            return;

        if (id && !(id in clients[domain][subdomain][type]))
            return;

        if (id) {
            let index = clients[domain][subdomain][type][id].indexOf(socket);
            clients[domain][subdomain][type][id].splice(index, 1);
        } else {
            let index = clients[domain][subdomain][type].indexOf(socket);
            clients[domain][subdomain][type].splice(index, 1);
        }
    } catch (err) {
        console.log(err.message);
    }
}