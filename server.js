'use strict';

const http = require('http');
const express = require('express');
const httpProxy = require('http-proxy');
const HttpProxyRules = require('http-proxy-rules');
const config = require('./config');
const APP_PORT = 9444;
const PROXY_PORT = 9441;
const HOST = '0.0.0.0';
const app = express();
const proxyRules = new HttpProxyRules(config.proxy);

let proxy = httpProxy.createProxyServer({});

let server = http.createServer(async function(req, res) {
  console.log ("req.url: ", req.url);
  let targetUrl = proxyRules.match(req);
  console.log("Target: ", targetUrl);
  proxy.web(req, res, { target: targetUrl, secure: false });
})

server.timeout = 1200000;
server.listen(PROXY_PORT);

app.get('/', (req, res) => {
  console.log ("req.url", req.url);
  res.send('Hello World');
});

app.use('/cdn', express.static('public'))

app.listen(APP_PORT, HOST);

console.log(`Running on http://${HOST}:${PROXY_PORT}`);