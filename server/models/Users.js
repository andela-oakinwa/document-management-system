/**
 * Dependencies installed
 */
import sequelize from 'sequelize';

const userSchema = new Sequelize({
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  role: String,
});