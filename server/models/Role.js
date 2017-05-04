/**
 * Roles model
 */
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        value: true,
        message: 'Role already exist.'
      },
      validate: {
        is: {
          pattern: /\w+/g,
          message: 'Input a valid title.'
        },
        notEmpty: {
          message: 'This field cannot be empty.'
        }
      }
    }
  }, {
    classMethods: {
      associate: (models) => {
        Role.hasMany(models.User, { foreignKey: 'roleId' });
      }
    }
  });
  return Role;
};
