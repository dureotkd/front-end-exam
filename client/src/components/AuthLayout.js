import React from "react";

import { Link, useLocation } from "react-router-dom";

import { InputLabel } from "./";

function AuthLayout({ onSubmit, onChange, inputs, disabled }) {
  const location = useLocation();
  const pathname = location.pathname.substring(1);

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
        onSubmit={onSubmit}
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
            style={{
              padding: 14,
              width: "50%",
              textAlign: "center",
              color: pathname === "" ? "#4981f8" : "inherit",
              fontWeight: pathname === "" ? "bold" : "400",
            }}
            to="/"
          >
            로그인
          </Link>
          <Link
            style={{
              padding: 14,
              width: "50%",
              textAlign: "center",
              color: pathname === "join" ? "#4981f8" : "inherit",
              fontWeight: pathname === "join" ? "bold" : "400",
            }}
            to="/join"
          >
            회원가입
          </Link>
        </div>

        {inputs &&
          inputs.map((item, index) => {
            return (
              <InputLabel
                key={`input-label-${index}`}
                item={item}
                onChange={onChange}
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
          {pathname === "" ? "로그인" : "회원가입"}
        </button>
      </form>
    </div>
  );
}

export default React.memo(AuthLayout);
