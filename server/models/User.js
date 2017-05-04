/**
 * User model
 */
import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        value: true,
        message: 'Username already exist.'
      },
      validate: {
        is: {
          pattern: /\w+/g,
          message: 'Input a valid username.'
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'This field cannot be empty.'
        },
        is: {
          pattern: /\w+/g,
          message: 'Input a valid firstname.'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'This field cannot be empty.'
        },
        is: {
          pattern: /\w+/g,
          message: 'Input a valid firstname.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        value: true,
        message: 'Email already exist.'
      },
      validate: {
        isEmail: {
          value: true,
          message: 'Input a valid email address.'
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
