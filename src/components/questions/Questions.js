import Question from "../question/Question";
import "./Questions.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  moveNextQuestion,
  movePrevQuestion,
  useFetchQuestions,
} from "../../hooks/fetchQuestions";
import { useState } from "react";
import { pushAnswer } from "../../hooks/setResult";
import Loding from "../loading/Loding";
import ServerError from "../serverError/ServerError";
export default function Questions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(undefined);
  const [getData, setGetData] = useFetchQuestions();
  const { queue, trace } = useSelector((state) => state.question);
  const result = useSelector((state) => state.result.result);
  return (
    <>
      {getData.isLoading ? (
        <Loding />
      ) : getData.serverError ? (
        <ServerError />
      ) : (
        <div className="all-container">
          <Question
            question_and_options={queue[trace]}
            check={{ checked, setChecked }}
          />
          <div className="move">
            <button
              onClick={() => {
                if (trace < queue.length - 1) {
                  dispatch(moveNextQuestion());
                  if (result.length <= trace) dispatch(pushAnswer(checked));
                } else navigate("/Result");
                setChecked(undefined);
              }}
              className="option-button next"
            >
              Next
            </button>
            {trace > 0 ? (
              <button
                onClick={() => {
                  dispatch(movePrevQuestion());
                }}
                className="option-button prev"
              >
                prev
              </button>
            ) : (
              <div></div>
            )}
          </div>
          <Link to="/" className="back-link">
            العودة إلى الصفحة الرئيسية
          </Link>
        </div>
      )}
    </>
  );
}
