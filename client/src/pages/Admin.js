import React from "react";

// Toast 에디터
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "prismjs/themes/prism.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import Prism from "prismjs"; // prism 테마 추가

import "@toast-ui/editor/dist/i18n/ko-kr";

import "@toast-ui/editor/dist/toastui-editor.css";

import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { InputLabel } from "../components";
import ajax from "../apis/ajax";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigation = useNavigate();
  const editorRef = React.useRef("");
  const [data, setData] = React.useState({
    level: 0,
    title: "",
  });
  const [body, setBody] = React.useState("");

  const 문제내자 = React.useCallback(async () => {
    await ajax
      .post("/exam", {
        data: data,
        body: body,
      })
      .then(({ data: { code, data } }) => {
        if (code === "success") {
          navigation("/exam/" + data);
        }
      });
  }, [body, data, navigation]);

  const 기본정보넣자 = React.useCallback(({ target: { name, value } }) => {
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }, []);

  const 에디터내용가져오자 = React.useCallback(() => {
    const data = editorRef.current.getInstance().getHTML();
    setBody(data);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>### 문제</h2>
      <InputLabel
        onChange={기본정보넣자}
        item={{
          label: "제목",
          name: "title",
          placeholder: "제목 입력해~",
          value: data.title,
        }}
      />
      <select
        name="level"
        defaultValue={data.level}
        onChange={기본정보넣자}
        style={{ padding: 12, width: 200, marginLeft: 30, marginBottom: 20 }}
      >
        <option value="1">초급</option>
        <option value="2">중급</option>
        <option value="3">고급</option>
      </select>
      <Editor
        ref={editorRef}
        onChange={에디터내용가져오자}
        theme="dark"
        placeholder="내용을 입력해주세요."
        previewStyle="vertical" // 미리보기 스타일 지정
        height="800px" // 에디터 창 높이
        initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
        toolbarItems={[
          // 툴바 옵션 설정
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "image", "link"],
          ["code", "codeblock"],
        ]}
        plugins={[colorSyntax, codeSyntaxHighlight]}
        language="ko-KR"
      />
      <button
        onClick={문제내자}
        style={{
          backgroundColor: "#4981f8",
          transition: "background-color .3s",
          color: "#fff",
          border: "none",
          width: "100%",
          padding: "1.2rem 1.5rem",
          bottom: 0,
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        문제내자
      </button>
    </div>
  );
}

export default Admin;
