const mysql = require("mysql2");
const db = mysql.createPoolCluster();

db.add("code_exam", {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "code_exam",
  port: 3306,
});

module.exports.db = db;
