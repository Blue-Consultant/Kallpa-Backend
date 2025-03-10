const api = require('./src/api');
const http = require('http');
const config = require('./src/configs');
const logger = require('./src/utils/logger');
const connection = require('./src/databases/dialect/mysql');

const {
  entries: { port, host },
} = config;

const server = http.createServer(api);

/* server.listen(port, host, () => {
  logger.info(
    `SERVER RUNNING ON PORT: ${port}, AND CONNECTION TO THE DB HAS BEEN ESTABLISHED`
  );
}); */

connection.sequelize
  .authenticate()
  .then(() => {
    server.listen(port, host, () => {
      logger.info(
        `SERVER RUNNING ON PORT: ${port}, AND CONNECTION TO THE DB HAS BEEN ESTABLISHED`
      );
    });
  })
  .catch((error) => {
    logger.error(
      'UNABLE TO CONNECT TO THE DATABASE AND SERVER STOPED',
      error.toString()
    );
  });
