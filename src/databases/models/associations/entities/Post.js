module.exports = ({ models }) => {
  // Definir asociaciones en un solo bloque
  models.post.belongsTo(models.user, { foreignKey: "user_id" });
};
