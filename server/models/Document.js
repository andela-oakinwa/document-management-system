/**
 * Document model
 */
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    documentId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'This field cannot be empty.'
        }
      }
    },
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'public',
      validate: {
        notEmpty: {
          message: 'This field cannot be empty.'
        },
        isIn: {
          values: [['public', 'private', 'role']],
          message: 'public, private or role required'
        },
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'This field cannot be empty.'
        }
      }
    },
    ownerRoleId: {
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: (models) => {
        Document.belongsTo(models.User, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Document;
};
