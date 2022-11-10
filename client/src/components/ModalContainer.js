import React from "react";

import { BsCheckLg } from "react-icons/bs";

import ajax from "../apis/ajax";
import { empty } from "../helpers";
import { InputLabel, CodeMirror } from "../components/index";
import { UserContext } from "../App";

function AnotherPeopleAnswer() {
  const pathname = window.location.pathname.split("/");
  const seq = pathname[pathname.length - 1];

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      await ajax
        .get("/exam-result", {
          params: {
            seq: seq,
          },
        })
        .then(({ status, data }) => {
          if (status === 200) {
            setData(data);
          }
        });

      setLoading(false);
    })();
  }, [seq]);

  if (loading) {
    return <div>Loading중</div>;
  }

  if (empty(data)) {
    return <div>답없어</div>;
  }

  return (
    <table style={{ width: "100%" }}>
      <tbody>
        {data &&
          data.map((item) => {
            return (
              <tr>
                <td>
                  <div key={item.seq} className="another_exam_result_wrap">
                    <div className="exam_result_code_wrap" key={item.seq}>
                      <CodeMirror
                        height="700px"
                        value={item.result_body}
                        options={{ readOnly: true }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

function Problem() {
  const pathname = window.location.pathname.split("/");
  const seq = pathname[pathname.length - 1];

  const [list, setList] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      await ajax.get("/all/exam").then(({ status, data }) => {
        if (status === 200) {
          setList(data);
        }
      });
    })();
  }, []);

  const 문제이동하자 = React.useCallback((seq) => {
    window.location = `/exam/${seq}`;
  }, []);

  const totalCount = list.length;

  return (
    <div className="modal-children-box">
      <h2>문제</h2>

      <div>
        <table className="ui celled table">
          <thead>
            <tr>
              <th>번호</th>
              <th>상태</th>
              <th>난이도</th>
              <th>제목</th>
              <th>진행중인 사람</th>
              <th>정답률</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {!empty(list) ? (
              list.map((item, index) => {
                // eslint-disable-next-line eqeqeq
                const active = item.seq == seq ? "active" : "";

                return (
                  <tr
                    className={active}
                    key={`exam-list-${index}`}
                    onClick={문제이동하자.bind(this, item.seq)}
                  >
                    <td style={{ width: 50 }}>{totalCount - index}</td>
                    <td style={{ width: 50 }}>
                      {item.status === "SUCCESS" && (
                        <BsCheckLg size={15} color="green" />
                      )}
                    </td>
                    <td style={{ width: 100 }}>{item.level_name}</td>
                    <td style={{ fontWeight: "bold" }}>{item.title}</td>
                    <td style={{ width: 110 }}>{item.user_len}</td>
                    <td style={{ width: 80 }}>{item.percent}</td>
                    <td style={{ width: 100 }}>{item.date}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  ?!?
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function QuestionForm() {
  const pathname = window.location.pathname.split("/");
  const seq = pathname[pathname.length - 1];

  const [inputs, setInputs] = React.useState([
    {
      label: "제목",
      name: "title",
      value: "",
      placeholder: "제목을 입력해 주세요",
    },
    {
      label: "내용",
      name: "body",
      value: "",
      placeholder: "문제와 관련된 질문을 구체적으로 작성해 주세요.",
    },
  ]);

  const [files, setFiles] = React.useState([]);

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

  const 드래그드랍되었을떄 = React.useCallback(
    (event) => {
      if (event.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...event.dataTransfer.items].forEach((item, i) => {
          if (item.kind === "file") {
            const file = item.getAsFile();
            console.log(`… file[${i}].name = ${file.name}`);

            const cloneFiles = [...files];
            cloneFiles.push(file);
            setFiles(cloneFiles);
          }
        });
      }
    },
    [files]
  );

  const 파일삭제 = React.useCallback(
    (deleteIndex) => {
      const newFiles = [...files].filter((item, index) => {
        return deleteIndex !== index;
      });
      setFiles(newFiles);
    },
    [files]
  );

  const 질문제출 = React.useCallback(async () => {
    const form = new FormData();

    form.append("exam_seq", seq);

    if (!empty(inputs)) {
      inputs.forEach(({ name, value }) => {
        form.append(name, value);
      });
    }

    if (!empty(files)) {
      files.forEach((file) => {
        form.append("files", file);
      });
    }

    await ajax.post("/question", form, {
      "Content-Type": "multipart/form-data",
    });
  }, [files, inputs, seq]);

  return (
    <div className="modal-children-box">
      <h2>질문하기</h2>
      <div style={{ marginTop: 40 }}>
        {inputs &&
          inputs.map((item, index) => {
            return (
              <InputLabel
                key={`input-label-${index}`}
                style={{ marginTop: 16 }}
                item={item}
                onChange={handleInputValue}
              />
            );
          })}
        <div onDrop={드래그드랍되었을떄} style={{ position: "relative" }}>
          <div className="file-drop-box" />
          <h3 className="file-description">FILE DROP</h3>
          <input
            className="file-absolute"
            data-dropbox="file"
            type="file"
            accept="image/*"
          />
        </div>
        {!empty(files) &&
          files.map((item, index) => {
            return (
              <div
                key={`files-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "75%",
                  justifyContent: "space-between",
                  marginTop: 12,
                }}
              >
                <p>
                  {index + 1}. {item.name}
                </p>
                <button
                  className="exam-btn"
                  onClick={파일삭제.bind(this, index)}
                  style={{
                    backgroundColor: "#b71c1c",
                    borderRadius: 4,
                  }}
                >
                  삭제
                </button>
              </div>
            );
          })}
        <button
          onClick={질문제출}
          className="exam-btn"
          style={{ marginTop: 16, width: "100%" }}
        >
          제출
        </button>
      </div>
    </div>
  );
}

function Alarm() {
  const { alarmData, setAlarmData } = React.useContext(UserContext);

  React.useEffect(() => {
    return () => {
      setAlarmData((prev) => {
        return {
          isAlaram: false,
          data: [],
        };
      });
    };
  }, [setAlarmData]);

  return (
    <div className="modal-children-box">
      <h2>알림</h2>
      <div className="alaram_wrap">
        {!empty(alarmData.data) ? (
          <div style={{ marginTop: 12 }}>
            {alarmData.data.map(({ body, item }, index) => {
              return (
                <div key={index} style={{ marginBottom: 12 }}>
                  <p>{item.title}</p>
                  <p>답변 : {body}</p>
                  <p>날짜 : {item.now_date}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div>없음</div>
        )}
      </div>
    </div>
  );
}

function MyQuestion() {
  return (
    <div className="modal-children-box">
      <h2>나의질문</h2>
    </div>
  );
}

function ModalContainer({ showModal: { show, code, component } }) {
  const { setShowModal } = React.useContext(UserContext);

  const Component = component;

  React.useEffect(() => {
    const 바디클릭 = (event) => {
      if (show === false) {
        return;
      }

      if (event?.target?.className === "modal-bg") {
        setShowModal({
          show: false,
          component: null,
        });
        return;
      }
    };

    window.addEventListener("click", 바디클릭);

    return () => {
      window.removeEventListener("click", 바디클릭);
    };
  }, [setShowModal, show]);

  return (
    <React.Fragment>
      <div
        className="modal-bg"
        style={
          show
            ? {
                opacity: 1,
              }
            : {
                opacity: 0,
                zIndex: -10000,
              }
        }
      />
      <div
        className="modal"
        style={
          show
            ? {
                top: "5%",
              }
            : {
                top: "-100%",
              }
        }
      >
        {Component && <Component />}
        {
          {
            QUESTION: <QuestionForm />,
            PROBLEM: <Problem />,
            ANOTHER_PEOPLE_ANSWER: <AnotherPeopleAnswer />,
            ALARM: <Alarm />,
            MYQUESTION: <MyQuestion />,
          }[code]
        }
      </div>
    </React.Fragment>
  );
}

export default React.memo(ModalContainer);
