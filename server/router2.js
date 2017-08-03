let path = require('path');
let fs = require('fs');

const root = path.join(__dirname, '/../public');

let respond = (res, data, status) => {
  status = status || 200;
  res.writeHead(status, headers);
  res.end(data);
};

let send404 = (res) => {
  respond(res, 'Not Found', 404);
};


exports.Router = (request, response) => {
    
    let reqPath = request.url.toString().split('?')[0];
    let filePath;

    switch (reqPath) {
      case '/':
        filePath = path.join(root, reqPath.replace(/\/$/, '/index.html'));
        break;
      case '/about':
          filePath = path.join(root, reqPath.replace(/\/$/, ""))+'.html';
        break;
      case '/contact':
          filePath = path.join(root, reqPath.replace(/\/$/, ""))+'.html';
        break;
      default:
        response.statusCode = 404;
        response.end();
    }

    let actions = {

      'GET': (request, response) => {
        if (filePath.indexOf(root + path.sep) !== 0) {
            response.statusCode = 403;
            response.setHeader('Content-Type', 'text/plain');
            return response.end('Forbidden');
        }

          let contentType = 'text/html';

          let stream = fs.createReadStream(filePath);

          stream.on('open', () => {
              response.setHeader('Content-Type', contentType);
              stream.pipe(response);
          });
          stream.on('error', () => {
              response.setHeader('Content-Type', 'text/plain');
              response.statusCode = 404;
              response.end('Not found');
          });

        },
    };

    let action = actions[request.method];

    action ? action(request, response) : send404(response);
};
