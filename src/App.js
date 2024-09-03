import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Quiz from "./components/quiz/Quiz";
import Result from "./components/result/Result";
import Main from "./components/main/Main";
import Quetions from "./components/questions/Questions";
import { CheckUserExit } from "./helper/helper";
import QuestionForm from "./components/questionForm/QuestionForm";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "Quiz",
    element: (
      <CheckUserExit>
        <Quiz />
      </CheckUserExit>
    ),
  },
  {
    path: "Result",
    element: (
      <CheckUserExit>
        <Result />
      </CheckUserExit>
    ),
  },
  {
    path: "Questions",
    element: (
      <CheckUserExit>
        <Quetions />
      </CheckUserExit>
    ),
  },
  {
    path: "Admin",
    element: (
      <CheckUserExit>
        <QuestionForm />
      </CheckUserExit>
    ),
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
