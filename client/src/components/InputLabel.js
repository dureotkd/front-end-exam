import React from "react";

const InputLabel = React.memo(
  ({ style, item: { label, name, placeholder, value }, onChange }) => {
    let type = name.startsWith("password") ? "password" : "text";
    if (name === "email") type = "email";

    return (
      // <div style={{ padding: "1.15rem 1.9rem" }}>
      <div style={{ ...style }}>
        <p style={{ fontWeight: "bold", fontSize: 15 }}>{label}</p>
        <input
          onChange={onChange}
          type={type}
          name={name}
          value={value}
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
  }
);

export default InputLabel;
