const R = require('ramda');
const db = require('../../../databases/dialect/mysql');
const Promises = require('bluebird');

const {
  sequelize: { models },
} = db;

module.exports = (obj = {}) =>
  Promises.try(() => {
    const { t, files, post_id } = obj;

    const dataToSave = R.map(
      (file) => ({
        url: file?.path,
        post_id,
        created_at: new Date(),
      }),
      files
    );

    console.log({ dataToSave });

    return models.post_image
      .bulkCreate(dataToSave, {
        transaction: t,
      })
      .then(() => true);
  });
