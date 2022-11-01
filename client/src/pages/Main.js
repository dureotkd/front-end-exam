import React from "react";
import { Link } from "react-router-dom";
const InputLabel = React.memo(({ item: { label, name, placeholder } }) => {
  let type = name.startsWith("password") ? "password" : "text";
  if (name === "email") type = "email";

  return (
    <div style={{ padding: "1.15rem 1.9rem" }}>
      <p style={{ fontWeight: "bold", fontSize: 15 }}>{label}</p>
      <input
        type={type}
        style={{
          marginTop: 10,
          border: "1px solid #d2d2d2",
          padding: 12,
          borderRadius: 3,
          width: "100%",
        }}
        placeholder={placeholder}
      />
    </div>
  );
});

function Main(param) {
  return <div></div>;
}

export default Main;
