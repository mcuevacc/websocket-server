const app = require('express')();

app.use(require('./clients'));
app.use(require('./socket'));
app.use(require('./status'));

module.exports = app;