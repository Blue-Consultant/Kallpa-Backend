module.exports = ({ sequelize, DataTypes }) => {
  const OptionPlan = sequelize.define(
    "optionplan",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      plan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "plans",
          key: "id",
        },
      },
      option_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      option_value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "plan_options",
      timestamps: false,
    }
  );

  return OptionPlan;
};
