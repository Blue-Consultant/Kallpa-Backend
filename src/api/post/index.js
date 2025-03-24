const isLogged = require('../../middlewares/getUser');
const Controller = require('../../controllers/post');
const uploadImagePost = require('../../middlewares/uploadImagePost');

module.exports = (router) => {
  // router.use(isLogged);

  router.get('/list', Controller.list);
  router.get('/to/edit', Controller.toEdit);
  router.get('/search/district', Controller.getDistrictByName);
  router.get('/search/province', Controller.getProvinceByName);
  router.get('/search/department', Controller.getDepartmentByName);

  router.post('/create', uploadImagePost.array('images'), Controller.create);

  router.put('/update', Controller.update);

  router.delete('/create', Controller.delete);
};
