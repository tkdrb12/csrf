const { v4 } = require('uuid');

const makeToken = () => {
  const uuid = v4();

  return 'TEST-TOKEN:' + uuid;
};

module.exports = { makeToken };
