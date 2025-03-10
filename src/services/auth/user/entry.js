const db = require('../../../databases/dialect/mysql');
const logger = require('../../../utils/logger');
const Promises = require('bluebird');

const {
  sequelize,
  sequelize: { models },
} = db;

module.exports = (obj = {}) =>
  new Promises((resolve, reject) =>
    sequelize
      .transaction((t) => {
        const { id } = obj;

        return models.user
          .findOne({
            where: { id },
            include: [
              {
                model: models.role,
                attributes: ['id', 'code', 'name'],
              },
            ],
            attributes: ['id', 'name', 'phone', 'email', 'address'],
            transaction: t,
          })
          .then((user) => user);
      })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        logger.error(
          `Error: /services/auth/user/entry.js => ${error.toString()}`
        );
        reject(error);
      })
  );
