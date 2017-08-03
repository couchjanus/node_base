// const server = require("./server/server4");
const server = require("./server");

let info = 'node-static-http-server by Janus Nic\n'
         + 'Examples of HTTP static file serving in Node.js\n'
         + 'See: https://github.com/couchjanus/node_base\n';

server.boot();
console.log(info);
