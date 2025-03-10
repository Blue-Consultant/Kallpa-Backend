module.exports = ({ sequelize, DataTypes }) => {
  const Tags_categorie = sequelize.define(
    'tag_category',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: 'tags_categories',
      timestamps: false,
    }
  );

  return Tags_categorie;
};
