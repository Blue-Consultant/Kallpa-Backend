const _ = require("lodash");
const db = require("../../databases/dialect/mysql");
const logger = require("../../utils/logger");
const errors = require("../../utils/errors");
const Promises = require("bluebird");
const typeErrors = require("../../constants/errors");

const { DONT_EXISTS } = typeErrors;
const {
  sequelize,
  sequelize: { models },
} = db;

module.exports = () =>
  new Promises((resolve, reject) =>
    sequelize
      .transaction((t) => {
        return models.plan
          .findAll({
            where: { status: 1 }, // Solo los planes activos
            attributes: [
              "id",
              "name",
              "moneda",
              "price",
              "duration_days",
              "description",
              "benefits",
            ],
            transaction: t,
          })
          .then((plans) => {
            if (_.isEmpty(plans)) {
              return errors({
                code: DONT_EXISTS.DONT_EXISTS_PLAN,
                message: "No hay planes disponibles",
                detail: {
                  message: "No hay planes disponibles en la base de datos.",
                },
              });
            }
            return plans;
          })
          .catch((err) => {
            logger.error(`Error al obtener los planes: ${err.toString()}`);
            reject(
              errors({
                code: "DB_ERROR",
                message: "Error al consultar los planes",
                detail: { message: err.toString() },
              })
            );
          });
      })
      .then((result) => resolve(result))
      .catch((error) => reject(error))
  );
