const _ = require("lodash");
const db = require("../../databases/dialect/mysql");
const logger = require("../../utils/logger");
const errors = require("../../utils/errors");
const typeErrors = require("../../constants/errors");

const { DONT_EXISTS } = typeErrors;
const {
  sequelize,
  sequelize: { models },
} = db;

module.exports = () => {
  return sequelize.transaction((t) => {
    return models.optionplan
      .findAll({
        attributes: ["id", "plan_id", "option_name", "option_value"],
        transaction: t,
      })
      .then((optionplanes) => {
        if (_.isEmpty(optionplanes)) {
          const error = errors({
            code: DONT_EXISTS.DONT_EXISTS_PLAN,
            message: "No hay opciones de planes disponibles",
            detail: {
              message:
                "No hay opciones de planes disponibles en la base de datos.",
            },
          });
          throw error; // Lanzamos el error para propagarlo y manejarlo
        }
        return optionplanes;
      })
      .catch((err) => {
        logger.error(`Error al obtener los planes: ${err.toString()}`);
        throw errors({
          code: "DB_ERROR",
          message: "Error al consultar los planes",
          detail: { message: err.toString() },
        });
      });
  });
};
