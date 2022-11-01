import React from "react";
import { Link } from "react-router-dom";

import ajax from "../apis/ajax";

const InputLabel = React.memo(
  ({ item: { label, name, value, placeholder }, onChange }) => {
    let type = name.startsWith("password") ? "password" : "text";
    if (name === "email") type = "email";

    return (
      <div style={{ padding: "1.15rem 1.9rem" }}>
        <p style={{ fontWeight: "bold", fontSize: 15 }}>{label}</p>
        <input
          onChange={onChange}
          type={type}
          name={name}
          value={value}
          style={{
            marginTop: 10,
            border: "1px solid #d2d2d2",
            padding: 12,
            borderRadius: 3,
            width: "100%",
          }}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

function Join(param) {
  const [inputs, setInputs] = React.useState([
    {
      label: "이름",
      name: "name",
      value: "성민",
      placeholder: "이름을 입력해 주세요",
    },
    {
      label: "이메일",
      name: "email",
      value: "dureotkd123@naver.com",
      placeholder: "이메일을 입력해 주세요",
    },
    {
      label: "비밀번호",
      name: "password",
      value: "slsksh33",
      placeholder: "영문자,숫자 포함 최소 8~20자",
    },
    {
      label: "비밀번호 재확인",
      name: "password_confirm",
      value: "slsksh33",
      placeholder: "비밀번호를 확인해 주세요",
    },
  ]);

  const disabled = React.useMemo(() => {
    let confirm_cnt = 0;
    let result = true;

    inputs.forEach(({ name, value }) => {
      switch (name) {
        case "name":
          if (value.length > 0) {
            confirm_cnt++;
          }
          break;

        case "email":
          if (value.length > 3 && value.includes("@")) {
            confirm_cnt++;
          }

          break;
        case "password":
          const alpha_pattern = /[a-zA-z]/;
          const number_pattern = /[0-9]/;

          if (
            value.length > 7 &&
            value.length < 21 &&
            alpha_pattern.test(value) &&
            number_pattern.test(value)
          ) {
            confirm_cnt++;
          }

          break;
        case "password_confirm":
          if (inputs[2].value === value) {
            confirm_cnt++;
          }

          break;

        default:
          break;
      }
    });

    if (inputs.length === confirm_cnt) {
      result = false;
    }

    return result;
  }, [inputs]);

  const handleInputValue = React.useCallback(
    ({ target: { name, value } }) => {
      console.log(name, value);
      const clonePrev = [...inputs];
      const findIndex = clonePrev.findIndex((item) => {
        return item.name === name;
      });
      clonePrev[findIndex].value = value;
      setInputs(clonePrev);
    },
    [inputs]
  );

  const handleJoin = React.useCallback(
    async (event) => {
      event.preventDefault();

      const input_value = {};

      inputs.forEach((item) => {
        if (item.name === "password_confirm") return true;
        input_value[item.name] = item.value;
      });

      await ajax
        .post("/join", {
          input_value,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
    },
    [inputs]
  );

  return (
    <div
      className="App"
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleJoin}
        className="children-color-black"
        style={{
          position: "relative",
          background: "blue",
          backgroundColor: "#fff",
          width: "80%",
          maxWidth: 600,
          height: 600,
          borderRadius: 12,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            backgroundColor: "#F4F4F4",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
          s
        >
          <Link
            style={{ padding: 14, width: "50%", textAlign: "center" }}
            to="/login"
          >
            로그인
          </Link>
          <Link
            style={{ padding: 14, width: "50%", textAlign: "center" }}
            to="/join"
          >
            회원가입
          </Link>
        </div>

        {inputs.map((item, index) => {
          return (
            <InputLabel
              key={`input-label-${index}`}
              item={item}
              onChange={handleInputValue}
            />
          );
        })}

        <button
          disabled={disabled}
          style={{
            backgroundColor: disabled ? "#c8c8c8" : "#4981f8",
            transition: "background-color .3s",
            color: "#fff",
            border: "none",
            width: "100%",
            padding: "1.2rem 1.5rem",
            position: "absolute",
            bottom: 0,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Join;
