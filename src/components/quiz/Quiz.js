import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Quiz.css";

export default function Quiz() {
  const navigate = useNavigate();

  const location = useLocation();

  const subject = location.state || "اسم المادة"; // يستخدم اسم المادة أو الاسم الافتراضي
  const years = Array.from({ length: 10 }, (_, i) => 2014 + i);

  const handler = (text) => {
    const year = text.target.textContent.slice(-4);
    navigate("/Questions");
  };
  return (
    <div className="quiz-container">
      <h1 className="subject">{subject}</h1>
      <div className="responsive-table">
        {years.map((year) => (
          <h3 onClick={handler} key={year}>
            دورة {year}
          </h3>
        ))}
      </div>
      <Link to="/" className="back-link">
        العودة إلى الصفحة الرئيسية
      </Link>
    </div>
  );
}
