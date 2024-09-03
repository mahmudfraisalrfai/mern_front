import React, { useEffect, useState } from "react";
import "./Question.css";
import { updateAnswer } from "../../hooks/setResult";
import { useDispatch, useSelector } from "react-redux";
function Question({ question_and_options, check }) {
  const { checked, setChecked } = check;
  const [isArabicQuestion, setIsArabicQuestion] = useState(false);
  const [isArabicOptions, setIsArabicOptions] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isDisabled, setIsDisablad] = useState(false);
  const dispatch = useDispatch();
  const trace = useSelector((state) => state.question.trace);
  const { question, options, correct_answer, translated_question } =
    question_and_options || {};
  const toggleLanguageQuestion = () => {
    setIsArabicQuestion(!isArabicQuestion);
  };
  const toggleLanguageOptons = () => {
    setIsArabicOptions(!isArabicOptions);
  };

  const handleOptionClick = (option, index) => {
    setSelectedOptionIndex(index);
    setChecked(index);
    setIsDisablad(true);
    if (option !== correct_answer) setShowCorrectAnswer(true);
  };
  useEffect(() => {
    dispatch(updateAnswer({ trace, checked }));
  }, [checked]);
  useEffect(() => {
    setIsArabicQuestion(false);
    setIsArabicOptions(false);
    setSelectedOptionIndex(null);
    setShowCorrectAnswer(false);
    setIsDisablad(false);
  }, [question_and_options]);

  return (
    <div className="question-container">
      <h2 className="question-text">{question}</h2>
      {isArabicQuestion && (
        <h2 className="question-text">{translated_question}</h2>
      )}
      <button
        className="translate-button question"
        onClick={toggleLanguageQuestion}
      >
        {isArabicQuestion ? "Hiden" : "Arabic Question"}
      </button>
      <button
        className="translate-button options"
        onClick={toggleLanguageOptons}
      >
        {isArabicOptions ? "Hiden " : "Arabic Options"}
      </button>
      <div className="options-container">
        {options?.map((option, index) => (
          <button
            key={index}
            style={{ pointerEvents: isDisabled ? "none" : "auto" }}
            className={
              selectedOptionIndex === index
                ? correct_answer === option.text
                  ? `option-button selected`
                  : "option-button ancorect"
                : showCorrectAnswer && correct_answer === option.text
                ? "option-button selected"
                : "option-button"
            }
            onClick={() => handleOptionClick(option.text, index)}
          >
            {option.text}
            {isArabicOptions && <p>{option.translation}</p>}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
