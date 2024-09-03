import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as Action from "../Redux/question-reducer";
import { answerArray, getServerData } from "../helper/helper";
export const useFetchQuestions = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    api: [],
    serverError: false,
  });
  useEffect(() => {
    setGetData((prev) => ({ ...prev, isLoading: true }));
    (async () => {
      try {
        const data = await getServerData(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`,
          (data) => data
        );
        const [{ questions }] = data;
        if (questions.length > 0) {
          const answerArray1 = answerArray(questions);
          setGetData((prev) => ({ ...prev, isLoading: false }));
          setGetData((prev) => ({ ...prev, api: questions }));
          dispatch(Action.startExamAction({ questions, answerArray1 }));
        } else {
          throw new Error("quesyions not validtion");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, isLoading: false }));
        setGetData((prev) => ({ ...prev, serverError: true }));
      }
    })();
  }, [dispatch]);
  return [getData, setGetData];
};
export const moveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.next());
  } catch (error) {
    console.log(error);
  }
};

export const movePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.prev());
  } catch (error) {
    console.log(error);
  }
};
