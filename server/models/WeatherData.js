module.exports = (sequelize, DataTypes) => {
  const WeatherData = sequelize.define("WeatherData", {
    timestamp: {
      type: DataTypes.DATE, // full date + time
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  WeatherData.associate = (models) => {
    WeatherData.belongsTo(models.Users, {
      foreignKey: "userId",
    });
  };

  return WeatherData;
};
