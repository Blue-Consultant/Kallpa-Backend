const db = require('../../../databases/dialect/mysql');
const logger = require('../../../utils/logger');
const Promises = require('bluebird');

const {
  Op,
  sequelize,
  sequelize: { models },
} = db;

module.exports = (obj = {}) =>
  new Promises((resolve, reject) =>
    sequelize
      .transaction((t) => {
        return models.ubigeo
          .findAll({
            where: {
              status: 1,
              country_id: { [Op.not]: null },
            },
            attributes: [
              [
                sequelize.fn('DISTINCT', sequelize.col('department_code')),
                'code',
              ],
              ['department', 'name'],
            ],
            transaction: t,
          })
          .then((departments) => {
            return departments;
          });
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        logger.error(
          `Error: /services/post/others/getDepartmentByName.js => ${error.toString()}`
        );
        reject(error);
      })
  );
