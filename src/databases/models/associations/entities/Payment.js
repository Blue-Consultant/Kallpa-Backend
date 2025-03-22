module.exports = ({ models }) => {
  // Definir asociaciones en un solo bloque
  models.payment.belongsTo(models.user, { foreignKey: "user_id" });
  models.payment.belongsTo(models.plan, { foreignKey: "plan_id" });
};
