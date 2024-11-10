const https = require('http');
const fs = require('fs');
const express = require('express');
const config = require('../config');
const socket = require('./lib/socket');

const options = {
  key: fs.readFileSync('ssl/server.key'),
  cert: fs.readFileSync('ssl/server.crt')
};
const app = express();
const server = https.createServer(app, options);

app.use('/', express.static(`${__dirname}/../client/dist`));

server.listen(config.PORT, () => {
  socket(server);
  console.log('Server is listening at :', config.PORT);
});
