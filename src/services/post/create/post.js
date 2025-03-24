const db = require('../../../databases/dialect/mysql');
const Promises = require('bluebird');

const { capitalization } = require('../../../utils/customs');
const {
  sequelize: { models },
} = db;

module.exports = (obj = {}) =>
  Promises.try(() => {
    const { t, user, title, content, district } = obj;

    const dataToSave = {
      title: capitalization(title),
      content,
      user_id: user?.id ?? 1,
      ubigeo_id: JSON.parse(district)?.id,
      created_at: new Date(),
    };

    return models.post
      .create(dataToSave, {
        transaction: t,
      })
      .then((saved) => ({ ...obj, post_id: saved?.id }));
  });
