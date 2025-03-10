const config = require('../../../configs');
const logger = require('../../../utils/logger');
const Models = require('structureDbm/importModels');

const { EOL } = require('os');
const { fn, col, Op, Sequelize, DataTypes, QueryTypes } = require('sequelize');

const isProduction = (config.environment === 'production' && true) || false;

const compose =
  (...fn) =>
  (x) =>
    fn.reduceRight((y, f) => f(y), x);

const sequelize = new Sequelize(
  config.pgDataBase.database,
  config.pgDataBase.username,
  config.pgDataBase.password,
  {
    dialect: 'postgres',
    logging: isProduction ? false : (msg) => logger.debug(msg),
    host: config.pgDataBase.host,
    port: config.pgDataBase.port,
    timezone: '-05:00',
    dialectOptions: {
      multipleStatements: true,
    },
    pool: {
      max: 40,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const imports = ({ sequelize, DataTypes }) => {
  Models({ sequelize, DataTypes });
  return { sequelize };
};

compose(imports)({ sequelize, DataTypes });

module.exports = { fn, col, Op, sequelize, DataTypes, QueryTypes, Sequelize };
