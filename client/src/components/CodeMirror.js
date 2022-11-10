import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";

function CodeMirrorComponent({
  options,
  value,
  onChange,
  height = "400px",
  theme = "dark",
}) {
  React.useLayoutEffect(() => {
    // const code_mirror_wrap = document.getElementById("ode_mirror_wrap");
  }, []);

  return (
    <CodeMirror
      value={value}
      height={height}
      readOnly={options?.readOnly || false}
      extensions={[
        javascript({ jsx: true }),
        html({ matchClosingTags: true, autoClose: true }),
        css(),
      ]}
      onChange={onChange}
      theme={theme}
    />
  );
}

export default React.memo(CodeMirrorComponent);
