// src/databases/models/index.js

const User = require("./security/User");
const Plan = require("./billing/Plan");
const Subscription = require("./billing/Subscription");
const Payment = require("./billing/Payment");
const Role = require("./security/Role");
const Post = require("./post/Post");
const OptionPlan = require("./billing/OptionPlan");

const Associations = require("./associations");

module.exports = ({ sequelize, DataTypes }) => {
  // Exportar todos los modelos en un solo objeto
  const models = {
    User: User({ sequelize, DataTypes }),
    Role: Role({ sequelize, DataTypes }),
    Plan: Plan({ sequelize, DataTypes }),
    Subscription: Subscription({ sequelize, DataTypes }),
    Payment: Payment({ sequelize, DataTypes }),
    Post: Post({ sequelize, DataTypes }),
    OptionPlan: OptionPlan({ sequelize, DataTypes }),
  };

  // Aplica las asociaciones después de definir los modelos
  Associations({ sequelize, DataTypes, models });

  return models;
};
