const schemaUser = (sequelize, DataTypes) => {
  const tableUser = sequelize.define('User', {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  });

  return tableUser;
};

module.exports = schemaUser;