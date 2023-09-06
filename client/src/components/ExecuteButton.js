import React from "react";

function ExecuteButton({ onClick, style, text }) {
  const [loading, setLoading] = React.useState(false);

  return (
    <button
      className="exam-btn"
      onClick={async () => {
        // setLoading(true);
        await onClick();
        // setLoading(false);
      }}
      style={{ ...style }}
    >
      {loading ? <div className="btn-loader" /> : text}
    </button>
  );
}

export default React.memo(ExecuteButton);
