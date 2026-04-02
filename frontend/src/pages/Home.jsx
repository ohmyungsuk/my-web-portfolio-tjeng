function Home() {
  const savedUser = localStorage.getItem("loginUser");
  const loginUser = savedUser ? JSON.parse(savedUser) : null;

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-header">
          <h1 className="logo">FixFlow</h1>
          <p className="subtitle">깔끔한 요청 관리 시스템</p>
        </div>

        <div className="signup-form">
          <h2>메인 화면</h2>
          <p className="message" style={{ color: "#111827" }}>
            {loginUser
              ? `${loginUser.username}님, 로그인 되었습니다.`
              : "로그인 정보가 없습니다."}
          </p>

          <button
            className="signup-button"
            onClick={() => {
              localStorage.removeItem("loginUser");
              window.location.reload();
            }}
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;