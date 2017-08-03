let path = require('path');
let fs = require('fs');

const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
};

const mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};


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

          let contentType = mime[path.extname(filePath).slice(1)] || 'text/plain';

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
