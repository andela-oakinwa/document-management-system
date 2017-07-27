module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      ownerId: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      ownerRoleId: {
        type: Sequelize.INTEGER
      },
      access: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'public',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Documents');
  }
};
