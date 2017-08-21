const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;

mongoose.connect(
  config.get('db:connection') + '/' + config.get('db:name'), config.get('db:options'))
  .then(() => console.log('connection succesful'))
  .catch((err) => console.error(err));

module.exports = mongoose;
