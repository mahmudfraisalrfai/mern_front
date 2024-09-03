import { useNavigate } from "react-router-dom";
import "./Main.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setUserId } from "../../Redux/result-reducer";
export default function Main() {
  const password = "123";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClick = () => {
    if (inputRef?.current.value === password) {
      dispatch(setUserId(inputRef.current.value));
      navigate("/Quiz", { state: " مادة 1" });
    } else alert("الكود المدخل غير صحيح !");
  };

  const inputRef = useRef(null);
  const handelAdmin = () => {
    if (inputRef?.current.value === password) {
      dispatch(setUserId(inputRef.current.value));
      navigate("/Admin");
    } else alert("الكود المدخل غير صحيح !");
  };
  return (
    <div className="container">
      <header>
        <h1 id="platform-title">عنوان المنصة</h1>
        <p id="platform-description">
          هنا يمكنك وضع التعريف الخاص بمنصتك التعليمية أو الاختبارية.
        </p>
      </header>
      <div className="subject-selection">
        <h2>اختر المادة:</h2>
        <form id="quiz-form">
          <div className="subject">
            <label htmlFor="subject1">مادة 1:</label>
            <input
              ref={inputRef}
              placeholder=" password"
              type="text"
              id="subject1"
              name="subject1"
            />
            <div onClick={onClick} className="submit-btn">
              تأكيد
            </div>
          </div>
          <div className="subject">
            <label htmlFor="subject2">مادة 2:</label>
            <input
              placeholder=" password"
              type="text"
              id="subject2"
              name="subject2"
            />
            <div onClick={onClick} className="submit-btn">
              تأكيد
            </div>
          </div>
          <div className="subject">
            <label htmlFor="subject3">مادة 3:</label>
            <input
              placeholder=" password"
              type="text"
              id="subject3"
              name="subject3"
            />
            <div onClick={onClick} className="submit-btn">
              تأكيد
            </div>
          </div>
          <div className="subject">
            <label htmlFor="subject4">مادة 4:</label>
            <input
              placeholder=" password"
              type="text"
              id="subject4"
              name="subject4"
            />
            <div onClick={onClick} className="submit-btn">
              تأكيد
            </div>
          </div>
        </form>
      </div>
      <h2 className="submit-btn admin" onClick={handelAdmin}>
        Admin
      </h2>

      <footer>
        <p>&copy; 2024 Quiz Platform. جميع الحقوق محفوظة.</p>
        <p>المؤسس: اسم المؤسس</p>
      </footer>
    </div>
  );
}
