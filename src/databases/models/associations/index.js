// src/databases/models/associations/index.js

const User = require("./entities/User");
const PaymentAssociations = require("./entities/Payment");
const SubscriptionAssociations = require("./entities/Suscription");
const PostAssociations = require("./entities/Post");
const PlanAssociations = require("./entities/Plan");
const OptionPlanAssociations = require("./entities/OptionPlan");

// module.exports = ({ sequelize, DataTypes, models }) => {
//   // Aplica todas las asociaciones
//   UserAssociations({ models });
//   PaymentAssociations({ models });
//   SubscriptionAssociations({ models });
// };
module.exports = ({ sequelize: { models } }) => {
  User({ models });
  PaymentAssociations({ models });
  SubscriptionAssociations({ models });
  PostAssociations({ models });
  PlanAssociations({ models });
  OptionPlanAssociations({ models });
};
