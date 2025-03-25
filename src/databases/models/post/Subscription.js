module.exports = ({ sequelize, DataTypes }) => {
  const Subscription = sequelize.define(
    'subscription',
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
      tableName: 'subscriptions',
      timestamps: false,
    }
  );

  return Subscription;
};
