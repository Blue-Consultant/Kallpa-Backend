const R = require('ramda');
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
        const { department } = obj;

        const filters = {
          status: 1,
          country_id: { [Op.not]: null },
        };

        const mapFilter = {
          department: { department_code: department },
        };

        R.keys(obj).forEach((key) => {
          if (mapFilter[key]) {
            Object.assign(filters, mapFilter[key]);
          }
        });

        return models.ubigeo
          .findAll({
            where: filters,
            attributes: [
              [
                sequelize.fn('DISTINCT', sequelize.col('province_code')),
                'code',
              ],
              ['province', 'name'],
            ],
            transaction: t,
          })
          .then((provinces) => {
            return provinces;
          });
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        logger.error(
          `Error: /services/post/others/getProvinceByName.js => ${error.toString()}`
        );
        reject(error);
      })
  );
