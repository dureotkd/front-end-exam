import React from "react";
import { UserContext } from "../App";

function Main(param) {
  const loginUser = React.useContext(UserContext);

  console.log(loginUser);

  return (
    <div
      className="App"
      style={{ width: "90%", maxWidth: 1050, margin: "0px auto" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "20%", maxWidth: 100, borderRadius: "50%" }}
          src="https://dl.memuplay.com/new_market/img/com.vicman.newprofilepic.icon.2022-06-07-21-33-07.png"
          alt="프로필"
        />
        <div
          style={{
            marginLeft: "2.5rem",
            borderBottom: "1px solid #fff",
            paddingBottom: 12,
          }}
        >
          <div style={{ fontSize: "1.6rem" }}>{loginUser.name}</div>
          <div style={{ marginTop: 6 }}>{loginUser.email}</div>
        </div>
      </div>

      <div className="box-shadow-01" style={{ marginTop: 24 }}>
        asdas
      </div>
    </div>
  );
}

export default Main;
