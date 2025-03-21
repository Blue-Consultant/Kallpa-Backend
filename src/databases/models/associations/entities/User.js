module.exports = ({ models }) => {
  // Definir asociaciones en un solo bloque
  models.user.belongsTo(models.role, { foreignKey: "role_id" });
  models.user.hasMany(models.post, { foreignKey: "user_id" });
};
