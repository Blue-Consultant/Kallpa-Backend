const R = require('ramda');
const db = require('../../../databases/dialect/mysql');
const logger = require('../../../utils/logger');
const Promises = require('bluebird');

const { capitalization } = require('../../../utils/customs');
const {
  Op,
  sequelize,
  sequelize: { models },
} = db;

module.exports = (obj = {}) =>
  new Promises((resolve, reject) =>
    sequelize
      .transaction((t) => {
        const filters = {};
        const { page = 1, limit = 10, title, ubigeo_id } = obj;

        const mapFilter = {
          title: {
            title: {
              [Op.like]: `%${capitalization(title)}%`,
            },
          },
          ubigeo_id: { ubigeo_id },
        };

        R.keys(obj).forEach((key) => {
          if (mapFilter[key]) {
            Object.assign(filters, mapFilter[key]);
          }
        });

        return models.disease
          .count({
            where: filters,
            transaction: t,
          })
          .then((totalRows) => {
            let offset = limit * page - limit;

            return models.disease
              .findAll({
                where: filters,
                order: [['id', 'DESC']],
                limit,
                offset,
                transaction: t,
              })
              .then((data) => {
                return { data, rows: totalRows };
              });
          });
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        logger.error(
          `Error: /services/disease/list/entry.js => ${error.toString()}`
        );
        reject(error);
      })
  );
