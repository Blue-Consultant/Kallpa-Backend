const db = require('../../../databases/dialect/mysql');
const logger = require('../../../utils/logger');
const Promises = require('bluebird');

const fnPost = require('./post');
const fnImage = require('./image');

const { sequelize } = db;

module.exports = (obj = {}) =>
  new Promises((resolve, reject) =>
    sequelize
      .transaction((t) => {
        return fnPost({ ...obj, t }).then((fnP) => {
          return fnImage({ ...fnP }).then((fnI) => fnI);
        });
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        logger.error(
          `Error: /services/post/create/entry => ${error.toString()}`
        );
        reject(error);
      })
  );
