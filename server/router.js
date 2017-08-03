exports.Router = (request, response) => {

  let action = (request, response, data, statusCode, headers, body) => {
      status = statusCode || 200;
      response.writeHead(200, {
        'Content-Type': headers,
        'X-Powered-By': 'janus'
      });
      let template = '<html><body><h1>'+data+'</h1></body></html>';
      response.end(template);
  };

  if (request.method === 'GET') {

    let body = [];

    request.on('data', (chunk) => {
      body.push(chunk);
      }).on('end', () => {

        body = Buffer.concat(body).toString();

        switch (request.url) {
          case '/':
            action(request, response, 'Hello, Home Page!', 200, 'text/html', body);
            break;
          case '/about':
            action(request, response, 'Hello, About Page!', 200, 'text/html', body);
          break;
        
          case '/contact':
            action(request, response, 'Hello, Contact Page!', 200, 'text/html', body);
          break;
          default:
            response.statusCode = 404;
            response.end();
        }

    });
  }
};    
