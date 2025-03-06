import React, { useEffect, useRef, useState } from "react";
import Button from "../utils/Button";
import { useParams } from "react-router-dom";
import { FetchData } from "../utils/FetchFromApi";
import { useSelector } from "react-redux";

const RespondentAnswerInput = () => {
  const user = useSelector((store) => store.user.user);
  const { testId } = useParams();

  const answerRef = useRef(null);
  const [questions, setQuestions] = useState([]);
  const fetchQuestions = async () => {
    try {
      const response = await FetchData(
        `test/get-question-paper/${testId}`,
        "get"
      );
      console.log(response);
      setQuestions(response.data.data.questions);
    } catch (error) {
      console.error("error", error);
      // alert("error.response.data");
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  // const [savedAnswers, setSavedAnswers] = useState(
  //   Array(questions.length).fill(false)
  // );
  const [alertMessage, setAlertMessage] = useState("");

  const showTemporaryAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 2000);
  };

  const handleCopyPaste = (e) => {
    e.preventDefault();
    showTemporaryAlert("Copy or Paste not allowed");
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      answerRef.current.value = answers[currentQuestionIndex - 1];
    } else {
      showTemporaryAlert("You have completed all the questions.");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      answerRef.current.value = answers[currentQuestionIndex - 1];
      updateAnswerAtIndex(currentQuestionIndex, answerRef.current.value);
    } else {
      alert("It's the first question!!");
    }
  };

  const updateAnswerAtIndex = (index, newValue) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = newValue;
      return updatedAnswers;
    });
  };
  const handleSaveAnswer = () => {
    const ans = answerRef.current.value;
    if (ans) {
      updateAnswerAtIndex(currentQuestionIndex, ans);
      handleNextQuestion();
      answerRef.current.value = "";
      console.log(answers);
    } else {
      alert("These is nothing to save!");
    }
  };

  const handleSubmitAnswers = () => {
    showTemporaryAlert("Your answers have been submitted successfully!");
    console.log(answers);
  };

  return (
    <div className="p-4 h-screen">
      {alertMessage && (
        <div className="w-1/4 flex justify-center items-center absolute mb-4 p-3 bg-blue-100 text-blue-800 rounded">
          {alertMessage}
        </div>
      )}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">
          Question {currentQuestionIndex + 1}:
        </h2>
        <p className="text-lg select-none">{questions[currentQuestionIndex]}</p>
      </div>
      <label htmlFor="answer" className="block text-lg font-semibold mb-2">
        Answer below:
      </label>
      <textarea
        ref={answerRef}
        id="answer"
        onCopy={handleCopyPaste}
        onPaste={handleCopyPaste}
        placeholder="Type here"
        className="w-full h-96 border rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#FBF6E9]"
        disabled={answers[currentQuestionIndex] != undefined}
      />

      <div className="flex justify-between mt-4">
        <Button
          name="Previous Question"
          OnClick={handlePreviousQuestion}
          Type="button"
          disabled={currentQuestionIndex === 0}
        />
        <Button
          className={`hover:bg-green-500 duration-300 ease-in-out`}
          name="Save and Proceed"
          OnClick={handleSaveAnswer}
          Type="button"
          disabled={() => answers[currentQuestionIndex] != undefined}
        />
        <Button
          className={`hover:bg-green-500 duration-300 ease-in-out`}
          name="Console"
          OnClick={() => console.log(answers)}
          Type="button"
        />
        {currentQuestionIndex === questions.length - 1 ? (
          <Button
            className={` bg-red-500 hover:bg-green-500 duration-300 ease-in-out`}
            name="Submit Answers"
            OnClick={handleSubmitAnswers}
            Type="button"
          />
        ) : (
          <Button
            name="Next Question"
            OnClick={handleNextQuestion}
            Type="button"
          />
        )}
      </div>
    </div>
  );
};

export default RespondentAnswerInput;


