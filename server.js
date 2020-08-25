'use strict';

const http = require('http');
const express = require('express');
const httpProxy = require('http-proxy');
const HttpProxyRules = require('http-proxy-rules');
const url = require('url');
const config = require('./config');
const APP_PORT = 9444;
const PROXY_PORT = 9441;
const HOST = '0.0.0.0';
const app = express();
const proxyRules = new HttpProxyRules(config.proxy);

let proxy = httpProxy.createProxyServer({});


let server = http.createServer( async function (req, res) {
  if (req.url.search('chatHttp') > -1) {
      let query = (url.parse(req.url, true)).query;
      if (query.data) {
          let data = JSON.parse(query.data);
          // Rewrite URL with new user informations
          req.url = '/servlet/chatHttp?data=' + encodeURIComponent(JSON.stringify(data));

          // If talk type is cguAccepted, redirect to Express API
          if (data.type.localeCompare('tosAccept') === 0) {
              req.url = '/servlet/chatHttp/tos';
          }
          // If talk type is guestConnect, redirect to Express API
          if (data.type.localeCompare('guestConnect') === 0) {
              req.url = '/servlet/chatHttp/guestConnect';
          }
      }
  }   
  let targetUrl = proxyRules.match(req);
  proxy.web(req, res, { target: targetUrl, secure: false });
});

// let server = http.createServer(async function(req, res) {
//   let targetUrl = proxyRules.match(req);
//   proxy.web(req, res, { target: targetUrl, secure: false });
// })


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/cdn', express.static('public'))

app.post('/tosAccepted', async (req, res) => {
  res.json({"accepted": true});
});

app.get('/guestConnect', (req, res) => {
  res.json({"user": "riki"});
});

server.timeout = 1200000;
server.listen(PROXY_PORT);
app.listen(APP_PORT, HOST);
console.log(`Running on http://${HOST}:${PROXY_PORT}`);