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

app.get("/login", (req, res) => {
  const result = {
    code: "fail",
  };

  const loginUser = req.session.loginUser;

  if (loginUser) {
    result.code = "success";
    result.user = loginUser;
  }

  res.send(result);
});

app.post("/login", async (req, res) => {
  const {
    input_value: { email, password },
  } = req.body;

  const result = {
    code: "success",
    message: "로그인 성공",
  };

  const user_row_sql = `SELECT * FROM code_exam.user WHERE email = '${email}' AND password = '${password}'`;
  const user_row = await Model.excute({
    database: "code_exam",
    sql: user_row_sql,
    type: "row",
  });

  console.log(user_row);

  if (!user_row) {
    result.code = "error";
    result.message = "로그인 실패 [정보 불일치]";

    res.send(result);
    return;
  }

  req.session.loginUser = user_row;
  req.session.save();

  res.send(result);
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

app.get("/exam", async (req, res) => {
  const { seq } = req.query;

  const sql = `SELECT * FROM exam a WHERE a.seq = '${seq}'`;

  console.log(req.query);

  const exam_row = await Model.excute({
    database: "code_exam",
    sql: sql,
    type: "row",
  });

  res.send(exam_row);
});

app.post("/exam", async (req, res) => {
  const {
    data: { level, title },
    body,
  } = req.body;

  const now_date = get_now_date();

  const sql = Model.getInsertQuery({
    table: "exam",
    data: {
      level: level,
      title: title,
      body: body,
      reg_date: now_date,
      edit_date: now_date,
    },
  });

  const insert_seq = await Model.excute({
    database: "code_exam",
    sql: sql,
    type: "exec",
  });

  res.send({
    code: "success",
    data: insert_seq,
  });
});

app.listen(port, () => {
  console.log("서버시작");
});

function get_now_date() {
  const today = new Date();

  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const hour = today.getHours();
  const min = today.getMinutes();
  const sec = today.getSeconds();

  const dateString = `${year}-${month}-${day} ${hour}:${min}:${sec}`;

  return dateString;
}
