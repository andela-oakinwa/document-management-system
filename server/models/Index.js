/**
 * Dependencies called
 */
const fs = require('fs'),
  path = require('path'),
  Sequelize = require('sequelize'),
  configuration = require('../config/Config'),
  basename = path.basename(module.filename),
  env = process.env.NODE_ENV || 'development',
  config = configuration[env],
  db = {};

require('dotenv').config();

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.url, config);
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0)
    && (file !== basename)
    && (file.slice(-3) === '.js'));
  /* .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });*/

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
