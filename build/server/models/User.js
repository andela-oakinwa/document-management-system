'use strict';

var bcrypt = require('bcrypt-nodejs');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: true }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 2
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        User.hasMany(models.Document, { foreignKey: 'ownerId' });
        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
          onDelete: 'SET NULL'
        });
      }
    },
    instanceMethods: {
      generateHash: function generateHash() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
      },
      validPassword: function validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
    hooks: {
      beforeCreate: function beforeCreate(user) {
        user.generateHash();
      },
      beforeUpdate: function beforeUpdate(user) {
        if (user.changed.password) {
          user.generateHash();
        }
      }
    }
  });
  return User;
};