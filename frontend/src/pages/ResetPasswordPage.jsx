import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient.js";

function ResetPasswordPage() {
  const navigate = useNavigate();

  const BRAND_COLOR = "#2F80ED";
  const BRAND_HOVER = "#1F6FD6";
  const TEXT_DARK = "#0F172A";
  const TEXT_MUTED = "#64748B";
  const CARD_BORDER = "#E5EDF6";

  const getWindowWidth = () => {
    if (typeof window === "undefined") return 1024;
    return window.innerWidth;
  };

  const [windowWidth, setWindowWidth] = useState(getWindowWidth);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isMobile = windowWidth <= 640;
  const isSmallMobile = windowWidth <= 380;
  const buttonHeight = isMobile ? "48px" : "50px";

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!newPassword) {
      setErrorMessage("새 비밀번호를 입력해주세요.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("비밀번호는 6자 이상 입력해주세요.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("새 비밀번호가 서로 일치하지 않습니다.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      await supabase.auth.signOut();
      navigate("/login", { replace: true });
    } catch (error) {
      setErrorMessage(
        error.message || "비밀번호 재설정 중 문제가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  const pageStyle = {
    minHeight: "100dvh",
    background:
      "linear-gradient(180deg, #F8FBFF 0%, #F3F6FA 52%, #EEF4FB 100%)",
    display: "flex",
    alignItems: isMobile ? "flex-start" : "center",
    justifyContent: "center",
    padding: isMobile ? "22px 14px" : "32px 18px",
    boxSizing: "border-box",
    fontFamily:
      '"Pretendard", "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  };

  const cardStyle = {
    width: "100%",
    maxWidth: "460px",
    background: "#ffffff",
    borderRadius: isMobile ? "22px" : "28px",
    padding: isSmallMobile
      ? "22px 16px 18px"
      : isMobile
      ? "26px 20px 22px"
      : "32px 30px 26px",
    border: `1px solid ${CARD_BORDER}`,
    boxShadow: isMobile
      ? "0 12px 28px rgba(47, 128, 237, 0.09)"
      : "0 18px 46px rgba(47, 128, 237, 0.1)",
    boxSizing: "border-box",
  };

  const brandWrapStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    marginBottom: isMobile ? "16px" : "18px",
    WebkitTapHighlightColor: "transparent",
  };

  const brandMarkStyle = {
    width: isMobile ? "36px" : "40px",
    height: isMobile ? "36px" : "40px",
    borderRadius: isMobile ? "12px" : "14px",
    background: BRAND_COLOR,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: "900",
    fontSize: isMobile ? "12px" : "13px",
    flexShrink: 0,
    boxShadow: "0 10px 22px rgba(47, 128, 237, 0.18)",
  };

  const brandTextStyle = {
    fontSize: isMobile ? "21px" : "23px",
    fontWeight: "900",
    color: BRAND_COLOR,
    lineHeight: 1,
  };

  const titleStyle = {
    margin: "0 0 8px",
    fontSize: isMobile ? "18px" : "19px",
    fontWeight: "850",
    color: TEXT_DARK,
    lineHeight: 1.38,
    textAlign: "center",
  };

  const descStyle = {
    margin: "0 0 22px",
    fontSize: isMobile ? "13px" : "14px",
    color: TEXT_MUTED,
    lineHeight: 1.6,
    wordBreak: "keep-all",
    textAlign: "center",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "12px" : "14px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontSize: isMobile ? "13px" : "14px",
    fontWeight: "750",
    color: "#334155",
  };

  const inputStyle = {
    width: "100%",
    height: buttonHeight,
    borderRadius: "13px",
    border: "1px solid #D9E2EC",
    padding: "0 14px",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
    color: TEXT_DARK,
    backgroundColor: "#ffffff",
    WebkitAppearance: "none",
    appearance: "none",
  };

  const baseButtonStyle = {
    width: "100%",
    minHeight: buttonHeight,
    borderRadius: "14px",
    fontSize: isMobile ? "14px" : "15px",
    fontWeight: "750",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid transparent",
    outline: "none",
    boxShadow: "none",
    WebkitTapHighlightColor: "transparent",
    transition: "background-color 0.18s ease, color 0.18s ease",
  };

  const primaryButtonStyle = {
    ...baseButtonStyle,
    background: BRAND_COLOR,
    color: "#ffffff",
    boxShadow: "0 10px 24px rgba(47, 128, 237, 0.18)",
  };

  const whiteButtonStyle = {
    ...baseButtonStyle,
    border: `1px solid ${CARD_BORDER}`,
    background: "#ffffff",
    color: TEXT_DARK,
  };

  const errorBoxStyle = {
    padding: "12px 14px",
    borderRadius: "12px",
    background: "#FFF1F2",
    color: "#BE123C",
    fontSize: isMobile ? "12px" : "13px",
    lineHeight: 1.5,
    wordBreak: "keep-all",
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <div style={brandWrapStyle} onClick={() => navigate("/")}>
          <div style={brandMarkStyle}>ㄸ</div>
          <div style={brandTextStyle}>뚝딱</div>
        </div>

        <h1 style={titleStyle}>비밀번호 재설정</h1>
        <p style={descStyle}>새로 사용할 비밀번호를 입력해주세요.</p>

        <form onSubmit={handleSubmit} style={formStyle}>
          <div>
            <label style={labelStyle}>새 비밀번호</label>
            <input
              type="password"
              placeholder="새 비밀번호를 입력하세요"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>새 비밀번호 확인</label>
            <input
              type="password"
              placeholder="새 비밀번호를 다시 입력하세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              style={inputStyle}
            />
          </div>

          {errorMessage && <div style={errorBoxStyle}>{errorMessage}</div>}

          <HoverButton
            type="submit"
            disabled={loading}
            style={primaryButtonStyle}
            hoverStyle={{ background: BRAND_HOVER }}
          >
            {loading ? "변경 중..." : "비밀번호 변경"}
          </HoverButton>

          <HoverButton
            onClick={() => navigate("/login")}
            style={whiteButtonStyle}
            hoverStyle={{ color: BRAND_COLOR }}
          >
            로그인으로 돌아가기
          </HoverButton>
        </form>
      </div>
    </div>
  );
}

function HoverButton({
  children,
  onClick,
  style,
  hoverStyle = {},
  disabled = false,
  type = "button",
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onMouseDown={(e) => e.currentTarget.blur()}
      onMouseUp={(e) => e.currentTarget.blur()}
      onFocus={(e) => e.currentTarget.blur()}
      style={{
        ...style,
        opacity: disabled ? 0.65 : 1,
        cursor: disabled ? "not-allowed" : style?.cursor || "pointer",
        outline: "none",
        boxShadow: style?.boxShadow || "none",
        ...(isHover && !disabled ? hoverStyle : {}),
      }}
    >
      {children}
    </button>
  );
}

export default ResetPasswordPage;
