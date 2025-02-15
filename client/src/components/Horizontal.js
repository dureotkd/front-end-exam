import React from "react";

function Horizontal() {
  const [data, setData] = React.useState({
    initBoxWidth: 0, // 원래 박스 너비
    initMousePosition: 0, // 원래 마우스 위치
    isDrag: false, // 드래그중
  });

  const 마우스이동중 = React.useCallback(
    (event) => {
      const left = document.querySelector(".scrollBar");
      const right = document.querySelector("#code_mirror_wrap");
      const total = document.querySelector(".exam_box");

      const 내가마우스이동한너비 = event.clientX - data.initMousePosition;

      const 변경될왼쪽상자너비 = data.initBoxWidth + 내가마우스이동한너비;
      const 변경될오른쪽상자너비 = total.offsetWidth - 변경될왼쪽상자너비;

      left.style.width = `${변경될왼쪽상자너비}px`;
      right.style.width = `${변경될오른쪽상자너비}px`;
    },
    [data.initBoxWidth, data.initMousePosition]
  );

  const 조절끝 = React.useCallback(() => {
    const box = document.querySelector(".scrollBar");

    setData((prev) => {
      return {
        ...prev,
        isDrag: false,
        initBoxWidth: box.offsetWidth,
      };
    });
  }, []);

  React.useEffect(() => {
    window.addEventListener("mouseup", 조절끝);

    if (data.isDrag === true) {
      window.addEventListener("mousemove", 마우스이동중);
    } else {
      window.removeEventListener("mousemove", 마우스이동중);
    }

    return () => {
      window.removeEventListener("mouseup", 조절끝);
      window.removeEventListener("mousemove", 마우스이동중);
    };
  }, [data.isDrag, 마우스이동중, 조절끝]);

  const 마우스클릭 = React.useCallback(
    (event) => {
      const box = document.querySelector(".scrollBar");

      const cloneData = { ...data };
      cloneData.isDrag = true;
      cloneData.initMousePosition = event.clientX;

      if (cloneData.initBoxWidth === 0) {
        cloneData.initBoxWidth = box.offsetWidth;
      }

      setData(cloneData);
    },
    [data]
  );

  return (
    <div className="lg:block hidden horizontal" onMouseDown={마우스클릭}></div>
  );
}

export default Horizontal;
