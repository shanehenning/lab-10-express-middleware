// const AppError = require('./app_error.js');

// module.exports = exports = function() {
//   return res.sendError = function(req, res, error, next) {
//     console.log(error.message);
//     if (AppError.instAppError(error)) {
//       return res.status(error.statusCode).send(error.responseMessage);
//     }
//     res.status(500).send('Internal Server Error');
//     next();
//   };
// };

module.exports = exports = function(res){
  res.sendError = function(words, next){
    console.log('res.sendError ', words);
    next();
  };
};
