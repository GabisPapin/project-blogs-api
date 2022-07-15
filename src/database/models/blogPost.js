const schemaBlogPost = (sequelize, DataTypes) => {
  const tableBlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
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
    timestamps: false
  });

  tableBlogPost.associate = (models) => {
    tableBlogPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return tableBlogPost;
};

module.exports = schemaBlogPost;