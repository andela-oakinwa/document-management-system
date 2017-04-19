/**
 * Dependencies installed
 */
const sequelize = require('sequelize');

const userSchema = new Sequelize({
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  role: String,
});