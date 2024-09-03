import "./ServerError.css";
import { useNavigate } from "react-router-dom";
const ServerError = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // ينقل المستخدم إلى الصفحة الرئيسية
  };

  return (
    <div className="error-content">
      <h1 className="error-title">500</h1>
      <p className="error-message">Oops! Something went wrong on our end.</p>
      <div className="error-actions">
        <button className="back-link" onClick={handleGoHome}>
          العودة إلى الصفحة الرئيسية
        </button>
      </div>
    </div>
  );
};

export default ServerError;
