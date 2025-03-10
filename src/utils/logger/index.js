const util = require("util");
const path = require("path");
const winston = require("winston");

const config = require("../../configs");

const LABEL = config.name;
const LIMIT_LOG = 5242880;
const MAX_FILES = 5;

const { createLogger: CreateLogger, format } = winston;

const customFormat = format.combine(
  format.label({ label: LABEL }),
  format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  format.splat(),
  format.json()
);

const myFormat = format.printf(
  (info) =>
    `${info.level}: ${util.inspect(info.message, {
      colors: true,
    })} `
);

const logger = new CreateLogger({
  transports: [
    new winston.transports.Console({
      level: "debug",
      // format: customFormat,
      format: format.combine(format.colorize(), myFormat),
      timestamp: true,
      silent: config.environment !== "development",
      colorize: false,
    }),
    new winston.transports.File({
      name: "file.info",
      level: "info",
      format: customFormat,
      // silent: config.isProduction,
      colorize: false,
      timestamp: true,
      filename: path.normalize(config.logger.info),
      maxsize: LIMIT_LOG,
      maxFiles: MAX_FILES,
    }),
    new winston.transports.File({
      name: "file.error",
      level: "error",
      format: customFormat,
      // silent: config.isProduction,
      colorize: false,
      timestamp: true,
      filename: path.normalize(config.logger.error),
      maxsize: LIMIT_LOG,
      maxFiles: MAX_FILES,
    }),
  ],
});

const reqLogger = new CreateLogger({
  transports: [
    new winston.transports.Console({
      level: "request",
      silent: config.environment !== "development",
      colorize: false,
    }),
    new winston.transports.File({
      level: "request",
      // silent: config.isProduction,
      colorize: false,
      timestamp: true,
      filename: path.normalize(config.logger.request),
      maxsize: LIMIT_LOG,
      maxFiles: MAX_FILES,
    }),
  ],
  levels: {
    request: 0,
  },
});

if (config.isProduction) {
  logger.emitErrs = false;
  reqLogger.emitErrs = false;
} else {
  logger.emitErrs = true;
  reqLogger.emitErrs = true;
}

exports = module.exports = logger;

exports.stream = {
  write: (message) => {
    reqLogger.request(message);
  },
};
