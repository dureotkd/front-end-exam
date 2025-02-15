const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);

const port = 8000;

const cors = require("cors");

const fs = require("fs");
const multer = require("multer");

const session = require("express-session");
const cookieParser = require("cookie-parser");

const model = require("./model/core");
const Model = new model();
// const UserModel = require("./model/user/userModel");
app.use("trust proxy", 1);
app.use(
  cors({
    origin: "https://exam-six-cyan.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "THISSECRET",
    resave: false,
    saveUninitialized: true,
    proxy: true, // 왜 proxy true하니까 됐을까?? (공부 필요..)
    cookie: {
      secure: true, // HTTPS 환경에서만 작동 (프론트/백 둘 다 HTTPS 필요)
      httpOnly: true, // JavaScript에서 쿠키 접근 방지 (보안 강화)
      sameSite: "none", // Cross-Origin 요청 허용
    },
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
  console.log(req.session);

  const { loginUser } = req.session;

  const path_array = req.path.split("/");
  const req_name = path_array[path_array.length - 1];
  const 로그인필요없는요청 = ["login", "logout", "join"];

  if (로그인필요없는요청.includes(req_name) === false && empty(loginUser)) {
    res.status(401).send("");
    return;
  }

  next();
});

// ===================================== 소켓 =================================

const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

const socketDB = {
  room: {},
};

io.on("connection", (socket) => {
  const socket_id = socket.id;

  socket.on("클라이언트방에넣기", (user) => {
    if (empty(user)) {
      return;
    }

    const user_seq = user.seq;
    socketDB.room[socket_id] = user_seq;
  });

  socket.on("질문답변", ({ user_seq, body }) => {
    if (!empty(socketDB.room)) {
      const now_date = get_now_date();
      const res_now_date = timeForToday(now_date);

      for (let 소켓아이디 in socketDB.room) {
        const 특정회원번호 = socketDB.room[소켓아이디];

        if (특정회원번호 == user_seq) {
          const 데이터값 = body[user_seq];
          데이터값.now_date = res_now_date;

          io.to(소켓아이디).emit("질문답변", body[user_seq]);
        }
      }
    }
  });

  socket.on("disconnect", () => {
    delete socketDB.room[socket_id];
  });
});

// ===================================== 소켓 =================================

app.get("/", (req, res) => {
  res.send("Hello.");
});

app.get("/test", (req, res) => {
  res.send({
    title: "HELLO",
    body: "zzz",
  });
});

app.get("/login", (req, res) => {
  const result = {
    code: "fail",
    msg: "로그인 실패입니다..?aaa",
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

  const last_exam_seq = !empty(user_row.last_exam_seq)
    ? user_row.last_exam_seq
    : 1;

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

  const sql = Model.getDuplicateQuery({
    table: "exam",
    insertData: {
      level: level,
      title: title,
      body: body,
      category: "javascript",
      answer: answer,
      reg_date: now_date,
      edit_date: now_date,
    },
    updateData: {
      title: title,
      level: level,
      body: body,
      answer: answer,
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
  const { seq, answer, code, user_answer } = req.body;

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

    const exam_answer = !empty(exam_row.answer)
      ? JSON.parse(exam_row.answer)
      : "";

    if (empty(exam_answer)) {
      result.code = "error";
      result.message = "정답 미등록 문제입니다";
      break;
    }

    if (empty(user_answer)) {
      result.code = "error";
      result.message = "오답입니다";
      break;
    }

    /**
     *
     */
    let complete = deepEqual(exam_answer, answer);
    let complete_2 = false;

    console.log(exam_answer, user_answer);
    console.log(user_answer);

    for (let i = 0; i < exam_answer.length; i++) {
      if (deepEqual(exam_answer[i], user_answer)) {
        complete_2 = true;
        break;
      }
    }

    console.log(`complete - ${complete} complete_2 - ${complete_2}`);

    if (complete) {
      console.log("정답입니다.");
    } else {
      result.code = "error";
      result.message = "오답입니다";
      break;
    }

    const 사용자답변코드 = code.replaceAll("'", '"');
    const exam_result_duplicate_sql = Model.getDuplicateQuery({
      table: "exam_result",
      insertData: {
        result_body: 사용자답변코드,
        user_seq: loginUser.seq,
        exam_seq: seq,
        reg_date: now_date,
        edit_date: now_date,
      },
      updateData: {
        result_body: 사용자답변코드,
        edit_date: now_date,
      },
    });

    await Model.excute({
      sql: exam_result_duplicate_sql,
      type: "exec",
    });

    const last_exam_row = await Model.excute({
      database: "code_exam",
      sql: `SELECT * FROM code_exam.exam ORDER BY reg_date DESC LIMIT 1`,
      type: "row",
    });

    result.last_yn = last_exam_row.seq == seq ? "Y" : "N";
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

app.get("/alaram", async (req, res) => {
  const { loginUser } = req.session;

  const question_sql = `SELECT *, (SELECT name FROM user WHERE a.user_seq = seq LIMIT 1) as user_name,(SELECT title FROM exam WHERE a.exam_seq = seq LIMIT 1) as exam_title FROM question a WHERE a.user_seq='${loginUser.seq}' AND view_yn = 'N'`;
  const question_all = await Model.excute({ sql: question_sql, type: "all" });

  res.send(question_all);
});

app.get("/question", async (req, res) => {
  const question_sql = `SELECT *, (SELECT name FROM user WHERE a.user_seq = seq LIMIT 1) as user_name,(SELECT title FROM exam WHERE a.exam_seq = seq LIMIT 1) as exam_title FROM question a`;
  const question_all = await Model.excute({ sql: question_sql, type: "all" });

  const question_all_data = [];

  if (!empty(question_all)) {
    for (let key in question_all) {
      const row = question_all[key];

      const file_all = await Model.excute({
        sql: `SELECT * FROM file WHERE target_seq = ${row.seq} AND target_table = 'question'`,
        type: "all",
      });

      row.files = file_all;
      question_all_data.push(row);
    }
  }

  res.send(question_all_data);
});

app.post("/question/answer", async (req, res) => {
  const { exam_seq, user_seq, body } = req.body;

  const now_date = get_now_date();

  const update_sql = Model.getUpdateQuery({
    table: "question",
    data: {
      answer_body: body,
      edit_date: now_date,
    },
    where: [`exam_seq = '${exam_seq}'`, `user_seq = '${user_seq}'`],
  });

  await Model.excute({
    sql: update_sql,
    type: "exec",
  });

  res.send({
    code: "success",
    message: "답변완료",
  });
});

app.post("/question", upload.array("files"), async (req, res) => {
  const { exam_seq, title, body } = replaceAllObject(req.body, "'", '"');
  const files = req?.files || [];

  const loginUser = req.session.loginUser;

  const result = {
    code: "success",
    message: "질문이 등록되었습니다",
  };

  for (let {} in [1]) {
    if (empty(exam_seq)) {
      result.code = "error";
      result.message = "시험정보 부족";
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

  const question_sql = Model.getInsertQuery({
    table: "question",
    data: {
      title: title,
      body: body,
      exam_seq: exam_seq,
      user_seq: loginUser.seq,
      reg_date: now_date,
      edit_date: now_date,
    },
  });

  const anser_insert_seq = await Model.excute({
    sql: question_sql,
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
          target_table: "question",
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

app.get("/exam-result", async (req, res) => {
  const { seq } = req.query;
  const sql = `SELECT * FROM exam_result a,user b WHERE a.user_seq = b.seq AND a.exam_seq = '${seq}' LIMIT 1`;

  const exam_result_all = await Model.excute({
    sql: sql,
    type: "all",
  });

  res.send(exam_result_all);
});

// ========================== 키보드 마우스 후킹 시작 ================================

app.get("/hook", (req, res) => {
  res.send("/");
});

// ========================== 키보드 마우스 후킹 시작 ================================

// ========================== exam_result ==========================

server.listen(port, () => {
  const dir = "../client/public/uploads";

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

function replaceAllObject(obj, replace, str) {
  let res = {};

  for (let key in obj) {
    const x = obj[key];
    const r = x.replaceAll(replace, str);
    res[key] = r;
  }

  return res;
}

function deepEqual(x, y) {
  // Check if both values are arrays
  if (Array.isArray(x) && Array.isArray(y)) {
    // Compare lengths first
    if (x.length !== y.length) return false;
    // Recursively compare each element
    for (let i = 0; i < x.length; i++) {
      if (!deepEqual(x[i], y[i])) return false;
    }
    return true;
  } else {
    // If not arrays, compare values as strings
    return String(x) === String(y);
  }
}
