import { createSlice } from "@reduxjs/toolkit";

const questionreducer = createSlice({
  name: "question",
  initialState: {
    queue: [],
    answers: [],
    trace: 0,
  },
  reducers: {
    startExamAction: (state, action) => {
      const { questions, answerArray1 } = action.payload;
      return {
        ...state,
        queue: questions,
        answers: answerArray1,
      };
    },
    prev: (state) => {
      return {
        ...state,
        trace: state.trace - 1,
      };
    },
    next: (state) => {
      return {
        ...state,
        trace: state.trace + 1,
      };
    },
    resetQuestions: () => {
      return {
        queue: [],
        answers: [],
        trace: 0,
      };
    },
  },
});
export const { startExamAction, next, prev, resetQuestions } =
  questionreducer.actions;

export default questionreducer.reducer;
