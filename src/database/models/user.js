const schemaUser = (sequelize, DataTypes) => {
  const tableUser = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    timestamp: false
  });

  return tableUser;
};

module.exports = schemaUser;