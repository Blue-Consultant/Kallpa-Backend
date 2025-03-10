const _ = require('lodash');
const R = require('ramda');
const db = require('../../../databases/dialect/mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const logger = require('../../../utils/logger');
const errors = require('../../../utils/errors');
const configs = require('../../../configs');
const Promises = require('bluebird');
const typeErrors = require('../../../constants/errors');

const { DONT_MATCH, DONT_EXISTS } = typeErrors;
const {
  sequelize,
  sequelize: { models },
} = db;

module.exports = (obj = {}) =>
  new Promises((resolve, reject) =>
    sequelize
      .transaction((t) => {
        const { email, password } = obj;

        return models.user
          .findOne({
            where: { email },
            attributes: ['id', 'email', 'password'],
            transaction: t,
          })
          .then((user) => {
            _.isEmpty(user) &&
              errors({
                code: DONT_EXISTS.DONT_EXISTS_USER,
                message: `Usuario no registrado!`,
                detail: {
                  message: `Usuario no registrado!`,
                },
              });

            return bcrypt.compare(password, user?.password).then((equal) => {
              const whenIs = {
                true() {
                  return errors({
                    code: DONT_MATCH.DONT_MATCH_PASSWORD,
                    message: `Contraseña incorrecta!`,
                    detail: {
                      message: `Contraseña incorrecta!`,
                    },
                  });
                },
                false() {
                  const dataToEncrypt = { id: user?.id };

                  let token = jwt.sign(
                    dataToEncrypt,
                    configs?.encripted?.tokenKey,
                    { expiresIn: 86400 }
                  );

                  return { token };
                },
              };
              return R.call(R.prop(!equal, whenIs));
            });
          });
      })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        logger.error(
          `Error: /services/auth/login/entry.js => ${error.toString()}`
        );
        reject(error);
      })
  );
