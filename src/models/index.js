const path = require('path');
const defaultData = require('./constants.js');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const getData = async () => {
  const dbPath = path.join(__dirname, 'db.json');
  const adapter = new FileSync(dbPath, { defaultValue: defaultData });
  const db = lowdb(adapter);

  return db;
};

module.exports = { getData };
