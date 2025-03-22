const Services = require("../../services/optionplan"); // Importa el servicio de planes
const { StatusCodes } = require("http-status-codes");
const logger = require("../../utils/logger");

module.exports = {
  getOptionsPlans(req, res) {
    return Services()
      .then((data) => {
        res.status(StatusCodes.OK).json(data);
      })
      .catch((error) => {
        logger.error(
          `Error en /controllers/options/plans: ${error.toString()}`
        );
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message }); // Maneja errores
      });
  },
};
