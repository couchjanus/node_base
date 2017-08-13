const app = require('../index');
const db = require('../core/db');

const hostname = '127.0.0.1';
const port = 3000;

app.set('port', port);

db.connect('mongodb://localhost:27017/blog', (err) => {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  }
});
