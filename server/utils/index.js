const jwt = require('jsonwebtoken');
const { authorizedDomains, defaultSubdomain, defaultType, visitantType } = require('../config/global');

const decodeJWT = (token) => {
    try {
        return jwt.decode(token);
    } catch (err) {
        return null;
    }
}

const getDomains = (origin, data) => {
    let domain = null;
    let subdomain = null;

    if (origin) {
        let host = /[a-zA-Z0-9.]+[.]{1}[a-zA-Z0-9]+/i.exec(origin)[0];
        domain = findAuthorizedDomain(host);
        if (domain)
            subdomain = host.substring(0, host.length - domain.length - 1);
    } else if (data) {
        if ('domain' in data)
            domain = findAuthorizedDomain(data.domain);

        if ('subdomain' in data)
            subdomain = data.subdomain;
    }
    return { domain, subdomain: subdomain || defaultSubdomain };
}

const findAuthorizedDomain = (host) => {
    let domain = null;
    let matches = authorizedDomains.filter((authorizedDomain) => RegExp(`${authorizedDomain}$`, 'i').test(host));
    if (matches.length)
        domain = matches[0];
    return domain;
}

const getInfo = (socket) => {
    let data = null;

    if ("auth" in socket.handshake.query)
        data = decodeJWT(socket.handshake.query.auth);

    let type = null;
    let id = null;
    if (data) {
        if ('type' in data)
            type = data.type;

        if ('id' in data)
            id = data.id;
    }

    if (!type)
        type = id ? defaultType : visitantType;

    let { domain, subdomain } = getDomains(socket.handshake.headers['origin'], data);

    return { domain, subdomain, id, type }
}

module.exports = {
    getInfo
}