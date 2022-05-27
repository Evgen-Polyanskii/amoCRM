const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class dataAccess extends Model {}

  dataAccess.init({
    client_id: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_in: {
      type: DataTypes.DATE,
    },
    access_token: {
      type: DataTypes.TEXT,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    timestamps: false,
    modelName: 'dataAccess',
    tableName: 'dataAccess',
  });
  return dataAccess;
};
