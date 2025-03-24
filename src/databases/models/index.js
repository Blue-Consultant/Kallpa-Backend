/**
 * @description
 * Import models - General Section
 */
const Ubigeo = require('./general/Ubigeo');

/**
 * @description
 * Import models - Post Section
 */
const Post = require('./post/Post');
const PostImage = require('./post/PostImage');

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
  Ubigeo({ sequelize, DataTypes });

  // TODO: adding models - Post
  Post({ sequelize, DataTypes });
  PostImage({ sequelize, DataTypes });

  // TODO: adding models - Security
  Role({ sequelize, DataTypes });
  User({ sequelize, DataTypes });

  // TODO: adding associations
  Associations({ sequelize });
};
