module.exports = ({ sequelize, DataTypes }) => {
  const Subscription = sequelize.define(
    "subscription",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "plans",
          key: "id",
        },
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
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
      tableName: "subscriptions",
      timestamps: false,
    }
  );
  return Subscription;
};
