import path from 'path';
import https from 'https';
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
// import React from 'react';
// import ReactDOM from 'react-dom/server';
import appRouter from './app/router';
import apiRouter from './api/apiRouter';
// import Html from './components/Html';
// import assets from './assets';
import { host, port } from './config';
import environment from '../config/environment';
import clients from './api/clients';
import dataloader from './api/dataloader';

const server = express();

server.set('port', port);

// // Register Node.js middleware
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.json());

server.use('*', (req, res, callback) => {
    req.config =  environment;
    req.clients = clients(server, req);
    req.dataloader = dataloader(server, req);
    callback();
});

server.use(appRouter);
server.use('/api', apiRouter);

server.get('/', function (req, res) {
   res.header('Content-type', 'text/html');
   return res.end('<h1>Hello, Secure World!</h1>');
 });


// server.get('/', function (req, res) {
//   res.send('Hello World');
// })

// // Register API middleware
// // -----------------------------------------------------------------------------
// server.use('/api/content', Api.default);
//





//
// Launch the server
// -----------------------------------------------------------------------------

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}, server).listen(port,() => {
  console.log(arguments[0]);
//   /* eslint-disable no-console */
  console.log(`The server is running at https://localhost:${port}/`);
});

// server.listen(port, () => {
//   /* eslint-disable no-console */
//   console.log(`The server is running at http://localhost:${port}/`);
// });

export default server;
