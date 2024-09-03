import { postServerData } from "../helper/helper";
import { pushResultAnswer, updateAction } from "../Redux/result-reducer";
export const pushAnswer = (result) => async (dispatch) => {
  try {
    await dispatch(pushResultAnswer(result));
  } catch (error) {
    console.log(error);
  }
};
export const updateAnswer = (traceChecked) => async (dispatch) => {
  try {
    dispatch(updateAction(traceChecked));
  } catch (error) {
    console.log(error);
  }
};

export const usePublishResult = (resultData) => {
  (async () => {
    try {
      await postServerData(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`,
        (data) => data,
        resultData
      );
    } catch (error) {
      console.log(error);
    }
  })();
};
