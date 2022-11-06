import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

function CodeMirrorComponent({ options, value, onChange }) {
  React.useLayoutEffect(() => {
    // const code_mirror_wrap = document.getElementById("ode_mirror_wrap");
  }, []);

  return (
    <CodeMirror
      value={value}
      height="400px"
      readOnly={options?.readOnly || false}
      extensions={[javascript({ jsx: true })]}
      onChange={onChange}
      theme="dark"
    />
  );
}

export default React.memo(CodeMirrorComponent);
