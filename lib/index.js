'use strict';

const http = require('http');
const httpProxy = require('http-proxy');
const Target = require('./target')
const proxy = httpProxy.createProxyServer({});

http.createServer(function(req, res) {
  let target = Target.get(req);
  if (target) {
    proxy.web(req, res, { target: `http://${target}` });
    return;
  }
  res.end('hello, welcome to pass-proxy server.')
}).listen(80);

proxy.on('error', function (err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
 
  res.end('Something went wrong. And we are reporting a custom error message.');
});
