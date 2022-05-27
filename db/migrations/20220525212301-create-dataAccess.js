module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dataAccess', {
      client_id: {
        primaryKey: true,
        type: Sequelize.STRING,
        allowNull: false,
      },
      expires_in: {
        type: Sequelize.DATE,
      },
      access_token: {
        type: Sequelize.TEXT,
      },
      refresh_token: {
        type: Sequelize.TEXT,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('dataAccess');
  },
};
