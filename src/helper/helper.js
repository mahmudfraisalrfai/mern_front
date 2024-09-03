import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";
export const answerArray = (question) => {
  let answerArray = [];
  question.map((e) => {
    return e.options.map((op, index) => {
      if (op.text === e.correct_answer) answerArray.push(index);
    });
  });
  return answerArray;
};
export const attemps_Number = (result) => {
  return result.filter((e) => e !== undefined).length;
};
export const earnPoints_Number = (result, answers, point) => {
  return result
    .map((element, index) => element === answers[index])
    .filter((element) => element)
    .map((element) => element * point)
    .reduce((prev, curr) => prev + curr, 0);
};
export const flagresult = (totalPoints, earnPoints, passed) => {
  return (totalPoints * passed) / 100 < earnPoints;
};
export function CheckUserExit({ children }) {
  const auth = useSelector((state) => state.result.userId);
  console.log(auth);
  return auth === "123" ? (
    children
  ) : (
    <Navigate to={"/"} replace="true"></Navigate>
  );
}
export async function getServerData(url, callback) {
  const data = await (await axios.get(url))?.data;
  return callback ? callback(data) : data;
}
export async function postServerData(url, callback, result) {
  const data = await (await axios.post(url, result))?.data;
  return callback ? callback(data) : data;
}
