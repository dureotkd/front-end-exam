import React from "react";
import ajax from "../apis/ajax";
import { empty } from "../helpers";
function AdminQuestion() {
  const pathname = window.location.pathname.split("/");
  const seq = pathname[pathname.length - 1];

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      await ajax
        .get("/question", {
          params: {
            exam_seq: seq,
          },
        })
        .then(({ data }) => {
          console.log(data);
          setData(data);
        });
    })();
  }, [seq]);

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
                console.log(item.files);
                return (
                  <tr key={item.seq}>
                    <td data-label="번호">{index}</td>
                    <td data-label="제목">{item.title}</td>
                    <td data-label="내용">{item.body}</td>
                    <td data-label="작성자">{item.user_name}</td>
                    <td data-label="이미지">
                      {!empty(item.files) &&
                        item.files.map((file, index) => {
                          <div key={`file-${file.seq}`}>
                            <img
                              style={{ width: 300 }}
                              src={`${process.env.PUBLIC_URL}/uploads/files_1667983424815.png`}
                              alt="이미지"
                            />
                          </div>;
                        })}
                    </td>
                    <td data-label="답변">
                      <textarea placeholder="답변을 적어주세요" />
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
