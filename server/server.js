const express = require("express");
const app = express();
const port = 4000;

const cors = require("cors");

const session = require("express-session");
const cookieParser = require("cookie-parser");

const model = require("./model/core");
const Model = new model();
// const UserModel = require("./model/user/userModel");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "THISSECRET",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello.");
});

app.post("/join", async (req, res) => {
  const { input_value } = req.body;

  const result = {
    code: "success",
    message: "회원가입 성공",
  };

  const user_row_sql = `SELECT * FROM code_exam.user WHERE email = '${input_value.email}'`;
  const user_row = await Model.excute({
    database: "code_exam",
    sql: user_row_sql,
    type: "row",
  });

  if (user_row) {
    result.code = "error";
    result.message = "회원가입 실패 [중복이메일 존재]";

    res.send(result);
    return;
  }

  const insert_sql = Model.getInsertQuery({
    table: "user",
    data: input_value,
  });

  const insert_seq = await Model.excute({
    database: "code_exam",
    sql: insert_sql,
    type: "exec",
  });

  result.seq = insert_seq;

  res.send(result);
});

app.listen(port, () => {
  console.log("서버시작");
});
