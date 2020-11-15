const app = require('express')();

app.get('/status', (req, res) => {
    try {
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