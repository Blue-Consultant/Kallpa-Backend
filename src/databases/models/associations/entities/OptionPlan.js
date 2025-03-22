module.exports = ({ models }) => {
  // Definir asociaciones en un solo bloque
  models.optionplan.belongsTo(models.plan, { foreignKey: "plan_id" });
};
