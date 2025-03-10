const err_code = require("err-code");

module.exports = ({ code, message, detail }) => {
  throw err_code(new Error(message), code, { detail });
};
