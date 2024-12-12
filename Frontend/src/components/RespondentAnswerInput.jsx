import React, { useState } from "react";
import Button from "../utils/Button";

const RespondentAnswerInput = () => {
  const questions = [
    "What is your name?",
    "Write a code for printing prime number.",
    "What motivates you to achieve your goals?",
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [savedAnswers, setSavedAnswers] = useState(
    Array(questions.length).fill(false)
  );
  const [alertMessage, setAlertMessage] = useState("");

  const showTemporaryAlert = (message) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(""), 2000);
  };

  const handleChange = (e) => {
    if (!savedAnswers[currentQuestionIndex]) {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = e.target.value;
      setAnswers(updatedAnswers);
    }
  };

  const handleCopyPaste = (e) => {
    e.preventDefault();
    showTemporaryAlert("Copy or Paste not allowed");
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      showTemporaryAlert("You have completed all the questions.");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSaveAnswer = () => {
    if (answers[currentQuestionIndex].trim() === "Na") {
      showTemporaryAlert("Writing answer is compulsory");
    } else {
      const updatedSavedAnswers = [...savedAnswers];
      updatedSavedAnswers[currentQuestionIndex] = true;
      setSavedAnswers(updatedSavedAnswers);
      showTemporaryAlert("Answer saved. You can no longer edit this answer.");
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  const handleSubmitAnswers = () => {
    showTemporaryAlert("Your answers have been submitted successfully!");
    console.log(answers);
  };

  return (
    <div className="p-4">
      {alertMessage && (
        <div className="w-1/4 flex justify-center items-center absolute mb-4 p-3 bg-blue-100 text-blue-800 rounded">
          {alertMessage}
        </div>
      )}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">
          Question {currentQuestionIndex + 1}:
        </h2>
        <p className="text-lg">{questions[currentQuestionIndex]}</p>
      </div>
      <label htmlFor="answer" className="block text-lg font-semibold mb-2">
        Answer below:
      </label>
      <textarea
        id="answer"
        value={answers[currentQuestionIndex]}
        onChange={handleChange}
        onCopy={handleCopyPaste}
        onPaste={handleCopyPaste}
        placeholder="Type here"
        className="w-full h-80 border rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#FBF6E9]"
        disabled={savedAnswers[currentQuestionIndex]}
      ></textarea>
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
          disabled={savedAnswers[currentQuestionIndex]}
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
