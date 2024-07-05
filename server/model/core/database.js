const mysql = require("mysql2");
const db = mysql.createPoolCluster();

db.add("code_exam", {
  host: "211.238.133.10",
  user: "root",
  password: "@slsksh33@",
  database: "code_exam",
  port: 3306,
});

module.exports.db = db;
