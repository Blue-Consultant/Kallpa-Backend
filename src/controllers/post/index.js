const Services = require('../../services/post');

const { StatusCodes } = require('http-status-codes');

module.exports = {
  list(req, res) {
    return Services.list
      .entry({ ...req.query, user: req.user })
      .then((data) => {
        res.status(StatusCodes.OK).json(data);
      })
      .catch((error) => {
        res.status(StatusCodes.BAD_REQUEST).json(error);
      });
  },
  create(req, res) {
    return Services.create
      .entry({ ...req.body, files: req.files, user: req.user })
      .then((data) => {
        res.status(StatusCodes.OK).json(data);
      })
      .catch((error) => {
        res.status(StatusCodes.BAD_REQUEST).json(error);
      });
  },
  toEdit(req, res) {
    return Services.toEdit
      .entry({ ...req.params, user: req.user })
      .then((data) => {
        res.status(StatusCodes.OK).json(data);
      })
      .catch((error) => {
        res.status(StatusCodes.BAD_REQUEST).json(error);
      });
  },
  update(req, res) {
    return Services.update
      .entry({ ...req.body, ...req.params, user: req.user })
      .then((data) => {
        res.status(StatusCodes.OK).json(data);
      })
      .catch((error) => {
        res.status(StatusCodes.BAD_REQUEST).json(error);
      });
  },
  delete(req, res) {
    return Services.delete
      .entry({ ...req.query, ...req.params, user: req.user })
      .then((data) => {
        res.status(StatusCodes.OK).json(data);
      })
      .catch((error) => {
        res.status(StatusCodes.BAD_REQUEST).json(error);
      });
  },
  getDistrictByName(req, res) {
    return Services.others
      .getDistrictByName({ ...req.query, user: req.user })
      .then((data) => {
        res.status(StatusCodes.OK).json(data);
      })
      .catch((error) => {
        res.status(StatusCodes.BAD_REQUEST).json(error);
      });
  },
  getProvinceByName(req, res) {
    return Services.others
      .getProvinceByName({ ...req.query, user: req.user })
      .then((data) => {
        res.status(StatusCodes.OK).json(data);
      })
      .catch((error) => {
        res.status(StatusCodes.BAD_REQUEST).json(error);
      });
  },
  getDepartmentByName(req, res) {
    return Services.others
      .getDepartmentByName({ ...req.query, user: req.user })
      .then((data) => {
        res.status(StatusCodes.OK).json(data);
      })
      .catch((error) => {
        res.status(StatusCodes.BAD_REQUEST).json(error);
      });
  },
};
