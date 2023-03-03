const mysql = require('mysql');
const config = require('../bin/config');
const util = require('util');
const db = mysql.createConnection(config.db);
const query = util.promisify(db.query).bind(db);
db.connect();
module.exports = {
  query,
};
