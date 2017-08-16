const app = require('../index');
const db = require('../core/db');

const hostname = '127.0.0.1';
const port = 3000;

app.set('port', port);

app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
