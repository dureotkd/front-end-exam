import React from "react";
import { useNavigate } from "react-router-dom";

import ajax from "../apis/ajax";

import { AuthLayout } from "../components";
import { util_helper } from "../helpers";

function Join(param) {
  const navigation = useNavigate();

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
        .then(({ data: { code, message } }) => {
          if (code === "success") navigation("/");
        });
    },
    [inputs, navigation]
  );

  return (
    <AuthLayout
      onSubmit={handleJoin}
      onChange={handleInputValue}
      inputs={inputs}
      disabled={disabled}
    />
  );
}

export default Join;
