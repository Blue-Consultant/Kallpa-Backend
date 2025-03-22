const isLogged = require("../../middlewares/getUser");
const Controller = require("../../controllers/auth");
// const PlanController = require("../../controllers/plans");

module.exports = (router) => {
  router.get("/user", isLogged, Controller.user);
  // router.get("/plans", isLogged, PlanController.getPlans);

  router.post("/login", Controller.login);
};
