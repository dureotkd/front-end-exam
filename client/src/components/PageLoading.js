function PageLoading() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <img
        style={{ width: 250 }}
        src={`${process.env.PUBLIC_URL}/images/page_loading_animation.gif`}
        alt="페이지로딩"
      />
    </div>
  );
}

export default PageLoading;
