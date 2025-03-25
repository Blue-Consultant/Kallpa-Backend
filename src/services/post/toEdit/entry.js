const _ = require('lodash');
const db = require('../../../databases/dialect/mysql');
const logger = require('../../../utils/logger');
const errors = require('../../../utils/errors');
const Promises = require('bluebird');
const typeErrors = require('../../../constants/errors');

const { DONT_EXISTS } = typeErrors;
const {
  sequelize,
  sequelize: { models },
} = db;

module.exports = (obj = {}) =>
  new Promises((resolve, reject) =>
    sequelize
      .transaction((t) => {
        const { id } = obj;

        return models.post
          .findOne({
            where: { id },
            transaction: t,
          })
          .then((post) => {
            _.isEmpty(post) &&
              errors({
                code: DONT_EXISTS.DONT_EXISTS_POST,
                message: `Publicación no registrada!`,
                detail: {
                  message: `Publicación no registrada!`,
                },
              });

            return post;
          });
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        logger.error(
          `Error: /services/post/toEdit/entry.js => ${error.toString()}`
        );
        reject(error);
      })
  );
