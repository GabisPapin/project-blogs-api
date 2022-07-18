const schemaBlogPost = (sequelize, DataTypes) => {
  const tableBlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  },
  {
    createdAt: 'published',
    updatedAt: 'updated'
  });

  tableBlogPost.associate = (models) => {
    tableBlogPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return tableBlogPost;
};

module.exports = schemaBlogPost;