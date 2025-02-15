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
        window.localStorage.removeItem("jwt");
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
          style={{
            width: 24,
            borderRadius: 4,
            cursor: "pointer",
            marginTop: 5,
          }}
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAASFBMVEXw8PB3xdTX5en69PL08vGTzNhyw9Ntw9Kd0NvT4+d5xtRvwtPa5+pxxNP08vCPy9jq7u5jwNG/3OOm0tz+9vSFyNa72+Ku1d7kOy6EAAADxElEQVR4nO2djXKiQBCE/YFdZUFOo3fv/6ZHBD1RU/ZeDUu7didUIGWG+bZnQCvrulhIkiRJkiRJkiRJ0qeqgESZ1Q4K9WuFqE6MaJhVsQqueaXlvl1PDhWflYeyKlZu+Vq+TE1ol9U7E4bsCVEPG0pCu6w+wUMRvj+h+nAeQnkYQ5i/hyIU4RQSoQinimUnEcYR6o4/D6GqVIS3sdSH8xDKwxjC/D0UoQinkG0fcl5p8vdQhCK8jcXZh4nv+FVD6SH6H1LfK4RuO3+fd/u9bjd0O2FfHq/zH7C5G1HaPRzWfTKhTyAMKfrr4XnDZhcUdVsCOm3SqjwBSbVf0AyRYg3ouNm/nhvxk0L0X3jn6yOSFwKIqdggfWGoZpt4Ak+x8UkBK5eeMCQlXM5AiNyf7CQPpyBM62H+hKrSKQjz91B9aCv14RSE+VepPLSV+nAKQnlorOw9nOM1vjy0lZ6XTkGoKhVhnPLvQ93xpyDMvw/loa3Uh1MQykNjzUCY9v+HHaFl9og2rqq64um+q5s8qqe7r1SdH3yJNfwcH1bd68PRBIbn8yMMV42oS+9eC+zVJ394v9v4Q228aoQbvr73mn+/uBz6U719rQPE10KhHtmHwz6l82a7asTxaZmMVScPlXheG2coyxlktISGaZkN1o6VkDEUaVq2HqoPI9JiHCzSgae9W5B6yJiWqpSaEJp+TluljAVPWloiFOE4FmPz0HrIOFikAy/COELG0iJ9Pz7nYJGWFm2VMoYiLS3aPmQMRZqW+jCOkHHgVaUiHMfS3WKOtFSlIhzHYiwt9eFshIyhaD3Uq6cYQsbSoq1SxlCkadESMrY06cCLMI6QsbTk4WyEjOVAOvCf0Iekz9oYB4u0tGirlDEUaWnR9iFjKNK01IdxhIwDryoVIX9an3ClIfWQcbBoCfP3UH0YQ5i/hyKch1DX0hhCLC3oTfT9ihD917AWxMOh43w/ftMCizjUh/slEJ7Jn6BQQFKmhEt3XUziusBEv3LDzaFzv4H1IFalH0K5m+3+EMnJlhBSs0U+osVuIRjLPoSELQxkuFxRcg9pCe08hJZVlYcREuHnEKoPYdF6KEJcIKHZ8n20hG98pcneQ/Xh+xPSeqhXT7BoCfWsDRath7qWwqL1UNdSWPkTqg9FGC1daS6E6kNY+XtIS6g+hEVLKA9xgYRmJ4QWe+0IfafQb+H753/L7THCfdM/fjhb8E9PHH7cvW576NMfFnVbWqmtkSH9Y3bC9gv6MJpibafkJ0TOJ0mSJEmSJEmSJEk56i+zk7G+y6HSlQAAAABJRU5ErkJggg=="
          alt="profile"
        />
      </div>
      {navi && (
        <div className="lg:w-[300px] w-[150px] navigation-ui">
          <h3
            className="text-md"
            onClick={() => {
              alert("준비중입니다");
            }}
          >
            알림
            {!empty(alarmData.data) && (
              <span style={{ color: "#000" }}>({alarmData.data.length})</span>
            )}
          </h3>
          <h3 className="text-md" onClick={모달컨트롤.bind(this, "PROBLEM")}>
            문제
          </h3>
          <h3 className="text-md" onClick={모달컨트롤.bind(this, "MYQUESTION")}>
            나의질문
          </h3>
          <h3 className="text-md red" onClick={로그아웃}>
            로그아웃
          </h3>
        </div>
      )}
    </div>
  );
}

export default React.memo(Header);
