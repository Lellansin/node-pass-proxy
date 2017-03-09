'use strict';

const http = require('http');
const httpProxy = require('http-proxy');
const os = require('os');
const Target = require('./target');
const proxy = httpProxy.createProxyServer({});

let server = http.createServer(function(req, res) {
  let target = Target.get(req);
  if (target) {
    if (req.headers.referer) {
      let site = req.headers.referer.replace(/http:\/\/(.*)\/$/, '$1');
      res.setHeader('Access-Control-Allow-Origin', `http://${site}`);
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }

    if (req.method == 'OPTIONS') {
      res.end('');
      return;
    }

    proxy.web(req, res, { target: `http://${target}` });
    return;
  }
  res.end('hello, welcome to pass-proxy server.');
})

server.on('error', (err) => {
  if (err.code == 'EACCES') {
    let user = os.userInfo().username;
    console.log(`Oops, there is problem!`);
    console.log(`User ${user} dose't have right to listen on 80 port.`);
    console.log(`You can try sudo to execution.`);
  } else {
    console.log(err.stack);
  }
})

server.listen(80, () => Target.init());

proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/html'
  });
 
  res.end(`<h1>Oops, there is problem.</h1>
    <p>Something went wrong about aim server.</p>
    <pre>${err.stack}</pre>`);
});
