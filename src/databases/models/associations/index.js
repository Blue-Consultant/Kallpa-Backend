// src/databases/models/associations/index.js

const User = require("./entities/User");
const PaymentAssociations = require("./entities/Payment");
const SubscriptionAssociations = require("./entities/Suscription");
const PostAssociations = require("./entities/Post");

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
};
