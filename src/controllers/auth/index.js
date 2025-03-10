const Services = require('../../services/auth');

const { StatusCodes } = require('http-status-codes');

module.exports = {
  user(req, res) {
    res.status(StatusCodes.OK).json({ ...req.user });
  },
  login(req, res) {
    return Services.login
      .entry({ ...req.body })
      .then((data) => {
        res.status(StatusCodes.OK).json(data);
      })
      .catch((error) => {
        res.status(StatusCodes.BAD_REQUEST).json(error);
      });
  },
};
