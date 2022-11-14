import React from "react";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { UnControlled as CodeMirror } from "react-codemirror2";

function CodePen() {
  return (
    <div>
      <CodeMirror
        value="<h1>I ♥ react-codemirror2</h1>"
        options={{
          mode: "xml",
          theme: "material",
          lineNumbers: true,
        }}
        onChange={(editor, data, value) => {}}
      />
      <CodeMirror
        value="<h1>I ♥ react-codemirror2</h1>"
        options={{
          mode: "css",
          theme: "material",
          lineNumbers: true,
        }}
        onChange={(editor, data, value) => {}}
      />
      <CodeMirror
        value="<h1>I ♥ react-codemirror2</h1>"
        options={{
          mode: "javascript",
          theme: "material",
          lineNumbers: true,
        }}
        onChange={(editor, data, value) => {}}
      />
    </div>
  );
}

export default CodePen;
