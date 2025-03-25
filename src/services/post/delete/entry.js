const _ = require('lodash');
const R = require('ramda');
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
        const { id, status } = obj;

        return models.post
          .findOne({
            where: { id },
            transaction: t,
          })
          .then((post) => {
            let isEmpty = _.isEmpty(post);

            const whenIs = {
              true() {
                return errors({
                  code: DONT_EXISTS.DONT_EXISTS_POST,
                  message: `Publicación no registrada!`,
                  detail: {
                    message: `Publicación no registrada!`,
                  },
                });
              },
              false() {
                const whenIs = {
                  true: {
                    active: false,
                  },
                  false: {
                    active: true,
                  },
                };

                return models.post
                  .update(
                    { ...whenIs[status ?? true] },
                    {
                      where: { id },
                      transaction: t,
                    }
                  )
                  .then(() => true);
              },
            };

            return R.call(R.prop(isEmpty, whenIs));
          });
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        logger.error(
          `Error: /services/post/delete/entry.js => ${error.toString()}`
        );
        reject(error);
      })
  );
