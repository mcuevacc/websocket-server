const { sendAllData } = require('../utils/socket-service');
const { defaultSubdomain } = require('../config/global');

const app = require('express')();

app.post('/socket', (req, res) => {
    try {
        let { domain, subdomain, data } = req.body;
        console.log({ domain, subdomain, data });
        if (!domain || !data)
            return res.status(400).json({
                success: false,
                msg: "Data not found"
            });

        let { clients } = require('../server');
        if (!(domain in clients))
            return res.status(202).json({
                success: false,
                msg: "Not clients in domain"
            });

        subdomain = subdomain || defaultSubdomain;
        if (!(subdomain in clients[domain]))
            return res.status(202).json({
                success: false,
                msg: "Not clients in subdomain"
            });

        if (!Array.isArray(data)) {
            data = [data];
        }
        sendAllData(clients[domain][subdomain], data);

        res.json({
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: err.message
        });
    }
});

module.exports = app;