module.exports = ({ models }) => {
  models.user.belongsTo(models.role, { foreignKey: 'role_id' });
};
