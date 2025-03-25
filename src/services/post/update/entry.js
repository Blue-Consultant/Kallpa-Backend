const db = require('../../../databases/dialect/mysql');
const logger = require('../../../utils/logger');
const Promises = require('bluebird');

const { capitalization } = require('../../../utils/customs');
const {
  sequelize,
  sequelize: { models },
} = db;

module.exports = (obj = {}) =>
  new Promises((resolve, reject) =>
    sequelize
      .transaction((t) => {
        const { id, title, content, ubigeo_id } = obj;

        const dataToUpdate = {
          title: capitalization(title),
          content,
          ubigeo_id,
          updated_at: new Date(),
        };

        return models.post
          .update(dataToUpdate, {
            where: { id },
            transaction: t,
          })
          .then(() => true);
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        logger.error(
          `Error: /services/post/update/entry.js => ${error.message}`
        );
        reject(error);
      })
  );
