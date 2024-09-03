import { createSlice } from "@reduxjs/toolkit";

export const resultReducer = createSlice({
  name: "result",
  initialState: {
    userId: null,
    result: [],
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    pushResultAnswer: (state, action) => {
      state.result.push(action.payload);
    },
    updateAction: (state, action) => {
      const { trace, checked } = action.payload;
      state.result.fill(checked, trace, trace + 1);
    },
    resetAnswer: () => {
      return {
        userId: null,
        result: [],
      };
    },
  },
});
export const {
  setUserId,
  userId,
  pushResultAnswer,
  resetAnswer,
  updateAction,
} = resultReducer.actions;
export default resultReducer.reducer;
