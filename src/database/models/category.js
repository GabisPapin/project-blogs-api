const schemaCategories = (sequelize, DataTypes) => {
  const tableCategories = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
  }, 
  {
    timestamps: false
  });

  return tableCategories;
};

module.exports = schemaCategories;