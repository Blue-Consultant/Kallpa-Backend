const isLogged = require('../../middlewares/getUser');
const Controller = require('../../controllers/auth');

module.exports = (router) => {
  router.get('/user', isLogged, Controller.user);

  router.post('/login', Controller.login);
};
