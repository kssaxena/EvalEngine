import React, { useState } from "react";

const QuestionForm = () => {
  const [questions, setQuestions] = useState([{ questionText: "" }]);

  // Function to add a new question
  const addQuestion = () => {
    setQuestions([...questions, { questionText: "" }]);
  };

  // Function to handle question input change
  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = event.target.value;
    setQuestions(newQuestions);
  };

  // Optional: Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Questions:", questions);
    // Perform any additional actions, such as saving to a database or state management
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold mb-4">Create Your Questions</h2>

      {questions.map((question, index) => (
        <div key={index} className="flex flex-col gap-2">
          <label className="text-white">Question {index + 1}</label>
          <input
            type="text"
            value={question.questionText}
            onChange={(e) => handleQuestionChange(index, e)}
            placeholder="Enter your question"
            className="p-2 rounded border border-gray-300"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Add Question
      </button>

      <button
        type="submit"
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        Submit Questions
      </button>
    </form>
  );
};

export default QuestionForm;
