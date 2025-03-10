const cors = require("cors");
const morgan = require("morgan");
const router = require("express-enrouten");
const express = require("express");
const cookieParser = require("cookie-parser");

const config = require("./configs");
const logger = require("./utils/logger");

const ws = () => ({ uri: 'api' });

const app = express();

app.use(express.static('static'));

const routes = Object.freeze({
  v1: {
    resources: {
      path: `/api/v1/`,
      middleware: router({
        directory: ws().uri,
        routerOptions: {
          caseSensitive: true
      }
      }),
    },
    swagger: {},
  },
});

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// app.use(cookieParser());}

app.use(
  morgan(config.environment === "production" ? "combined" : "tiny", {
    stream: logger.stream,
  })
);

app.use(
  cors({
    origin: '*',
    methods: ['GET, HEAD, PUT, PATCH, POST, DELETE'],
    exposedHeaders: ['Content-Disposition'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    'Access-Control-Allow-Private-Network': true,
  })
);

app.use(routes.v1.resources.path, routes.v1.resources.middleware);



module.exports = app;
