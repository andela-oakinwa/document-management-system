/**
 * User model
 */
import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already exist.'
      },
      validate: {
        is: {
          args: /\w+/g,
          msg: 'Input a valid username.'
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty.'
        },
        is: {
          args: /\w+/g,
          msg: 'Input a valid firstname.'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty.'
        },
        is: {
          args: /\w+/g,
          msg: 'Input a valid firstname.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        value: true,
        msg: 'Email already exist.'
      },
      validate: {
        isEmail: {
          value: true,
          msg: 'Input a valid email address.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  }, {
    validate: {
      validatePassword() {
        if (this.password.length !== null && (!(/\w+/g.test(this.password))
          || (this.password.length < 8))) {
          throw new Error('Minimum of 8 characters is required');
        }
      }
    },
    classMethods: {
      associate(models) {
        User.hasMany(models.Document, { foreignKey: 'ownerId' });
        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
          onDelete: 'CASCADE'
        });
      }
    },
    instanceMethods: {
      generateHash() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
      },
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },
    },
    hooks: {
      beforeCreate(user) {
        user.generateHash();
      },
      beforeUpdate(user) {
        if (user._changed.password) {
          user.generateHash();
        }
      }
    }
  });
  return User;
};
