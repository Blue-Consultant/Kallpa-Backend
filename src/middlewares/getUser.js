const R = require('ramda');
const jwt = require('jsonwebtoken');
const config = require('../configs');
const Service = require('../services/auth');

const { StatusCodes } = require('http-status-codes');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization)
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: 'No token, authorization denied', code: 'UNAUTHORIZED' });

  let token = authorization.split(' ')[1];

  jwt.verify(token, config?.encripted?.tokenKey, (err, user) => {
    if (err)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: err?.message, code: 'UNAUTHORIZED' });
    return Service.user
      .entry({ ...user })
      .then((res) => {
        req.user = { ...R.compose(JSON.parse, JSON.stringify)(res) };
        return next();
      })
      .catch((err) => {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: 'Error de conexión', code: 'BAD_REQUEST' });
      });
  });
};
