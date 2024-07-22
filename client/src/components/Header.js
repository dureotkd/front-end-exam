import React from "react";

import ajax from "../apis/ajax";
import { UserContext } from "../App";
import { empty } from "../helpers";

function Header({ navigation }) {
  const { alarmData, setShowModal } = React.useContext(UserContext);

  const [navi, setNavi] = React.useState(false);
  React.useEffect(() => {
    const 화면클릭 = ({ target }) => {
      if (target.className === "profile-img") {
        return;
      }

      if (navi === true) {
        setNavi(false);
      }
    };

    window.addEventListener("click", 화면클릭);

    return () => {
      window.removeEventListener("click", 화면클릭);
    };
  }, [navi]);
  const 네비보여줘 = React.useCallback(() => {
    setNavi(!navi);
  }, [navi]);

  const 로그아웃 = React.useCallback(async () => {
    await ajax.post("/logout").then(({ data: { code } }) => {
      if (code === "success") {
        window.location.href = "/";
      }
    });
  }, []);

  const 모달컨트롤 = React.useCallback(
    (code) => {
      setShowModal({
        show: true,
        code: code,
      });
    },
    [setShowModal]
  );

  return (
    <div className="nav-bar">
      <p style={{ color: "rgb(108 108 108)" }}>{navigation}</p>
      <div onClick={네비보여줘}>
        {alarmData.isAlaram && (
          <img
            style={{
              position: "absolute",
              width: 45,
              marginRight: 12,
              top: 0,
              right: 45,
            }}
            src={`${process.env.PUBLIC_URL}/images/alaram_animation.gif`}
            alt="이미지"
          />
        )}
        <img
          className="profile-img"
          style={{ width: 24, borderRadius: 4, cursor: "pointer" }}
          src="https://avatars.githubusercontent.com/u/63378895?v=4"
          alt="profile"
        />
      </div>
      {navi && (
        <div className="navigation-ui">
          <h3
            onClick={() => {
              alert("준비중입니다");
            }}
          >
            알림
            {!empty(alarmData.data) && (
              <span style={{ color: "#000" }}>({alarmData.data.length})</span>
            )}
          </h3>
          <h3 onClick={모달컨트롤.bind(this, "PROBLEM")}>문제</h3>
          <h3 onClick={모달컨트롤.bind(this, "MYQUESTION")}>나의질문</h3>
          <h3 className="red" onClick={로그아웃}>
            로그아웃
          </h3>
        </div>
      )}
    </div>
  );
}

export default React.memo(Header);
