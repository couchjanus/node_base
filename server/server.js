const http = require('http');

let router = require('./router');

const hostname = '127.0.0.1';

const port = 3000;


const server = http.createServer();

server.on("connection", () => {
    console.log("connected!");
});

server.once("connection", () => {
    console.log("first connection!");
});


server.on('request', (request, response) => {

  // response.status = 200;
  // response.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // Method, URL and Headers  
  
  const { method, url } = request;
  console.log("Request for " + method + " received.");
  console.log("Request for " + url + " received.");
  const { headers } = request;
  console.log("Request for " + headers + " received.");
  const userAgent = headers['user-agent'];
  console.log("Request for " + userAgent + " received.");

  response.writeHead(200, {
    'Content-Type': 'text/html',
    'X-Powered-By': 'janus'
  });

  
  // response.end('Hello World\n');

  response.write('<html>');
  response.write('<body>');
  response.write('<h1>Hello, Node World!</h1>');
  response.write('</body>');
  response.write('</html>');
  response.end();
  
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
