import "./Result.css";
import { useNavigate } from "react-router-dom";
import { resetAnswer } from "../../Redux/result-reducer";
import { resetQuestions } from "../../Redux/question-reducer";
import { useDispatch, useSelector } from "react-redux";
import {
  attemps_Number,
  earnPoints_Number,
  flagresult,
} from "../../helper/helper";
import { usePublishResult } from "../../hooks/setResult";
import TableResult from "../tableResult/TableResult";
const Results = () => {
  const {
    question: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRetakeQuiz = () => {
    dispatch(resetAnswer());
    dispatch(resetQuestions());
    navigate("/Quiz");
  };

  const handleGoHome = () => {
    dispatch(resetAnswer());
    dispatch(resetQuestions());
    navigate("/");
  };
  const totalPointrs = queue.length * 10;
  const attemps = attemps_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10);
  const flag = flagresult(totalPointrs, earnPoints, 60);

  usePublishResult({
    username: userId,
    result,
    attempts: attemps,
    points: earnPoints,
    achived: flag ? "passed" : "faild",
  });
  return (
    <>
      <div className="container">
        <h1 className="title">Quiz Results</h1>
        <p className="scoreTex">Total Pointrs:{totalPointrs}</p>
        <p className="scoreTex">Total Questions:{queue.length}</p>
        <p className="scoreTex">Attemps:{attemps}</p>
        <p className="scoreTex">Total Earn Pointers:{earnPoints}</p>
        <p className="scoreText">
          Your Score: {earnPoints / 10} / {queue.length}
        </p>
        <div className="summaryContainer">
          <p className="correctText">Correct Answers: {earnPoints / 10}</p>
          <p className="wrongText">
            Wrong Answers: {queue.length - earnPoints / 10}
          </p>
          <p className={flag ? "correctText" : "wrongText"}>
            <span style={{ color: "white" }}>Quiz Result:</span>{" "}
            {flag ? "Passed" : "Failed"}
          </p>
        </div>
        <div className="buttonContainer">
          <button className="button" onClick={handleRetakeQuiz}>
            Retake Quiz
          </button>
          <button className="button" onClick={handleGoHome}>
            Go to Home
          </button>
        </div>
      </div>
      <TableResult />
    </>
  );
};

export default Results;
