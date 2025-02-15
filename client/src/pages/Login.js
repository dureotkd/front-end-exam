import React from "react";
import { AuthLayout } from "../components";
import ajax from "../apis/ajax";

function Login(param) {
  const [inputs, setInputs] = React.useState([
    {
      label: "이메일",
      name: "email",
      value: "test@naver.com",
      placeholder: "이메일을 입력해 주세요",
    },
    {
      label: "비밀번호",
      name: "password",
      value: "@TEST12345@",
      placeholder: "비밀번호를 입력해 주세요",
    },
  ]);

  const disabled = React.useMemo(() => {
    let confirm_cnt = 0;
    let result = true;

    if (inputs.length === confirm_cnt) {
      result = false;
    }

    inputs.forEach(({ name, value }) => {
      switch (name) {
        case "email":
          if (value.length > 0 && value.includes("@")) {
            confirm_cnt++;
          }

          break;
        case "password":
          if (value.length > 0) {
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

  const handleLogin = React.useCallback(
    async (event) => {
      event.preventDefault();

      const input_value = {};

      inputs.forEach((item) => {
        input_value[item.name] = item.value;
      });

      await ajax
        .post("/login", {
          input_value,
        })
        .then(({ data: { code, token, direct_url } }) => {
          if (code === "success") {
            window.localStorage.setItem("jwt", token);
            window.location.href = direct_url;
          }
        });
    },
    [inputs]
  );

  const handleInputValue = React.useCallback(
    ({ target: { name, value } }) => {
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
    <AuthLayout
      onSubmit={handleLogin}
      onChange={handleInputValue}
      inputs={inputs}
      disabled={false}
    />
  );
}

export default Login;
