import { useState } from "react";
import "../index.css";

function RequestDetailPage({ request, onGoBack, onGoHome }) {
  const [detail, setDetail] = useState(request);
  const [message, setMessage] = useState("");

  const savedUser = localStorage.getItem("loginUser");
  const loginUser = savedUser ? JSON.parse(savedUser) : null;

  if (!detail) {
    return (
      <div className="signup-page">
        <div className="signup-card">
          <div className="signup-header">
            <h1 className="logo">FixFlow</h1>
            <p className="subtitle">요청 상세보기 페이지</p>
          </div>

          <div className="signup-form">
            <h2>요청 상세보기</h2>
            <p className="message">선택된 요청이 없습니다.</p>

            <button
              type="button"
              className="signup-button"
              onClick={onGoBack}
            >
              뒤로가기
            </button>

            <button
              type="button"
              className="signup-button"
              onClick={onGoHome}
            >
              메인으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isMyRequest = loginUser && detail.userId === loginUser.id;
  const canAccept =
    loginUser &&
    !isMyRequest &&
    detail.status === "모집중" &&
    !detail.assignedUserId;

  const handleAccept = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/requests/accept?requestId=${detail.id}&assignedUserId=${loginUser.id}`,
        {
          method: "PUT",
        }
      );

      const resultText = await response.text();

      if (response.ok && resultText.includes("성공")) {
        setDetail({
          ...detail,
          status: "진행중",
          assignedUserId: loginUser.id,
        });
        setMessage("요청 수락 성공!");
      } else {
        setMessage(resultText);
      }
    } catch (error) {
      console.error("요청 수락 실패:", error);
      setMessage("요청 수락 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <div className="signup-header">
          <h1 className="logo">FixFlow</h1>
          <p className="subtitle">요청 상세보기 페이지</p>
        </div>

        <div className="signup-form">
          <h2>요청 상세보기</h2>

          {message && <p className="message">{message}</p>}

          <div className="input-group">
            <label>제목</label>
            <div className="input">{detail.title}</div>
          </div>

          <div className="input-group">
            <label>카테고리</label>
            <div className="input">{detail.category}</div>
          </div>

          <div className="input-group">
            <label>장소</label>
            <div className="input">{detail.location}</div>
          </div>

          <div className="input-group">
            <label>내용</label>
            <div
              style={{
                minHeight: "120px",
                border: "1px solid #d1d5db",
                borderRadius: "10px",
                padding: "14px",
                fontSize: "15px",
                backgroundColor: "#f9fafb",
                whiteSpace: "pre-wrap",
              }}
            >
              {detail.content}
            </div>
          </div>

          <div className="input-group">
            <label>상태</label>
            <div className="input">{detail.status}</div>
          </div>

          {/* 확인용 디버그 */}
          <div
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              padding: "12px",
              fontSize: "14px",
              backgroundColor: "#f9fafb",
              marginBottom: "12px",
            }}
          >
            <p>내 로그인 ID: {loginUser ? loginUser.id : "없음"}</p>
            <p>글 작성자 ID: {detail.userId}</p>
            <p>현재 상태: {detail.status}</p>
            <p>assignedUserId: {String(detail.assignedUserId)}</p>
            <p>내 글 여부: {String(isMyRequest)}</p>
            <p>수락 가능 여부: {String(canAccept)}</p>
          </div>

          {canAccept && (
            <button
              type="button"
              className="signup-button"
              onClick={handleAccept}
            >
              요청 수락하기
            </button>
          )}

          <button
            type="button"
            className="signup-button"
            onClick={onGoBack}
          >
            뒤로가기
          </button>

          <button
            type="button"
            className="signup-button"
            onClick={onGoHome}
          >
            메인으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default RequestDetailPage;