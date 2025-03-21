module.exports = ({ models }) => {
  // Definir asociaciones en un solo bloque
  models.subscription.belongsTo(models.user, { foreignKey: "user_id" });
  models.subscription.belongsTo(models.plan, { foreignKey: "plan_id" });
};
