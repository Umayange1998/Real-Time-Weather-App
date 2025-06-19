const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    first_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weather_data: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {}, 
    },
  });
    return Users;
};
