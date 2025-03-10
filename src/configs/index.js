const path = require('path');
const dotenv = require('dotenv');

const environment = ['test', 'production', 'development'].find(
  (e) => e === process.env.NODE_ENV
);

const pathEnv = path.normalize(
  path.join(process.cwd(), `env/.env.${environment || 'development'}`)
);

const result = dotenv.config({ path: pathEnv });

if (result.error) {
  throw result.error;
}

const isProduction = environment === 'production';

module.exports = Object.freeze({
  name: 'API-KALLPA',
  environment,
  isProduction,
  entries: {
    port: process.env.PORT,
    host: process.env.HOST,
  },
  logger: {
    info: process.env.LOG_INFO,
    error: process.env.LOG_ERROR,
    request: process.env.LOG_REQUEST,
  },
  databaseMongo: {
    main_path_mongo: process.env.MAIN_PATH_MONGO,
    names: {
      api_frame: process.env.NAME_DB_MONGO_API_FRAME,
    },
  },
  pgDataBase: {
    host: process.env.MAIN_PG_HOST,
    post: process.env.MAIN_PG_PORT,
    username: process.env.MAIN_PG_USER,
    database: process.env.NAME_DB_PG,
    password: process.env.MAIN_PG_PASSWORD,
  },
  mysqlDataBase: {
    host: process.env.MAIN_MYSQL_HOST,
    post: process.env.MAIN_MYSQL_PORT,
    username: process.env.MAIN_MYSQL_USER,
    database: process.env.NAME_DB_MYSQL,
    password: process.env.MAIN_MYSQL_PASSWORD,
  },
  authApi: {
    baseUrl: process.env.AUTH_API,
  },
  encripted: {
    tokenKey: process.env.TOKEN_KEY,
    cryptoKey: process.env.CRYPTO_KEY,
    saltRounds: process.env.SALTS_ROUNDS,
  },
});
