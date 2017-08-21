const express = require('express');
const config = require('../config');

const host = config.get('app:host');
const port = config.get('app:port');

const app = express(),
      middleware = require('../middleware')(app, express);

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
