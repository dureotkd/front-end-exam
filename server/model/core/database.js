const mysql = require("mysql2");
const db = mysql.createPoolCluster();

db.add("code_exam", {
  host: "15.165.191.73",
  user: "root",
  password: "@Slsksh33@",
  database: "code_exam",
  port: 3306,
});

module.exports.db = db;
