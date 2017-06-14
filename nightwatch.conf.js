require('babel-register')();
require('env2')('.env');

module.exports = require('./nightwatch.json');