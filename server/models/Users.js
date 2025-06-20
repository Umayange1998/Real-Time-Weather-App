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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
   
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
       type: DataTypes.ENUM("admin", "user"), 
      allowNull: false,
      defaultValue: "user",
    },
   
  });
  
  Users.associate = (models) => {
    Users.hasMany(models.WeatherData, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
  };
    return Users;
};
