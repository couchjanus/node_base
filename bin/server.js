const http = require('http');

const hostname = '127.0.0.1';

const port = 3000;

const server = http.createServer((req, res) => {
  res.status = 200;
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

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
