const { defaultType, visitantType } = require('../config/global');

const getClientsInDomain = (clientsDomain) => {
    let tmp = {};
    for (let subdomain in clientsDomain)
        tmp[subdomain] = getClientsInSubdomain(clientsDomain[subdomain]);
    return tmp;
}

const getClientsInSubdomain = (clientsSubdomain) => {
    let tmp = {};
    for (let type in clientsSubdomain)
        tmp[type] = getClientsInType(clientsSubdomain[type]);
    return tmp;
}

const getClientsInType = (clientsType) => {
    let tmp;
    if (Array.isArray(clientsType))
        tmp = getClientInArray(clientsType);
    else {
        tmp = {};
        for (let id in clientsType)
            tmp[id] = getClientInArray(clientsType[id]);
    }
    return tmp;
}

const getClientInArray = (clientsArray) =>
    clientsArray.map(socket => getClientInfo(socket));

const getClientInfo = (socket) => {
    return {
        'id': socket.id,
        'ip': socket.handshake.headers['x-forwarded-for'],
        'user-agent': socket.handshake.headers['user-agent']
    };
}

const sendAllData = (clientsSubdomain, dataArray) => {
    dataArray.forEach(data => {
        let { type, id, all, event, guest } = data;
        type = type || defaultType;
        id = id ? id.split(',') : [];
        all = all || false;
        if (event) {
            if (type in clientsSubdomain)
                sendEventInType(clientsSubdomain[type], event, id, all);

            if (guest && (visitantType in clientsSubdomain))
                sendEventInType(clientsSubdomain[visitantType], event);
        }
    });
}

const sendEventInType = (clientsType, event, ids = null, all = null) => {
    if (Array.isArray(clientsType) && !ids && !all)
        sendEventInArray(clientsType, event);
    else if (!Array.isArray(clientsType)) {
        if (!all)
            ids.forEach(id => {
                if (id in clientsType)
                    sendEventInArray(clientsType[id], event);
            });
        else
            for (let id in clientsType)
                if (!ids.includes(id))
                    sendEventInArray(clientsType[id], event);
    }
}

const sendEventInArray = (clientsArray, event) => {
    clientsArray.forEach(socket => {
        socket.emit('event', event);
    });
}

module.exports = {
    getClientsInDomain,
    getClientsInSubdomain,
    getClientsInType,
    sendAllData,
}