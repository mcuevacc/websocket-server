const { getClientsInDomain, getClientsInSubdomain, getClientsInType } = require('../utils/socket-service');

const app = require('express')();

app.get('/clients', (req, res) => {
    try {
        let domain = req.query.domain || null;
        let subdomain = req.query.subdomain || null;
        let type = req.query.type || null;

        let { clients } = require('../server');
        let tmp = {};

        if (!domain)
            for (let domainKey in clients)
                tmp[domainKey] = getClientsInDomain(clients[domainKey]);
        else {
            if (domain in clients) {
                if (!subdomain)
                    tmp = getClientsInDomain(clients[domain]);
                else {
                    if (subdomain in clients[domain]) {
                        if (!type)
                            tmp = getClientsInSubdomain(clients[domain][subdomain]);
                        else {
                            if (type in clients[domain][subdomain])
                                tmp = getClientsInType(clients[domain][subdomain][type]);
                        }
                    }
                }
            }
        }
        res.json({
            success: true,
            data: tmp
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        });
    }
});

module.exports = app;