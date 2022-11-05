import React from "react";

function ModalContainer({ showModal: { show, component }, setShowModal }) {
  React.useEffect(() => {
    const 바디클릭 = (event) => {
      if (event.target.className === "modal-bg") {
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
  }, [setShowModal]);

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
                top: "10%",
              }
            : {
                top: "-100%",
              }
        }
      >
        {component && component()}
      </div>
    </React.Fragment>
  );
}

export default React.memo(ModalContainer);
