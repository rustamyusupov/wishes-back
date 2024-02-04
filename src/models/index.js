const defaultData = require('./constants.js');

const getData = async () => {
  // const db = await JSONFilePreset('db.json', defaultData);

  return defaultData;
};

module.exports = { getData };
