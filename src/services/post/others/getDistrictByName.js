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
        const { province } = obj;

        const filters = {
          status: 1,
          country_id: { [Op.not]: null },
        };

        const mapFilter = {
          province: { province_code: province },
        };

        R.keys(obj).forEach((key) => {
          if (mapFilter[key]) {
            Object.assign(filters, mapFilter[key]);
          }
        });

        return models.ubigeo
          .findAll({
            where: filters,
            attributes: ['id', ['district_code', 'code'], ['district', 'name']],
            transaction: t,
          })
          .then((districts) => {
            return districts;
          });
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        logger.error(
          `Error: /services/post/others/getDistrictByName.js => ${error.toString()}`
        );
        reject(error);
      })
  );
