'use strict';

const express = require('express');
const fs = require('fs');
const pokeRouter = require('../route/router.js');
const morgan = require('morgan');
const AppError = require('./app_error.js');
const resError = require('./response_error.js');
const port = 3000;

let server = module.exports = exports = express();

let accessLogStream = fs.createWriteStream('./access.log', {
  flags: 'a'
});

server.use(morgan('combined', {
  stream: accessLogStream
}));

server.use(modify);

server.use('/api', pokeRouter);

function modify(req, res, next) {
  res.sendError = function(error) {
    if(AppError.instAppError(error)){
      return res.status(error.statusCode).send(error.responseMessage);
    }
    res.status(500).send('Internal Server Error');
  };
  next();
}

server.listen(port, () => {
  console.log('server up on ' + port);
});
