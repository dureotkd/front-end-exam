const express = require("express");
const app = express();
const port = 4000;

const cors = require("cors");

const fs = require("fs");
const multer = require("multer");
const path = require("path");
const mime = require("mime");

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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + ".png");
  },
});
const upload = multer({ storage });

app.use((req, res, next) => {
  const { loginUser } = req.session;

  const path_array = req.path.split("/");
  const req_name = path_array[path_array.length - 1];
  const 로그인필요없는요청 = ["login", "logout", "join"];

  if (로그인필요없는요청.includes(req_name) === false && empty(loginUser)) {
    // res.status(401).send({
    //   code: "error",
    //   message: "로그인 후 이용해주세요",
    // });
    // return;
  }

  next();
});

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

  if (!user_row) {
    result.code = "error";
    result.message = "로그인 실패 [정보 불일치]";

    res.send(result);
    return;
  }

  const last_exam_seq = user_row.last_exam_seq;

  result.direct_url = `/exam/${last_exam_seq}`;

  req.session.loginUser = user_row;
  req.session.save();

  res.send(result);
});

app.post("/logout", (req, res) => {
  const result = {
    code: "success",
  };

  req.session.destroy(function () {
    req.session;
  });

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

  const now_date = get_now_date();

  input_value.reg_date = now_date;
  input_value.edit_date = now_date;
  input_value.last_exam_seq = 1;

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
  const { loginUser } = req.session;
  const { seq } = req.query;

  const now_date = get_now_date();

  const exam_row = await Model.excute({
    database: "code_exam",
    sql: `SELECT * FROM exam a WHERE a.seq = '${seq}'`,
    type: "row",
  });

  let user_ids = exam_row.user_ids;

  if (user_ids.includes(`${loginUser.seq}/`) === true) {
    res.send(exam_row);
    return;
  }

  user_ids += `${loginUser.seq}/`;

  const update_sql = Model.getUpdateQuery({
    table: "exam",
    data: {
      user_ids: user_ids,
      edit_date: now_date,
    },
    where: [`seq = ${seq}`],
  });

  await Model.excute({
    sql: update_sql,
    type: "exec",
  });

  res.send(exam_row);
});

app.get("/all/exam", async (req, res) => {
  const { loginUser } = req.session;

  const { cnt } = await Model.excute({
    database: "code_exam",
    sql: `SELECT COUNT(*) as cnt FROM exam`,
    type: "row",
  });

  // get_paging();

  const exam_all = await Model.excute({
    database: "code_exam",
    sql: `SELECT * FROM exam`,
    type: "all",
  });

  const exam_all_data = [];

  const level_vo = {
    1: "초급",
    2: "중급",
    3: "고급",
  };

  if (!empty(exam_all)) {
    exam_all.forEach((item) => {
      const success_user_ids = item?.success_user_ids || "";
      const user_ids = item?.user_ids || "";
      const status = success_user_ids.includes(loginUser.seq + "/")
        ? "SUCCESS"
        : "";

      const success_len = !empty(success_user_ids)
        ? success_user_ids.split("/").length - 1
        : 0;
      console.log(user_ids);

      const user_len = !empty(user_ids) ? user_ids.split("/").length - 1 : 0;

      const percent =
        !empty(user_len) && !empty(success_len)
          ? ((success_len / user_len) * 100).toFixed(0) + "%"
          : "";

      item.percent = percent;
      item.user_len = user_len;
      item.status = status;
      item.level_name = level_vo[item.level];
      item.date = timeForToday(item.reg_date);

      exam_all_data.push(item);
    });
  }

  res.send(exam_all_data);
});

app.post("/exam", async (req, res) => {
  const {
    data: { level, title, answer },
    body,
  } = req.body;

  const now_date = get_now_date();

  const sql = Model.getInsertQuery({
    table: "exam",
    data: {
      level: level,
      title: title,
      body: body,
      category: "javascript",
      answer: answer,
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

/** */
app.post("/answer", async (req, res) => {
  const { loginUser } = req.session;
  const { seq, answer, code } = req.body;

  const now_date = get_now_date();
  const result = {
    code: "success",
  };

  for (let {} in [1]) {
    if (!seq) {
      result.code = "error";
      result.message = "필수값 부족";
      break;
    }

    if (answer.length === 0) {
      result.code = "error";
      result.message = "코드실행 후 제출해주세요";
      break;
    }

    const exam_row = await Model.excute({
      database: "code_exam",
      sql: `SELECT * FROM code_exam.exam WHERE seq = ${seq}`,
      type: "row",
    });

    if (empty(exam_row)) {
      result.code = "error";
      result.message = "문제가 존재하지 않습니다";
      break;
    }

    if (exam_row.answer != answer[answer.length - 1]) {
      result.code = "error";
      result.message = "오답입니다";
      break;
    }

    const last_exam_row = await Model.excute({
      database: "code_exam",
      sql: `SELECT * FROM code_exam.exam ORDER BY reg_date DESC LIMIT 1`,
      type: "row",
    });

    result.last_yn = last_exam_row.seq == seq ? "Y" : "N";

    const exam_result_duplicate_sql = Model.getDuplicateQuery({
      table: "exam",
      insertData: {
        body: code,
        user_seq: loginUser.seq,
        exam_seq: seq,
        reg_date: now_date,
        edit_date: now_date,
      },
      updateData: {
        result_body: code,
        edit_date: now_date,
      },
    });

    const success_user_ids = exam_row?.success_user_ids || "";

    /**
     * 정답을 처음 맞출 경우
     */
    if (success_user_ids.includes(loginUser.seq) === false) {
      // ========================== 성공 처리 ==========================

      const update_sql = Model.getUpdateQuery({
        table: "exam",
        data: {
          success_user_ids: success_user_ids + loginUser.seq + "/",
          edit_date: now_date,
        },
        where: [`seq = ${seq}`],
      });

      await Model.excute({
        database: "code_exam",
        sql: update_sql,
        type: "exec",
      });

      // ========================== 성공 처리 ==========================

      // ========================== 다음 문제 처리 ==========================

      const last_exam_seq =
        last_exam_row.seq == seq ? last_exam_row.seq : parseInt(seq) + 1;

      // 회원 다음 문제 처리
      const user_update_sql = Model.getUpdateQuery({
        table: "user",
        data: {
          last_exam_seq: last_exam_seq,
          edit_date: now_date,
        },
        where: [`seq = ${loginUser.seq}`],
      });

      await Model.excute({
        database: "code_exam",
        sql: user_update_sql,
        type: "exec",
      });

      // ========================== 다음 문제 처리 ==========================
    }
  }

  if (result.code === "error") {
    res.send(result);
    return;
  }

  res.send(result);
});

app.post("/question", upload.array("files"), async (req, res) => {
  const { title, body } = req.body;
  const files = req?.files || [];

  const loginUser = req.session.loginUser;

  const result = {
    code: "success",
    message: "질문이 등록되었습니다",
  };

  for (let {} in [1]) {
    if (empty(loginUser)) {
      result.code = "error";
      result.message = "로그인 후 이용해주세요";
      break;
    }

    if (empty(title)) {
      result.code = "error";
      result.message = "제목을 입력해주세요";
      break;
    }
    if (empty(body)) {
      result.code = "error";
      result.message = "내용을 입력해주세요";
      break;
    }
  }

  if (result.code === "error") {
    res.send(result);
    return;
  }
  const now_date = get_now_date();

  const answer_sql = Model.getInsertQuery({
    table: "answer",
    data: {
      title: title,
      body: body,
      user_seq: loginUser.seq,
      reg_date: now_date,
      edit_date: now_date,
    },
  });

  const anser_insert_seq = await Model.excute({
    sql: answer_sql,
    type: "exec",
  });

  if (!empty(files)) {
    for (let key in files) {
      const { mimetype, size, path, filename } = files[key];
      const time = Date.now();

      const file_sql = Model.getInsertQuery({
        table: "file",
        data: {
          name: `${time}_${filename}`,
          origin_name: filename,
          path: path,
          mime: mimetype,
          byte: size,
          target_table: "answer",
          target_seq: anser_insert_seq,
          reg_date: now_date,
          edit_date: now_date,
        },
      });

      await Model.excute({
        sql: file_sql,
        type: "exec",
      });
    }
  }

  res.send(result);
});

// ========================== exam_result ==========================

app.post("/exam-result", async (req, res) => {
  const { loginUser } = req.params;
  const { seq, updateData } = req.body;

  const now_date = get_now_date();

  updateData.reg_date = now_date;
  updateData.edit_date = now_date;

  const duplicate_sql = Model.getDuplicateQuery({
    table: "exam_result",
    insertData: {
      ...updateData,
      user_seq: 1,
      exam_seq: seq,
    },
    updateData: updateData,
  });

  console.log(duplicate_sql);

  // await Model.excute({
  //   database: "code_exam",
  //   sql: duplicate_sql,
  //   type: "exec",
  // });

  res.send({
    code: "success",
  });
});

// ========================== exam_result ==========================

app.listen(port, () => {
  const dir = "../client/uploads";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
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

function timeForToday(value) {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}

// 넘어온 값이 빈값인지 체크합니다.
// !value 하면 생기는 논리적 오류를 제거하기 위해
// 명시적으로 value == 사용
// [], {} 도 빈값으로 처리
var empty = function (value) {
  if (
    value == "" ||
    value == null ||
    value == undefined ||
    (value != null && typeof value == "object" && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};
