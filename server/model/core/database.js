const mysql = require("mysql2");
const db = mysql.createPoolCluster();

db.add("code_exam", {
  host: "43.200.131.181",
  user: "root",
  password: "@Slsksh671201@",
  database: "code_exam",
  port: 3306,
});

module.exports.db = db;
