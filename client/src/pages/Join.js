import React from "react";
import { Link } from "react-router-dom";
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
      value: "",
      placeholder: "이름을 입력해 주세요",
    },
    {
      label: "이메일",
      name: "email",
      value: "",
      placeholder: "이메일을 입력해 주세요",
    },
    {
      label: "비밀번호",
      name: "password",
      value: "",
      placeholder: "영문자,숫자 포함 최소 8~20자",
    },
    {
      label: "비밀번호 재확인",
      name: "password_confirm",
      value: "",
      placeholder: "비밀번호를 확인해 주세요",
    },
  ]);

  const disabled = React.useMemo(() => {
    let confirm_cnt = 0;

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
          if (value.length > 3) {
            confirm_cnt++;
          }

          break;
        case "password_confirm":
          if (value.length > 3 && inputs[2].value === value) {
            confirm_cnt++;
          }

          break;

        default:
          break;
      }
    });

    if (inputs.length === confirm_cnt) {
      alert("?");
    }
  }, [inputs]);
  const handleJoin = React.useCallback((event) => {
    event.preventDefault();
  }, []);

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
          style={{
            backgroundColor: "#c8c8c8",
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
