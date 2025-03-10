/**
 * @description
 * Import models - Setting Section
 */
// const Person = require('./setting/Person');

/**
 * @description
 * Import models - Clinic Section
 */
// const March = require('./clinic/March');

/**
 * @description
 * Import models - Security Section
 */
const Role = require('./security/Role');
const User = require('./security/User');

/**
 * @description
 * Import associations
 */
const Associations = require('./associations');

module.exports = ({ sequelize, DataTypes }) => {
  // TODO: adding models - Setting
//   Person({ sequelize, DataTypes });

  // TODO: adding models - Clinic
//   March({ sequelize, DataTypes });

  // TODO: adding models - Security
  Role({ sequelize, DataTypes });
  User({ sequelize, DataTypes });

  // TODO: adding associations
  Associations({ sequelize });
};
