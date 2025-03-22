const isLogged = require("../../middlewares/getUser");
// const Controller = require("../../controllers/auth");
const PlanController = require("../../controllers/plans");
const OptionPlanController = require("../../controllers/optionplan");

module.exports = (router) => {
  router.get("/plans", PlanController.getPlans);
  router.get("/options/plans", OptionPlanController.getOptionsPlans);
};
