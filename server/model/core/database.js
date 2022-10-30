const mysql = require("mysql2");
const db = mysql.createPoolCluster();

db.add("code_exam", {
  host: "",
  user: "root",
  password: "",
  database: "code_exam",
  port: 3306,
});

module.exports.db = db;
