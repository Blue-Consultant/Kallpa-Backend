const _ = require('lodash');
const R = require('ramda');

const capitalization = (str) => {
  if (str) {
    let escp = String(str).split(' ');
    let to = R.map((s) => _.capitalize(_.toLower(s)), escp).join(' ');
    return to;
  } else {
    return null;
  }
};

module.exports = { capitalization };
