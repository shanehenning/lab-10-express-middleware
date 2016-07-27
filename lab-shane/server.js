'use strict';

const app = require('express')();
const fs = require('fs');
const morgan = require('morgan');
const AppError = require('app_error.js');
const port = 3000;

let accessLogStream = fs.createWriteStream('./access.log', {
  flags: 'a'
});

app.use(morgan('combined', {
  stream: accessLogStream
}));

app.use(function(req, res, next) {
  res.sendError = function(error) {
    console.log(error.message);
    if (AppError.instAppError(error)) {
      return res.status(error.statusCode).send(error.responseMessage);
    }
    res.status(500).send('Internal Server Error');
  };
  next();
});

app.get('/', (req, res) => {
  res.end('hello world!');
});

app.listen(port, () => console.log('server up on ' + port));
