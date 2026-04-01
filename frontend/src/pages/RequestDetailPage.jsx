import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function RequestDetailPage() {
  const [searchParams] = useSearchParams();
  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");

  const id = searchParams.get("id");

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    setRole(savedRole || "");

    fetch(`http://localhost:8080/requests/detail?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRequest(data);
        setStatus(data.status);
      })
      .catch((error) => {
        console.error("요청 상세 불러오기 실패:", error);
      });
  }, [id]);

  const handleStatusUpdate = () => {
    fetch("http://localhost:8080/requests/status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: request.id,
        status: status,
      }),
    })
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        setRequest({ ...request, status });
      })
      .catch((error) => {
        console.error("상태 변경 실패:", error);
      });
  };

  if (!request) {
    return (
      <div className="request-detail-page">
        <div className="inner">
          <p>불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="request-detail-page">
      <div className="inner">
        <h2>요청 상세 보기</h2>

        <div className="request-detail-card">
          <h3>{request.title}</h3>
          <p>카테고리: {request.category}</p>
          <p>장소: {request.location}</p>
          <p>내용: {request.content}</p>
          <p>현재 상태: {request.status}</p>

          {role === "ADMIN" && (
            <div style={{ marginTop: "20px" }}>
              <label>상태 변경: </label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="접수됨">접수됨</option>
                <option value="처리중">처리중</option>
                <option value="완료">완료</option>
              </select>

              <button
                type="button"
                onClick={handleStatusUpdate}
                style={{ marginLeft: "10px" }}
              >
                상태 변경
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RequestDetailPage;