'use strict';

/**
 * Document Model
 * @return {Object} Document
 */
module.exports = function (sequelize, DataTypes) {
  var Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'public',
      validate: {
        isIn: [['private', 'public', 'role']]
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ownerRoleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        Document.belongsTo(models.User, {
          foreignKey: 'ownerId',
          onDelete: 'SET NULL'
        });
      }
    }
  });
  return Document;
};