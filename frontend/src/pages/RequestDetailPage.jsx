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

  const canComplete =
    loginUser &&
    detail.assignedUserId === loginUser.id &&
    detail.status === "진행중";

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
        const nextUsername = loginUser.username || `회원 ${loginUser.id}`;

        setDetail({
          ...detail,
          status: "진행중",
          assignedUserId: loginUser.id,
          assignedUsername: nextUsername,
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

  const handleComplete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/requests/status?id=${detail.id}&status=완료됨`,
        {
          method: "PUT",
        }
      );

      const resultText = await response.text();

      if (response.ok && resultText.includes("성공")) {
        setDetail({
          ...detail,
          status: "완료됨",
        });
        setMessage("작업 완료 처리 성공!");
      } else {
        setMessage(resultText);
      }
    } catch (error) {
      console.error("완료 처리 실패:", error);
      setMessage("완료 처리 중 오류가 발생했습니다.");
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

          <div className="input-group">
            <label>담당자</label>
            <div className="input">
              {detail.assignedUsername ? detail.assignedUsername : "아직 없음"}
            </div>
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

          {canComplete && (
            <button
              type="button"
              className="signup-button"
              onClick={handleComplete}
            >
              완료 처리하기
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