import React, { useRef, useState } from "react";
import "./QuestionForm.css"; // استيراد ملف الـ CSS
import { postServerData } from "../../helper/helper";
const QuestionForm = () => {
  // ues state form data for push questions
  const [formData, setFormData] = useState({
    questionTranslation: "",
    options: ["", "", "", ""],
    translations: ["", "", "", ""],
    correctOption: "",
    question: "",
  });

  //   use ref for accesse input
  const questionRef = useRef(null);
  const questionTranslationRef = useRef(null);
  const optionRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);
  const optionTranslationRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  // useRef للاحتفاظ بالأخطاء بشكل مؤقت
  const errorRef = useRef({
    question: false,
    questionTranslation: false,
    options: [false, false, false, false],
    optionsTranslation: [false, false, false, false],
  });

  // use state select option for show the color green on option correct
  const [selectedOption, setSelectedOption] = useState(null);

  // حالة التحميل
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newError = {
      question: !formData.question,
      questionTranslation: !formData.questionTranslation,
      options: formData.options.map((option) => !option),
      optionsTranslation: formData.translations.map((el) => !el),
    };

    errorRef.current = newError;
    // التحقق من أن كل القيم تم ملؤها
    return (
      !newError.question &&
      !newError.questionTranslation &&
      !newError.options.includes(true) &&
      !newError.optionsTranslation.includes(true)
    );
  };
  const handleKeyDown = (e, nextFieldRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextFieldRef && nextFieldRef.current) {
        nextFieldRef.current.focus(); // الانتقال إلى الحقل التالي
      }
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prevData) => ({ ...prevData, options: newOptions }));
  };

  const handleTranslationChange = (index, value) => {
    const newTranslations = [...formData.translations];
    newTranslations[index] = value;
    setFormData((prevData) => ({ ...prevData, translations: newTranslations }));
  };

  const handleSelectOption = (e, index) => {
    setFormData((prevData) => ({
      ...prevData,
      correctOption: formData.options[Number(e)],
    }));
    setSelectedOption(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm() && selectedOption) {
      setIsLoading(true);
      const questions = {
        question: formData.question,
        options: [
          {
            text: formData.options[0],
            translation: formData.translations[0],
          },
          {
            text: formData.options[1],
            translation: formData.translations[1],
          },
          {
            text: formData.options[2],
            translation: formData.translations[3],
          },
          {
            text: formData.options[3],
            translation: formData.translations[3],
          },
        ],
        correct_answer: formData.correctOption,
        translated_question: formData.questionTranslation,
      };

      try {
        await postServerData(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`,
          (res) => console.log(res),
          questions
        );
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
      setFormData({
        question: "",
        questionTranslation: "",
        options: ["", "", "", ""],
        translations: ["", "", "", ""],
        correctOption: "",
      });
      setSelectedOption(null);
    } else {
      const error = errorRef.current;
      console.log(error);

      if (error.question) {
        questionRef.current.focus();
      }
      if (error.questionTranslation) {
        questionTranslationRef.current.focus();
      }
      error.options.map((option, index) => {
        if (option) {
          optionRefs.current[index].current.focus();
        }
      });
      error.optionsTranslation.map((option, index) => {
        if (option) {
          optionTranslationRefs.current[index].current.focus();
        }
      });
    }
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>السؤال:</label>
        <input
          type="text"
          ref={questionRef}
          value={formData.question}
          style={{
            border: errorRef.current.question
              ? "2px solid red"
              : "1px solid #ccc",
          }}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              question: e.target.value,
            }))
          }
          onKeyDown={(e) => {
            handleKeyDown(e, questionTranslationRef);
          }}
        />
      </div>
      <div className="form-group">
        <label>ترجمة السؤال:</label>
        <input
          ref={questionTranslationRef}
          type="text"
          value={formData.questionTranslation}
          style={{
            border: errorRef.current.questionTranslation
              ? "2px solid red"
              : "1px solid #ccc",
          }}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              questionTranslation: e.target.value,
            }))
          }
          onKeyDown={(e) => handleKeyDown(e, optionRefs.current[0])}
        />
      </div>
      {formData.options.map((option, index) => (
        <div
          className={`form-group option ${
            selectedOption === index ? "correct" : ""
          }`}
          key={index}
        >
          <label> الخيار {index + 1}:</label>
          <input
            type="text"
            ref={optionRefs.current[index]}
            value={option}
            style={{
              border: errorRef.current.options[index]
                ? "2px solid red"
                : "1px solid #ccc",
            }}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            onKeyDown={(e) => {
              handleKeyDown(e, optionTranslationRefs.current[index]);
            }}
          />
          <label>ترجمة الخيار {index + 1}:</label>
          <input
            type="text"
            ref={optionTranslationRefs.current[index]}
            value={formData.translations[index]}
            style={{
              border: errorRef.current.optionsTranslation[index]
                ? "2px solid red"
                : "1px solid #ccc",
            }}
            onKeyDown={(e) => {
              handleKeyDown(e, optionRefs.current[index + 1]);
            }}
            onChange={(e) => handleTranslationChange(index, e.target.value)}
          />
          <label>
            <input
              type="radio"
              name="correctOption"
              value={index}
              checked={formData.correctOption === index.toString()}
              onChange={(e) => handleSelectOption(e.target.value, index)}
            />
            الخيار الصحيح {index + 1}
          </label>
        </div>
      ))}
      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? <div className="spinner"></div> : "إرسال"}
      </button>
      {selectedOption == null && (
        <div style={{ color: "red", marginTop: "10px" }}>
          You must choose the correct answer
        </div>
      )}
    </form>
  );
};

export default QuestionForm;
