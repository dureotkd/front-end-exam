import React from "react";

import { useNavigate } from "react-router-dom";

import ajax from "../apis/ajax";
import { UserContext } from "../App";

function Header({ navigation }) {
  const { setShowModal } = React.useContext(UserContext);

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
        <img
          className="profile-img"
          style={{ width: 24, borderRadius: 4, cursor: "pointer" }}
          src="https://avatars.githubusercontent.com/u/63378895?v=4"
          alt="profile"
        />
      </div>
      {navi && (
        <div className="navigation-ui">
          <h3 onClick={모달컨트롤.bind(this, "ALARM")}>알림</h3>
          <h3 onClick={모달컨트롤.bind(this, "PROBLEM")}>문제</h3>
          <h3 onClick={모달컨트롤.bind(this, "MYPAGE")}>마이페이지</h3>
          <h3 className="red" onClick={로그아웃}>
            로그아웃
          </h3>
        </div>
      )}
    </div>
  );
}

export default Header;
