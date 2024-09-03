import { combineReducers, configureStore } from "@reduxjs/toolkit";
import questionreducer from "./question-reducer";
import resultReducer from "./result-reducer";
const rootReducer = combineReducers({
  question: questionreducer,
  result: resultReducer,
});

// create store with reducer
export default configureStore({
  reducer: rootReducer,
});
