const express = require("express");
const app = express();
const port = 4000;

const cors = require("cors");

const session = require("express-session");
const cookieParser = require("cookie-parser");

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

app.listen(port, () => {
  console.log("서버시작");
});
