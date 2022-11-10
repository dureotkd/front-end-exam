import React from "react";
import ajax from "../apis/ajax";
import { UserContext } from "../App";
import { empty } from "../helpers";
function AdminQuestion() {
  const { socketObj } = React.useContext(UserContext);

  const pathname = window.location.pathname.split("/");
  const seq = pathname[pathname.length - 1];

  const [data, setData] = React.useState([]);

  const [body, setBody] = React.useState({});

  React.useEffect(() => {
    (async () => {
      await ajax
        .get("/question", {
          params: {
            exam_seq: seq,
          },
        })
        .then(({ data }) => {
          setData(data);
        });
    })();
  }, [seq, socketObj]);

  const 답변값저장 = React.useCallback(
    (item, { target: { value } }) => {
      const cloneBody = { ...body };

      cloneBody[item.user_seq] = {
        item: item,
        body: value,
      };
      setBody(cloneBody);
    },
    [body]
  );

  const 답변보내기 = React.useCallback(
    async ({ exam_seq, user_seq }) => {
      const res_body = body[user_seq].body;

      await ajax.post("/question/answer", {
        exam_seq: exam_seq,
        user_seq: user_seq,
        body: res_body,
      });

      socketObj.emit("질문답변", {
        user_seq: user_seq,
        body: body,
      });
    },
    [body, socketObj]
  );

  return (
    <div style={{ padding: 30 }}>
      <h2>질문들</h2>
      <table className="ui celled table" style={{ marginTop: 30 }}>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>내용</th>
            <th>작성자</th>
            <th>이미지</th>
            <th>답변</th>
          </tr>
        </thead>
        <tbody>
          {!empty(data)
            ? data.map((item, index) => {
                return (
                  <tr key={item.seq}>
                    <td data-label="번호">{index}</td>
                    <td data-label="제목">{item.title}</td>
                    <td data-label="내용">{item.body}</td>
                    <td data-label="작성자">{item.user_name}</td>
                    <td data-label="이미지">
                      {!empty(item.files) &&
                        item.files.map((file, index) => {
                          return (
                            <div key={`file-${file.seq}`}>
                              <img
                                style={{ width: 200 }}
                                src={`${process.env.PUBLIC_URL}/uploads/${file.origin_name}`}
                                alt="이미지"
                              />
                            </div>
                          );
                        })}
                    </td>
                    <td data-label="답변">
                      <textarea
                        onChange={답변값저장.bind(this, item)}
                        placeholder="답변을 적어주세요"
                        cols="50"
                        rows="15"
                      />
                      <button
                        className="exam-btn"
                        type="button"
                        onClick={답변보내기.bind(this, item)}
                      >
                        답변보내기
                      </button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default AdminQuestion;
