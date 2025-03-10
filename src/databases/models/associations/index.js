const User = require('./entities/User');

module.exports = ({ sequelize: { models } }) => {
  User({ models });
};
