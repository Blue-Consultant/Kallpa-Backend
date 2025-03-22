module.exports = ({ models }) => {
  // Definir asociaciones en un solo bloque
  models.plan.hasMany(models.optionplan, { foreignKey: "plan_id" });
};
