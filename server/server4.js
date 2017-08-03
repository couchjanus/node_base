const http = require('http');

let router = require('./router3');

const hostname = '127.0.0.1';

const port = 3000;

const server = http.createServer();


server.once("connection", () => {
    console.log("first connection!");
});

server.on('request', router.Router);

const boot = () => {
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
};

const shutdown = () => {
  server.close();
};

if (require.main === module) {
  boot();
} else {
  console.info('Running app as a module');
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = port;
  exports.hostname = hostname;
}
