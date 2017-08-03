const http = require('http');

let router = require('./router');

const hostname = '127.0.0.1';

const port = 3000;

const server = http.createServer();

  server.once("connection", () => {
      console.log("first connection!");
  });

  server.on('request', (request, response) => {

    const { method, url } = request;
    const { headers } = request;
    const userAgent = headers['user-agent'];

    response.on('error', (err) => {
        console.error(err);
    });

    if (request.method === 'GET' && request.url === '/') {

      let body = [];

      request.on('error', (err) => {
        console.error(err);
      }).on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {

      body = Buffer.concat(body).toString();
      response.writeHead(200, {
            'Content-Type': 'application/json',
            'X-Powered-By': 'janus'
      });

      const responseBody = { headers, method, url, body };
        response.write(JSON.stringify(responseBody));
        response.end();
      });
    } else {
      response.statusCode = 404;
      response.end();
    }

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
