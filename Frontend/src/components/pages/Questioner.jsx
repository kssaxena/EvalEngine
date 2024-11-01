import React, { useState } from "react";
import Button from "../../utils/Button";

const QuestionForm = () => {
  const [questions, setQuestions] = useState([{ questionText: "" }]);

  const addQuestion = () => {
    setQuestions([...questions, { questionText: "" }]);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Questions:", questions);
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
            className="p-2 bg-transparent border-b border-[#6A47FF] outline-none"
          />
        </div>
      ))}
      <div className={`flex justify-evenly items-center`}>
        <Button Type="button" OnClick={addQuestion} name="Add Questions" />

        <button
          type="submit"
          className=" bg-green-500 px-6 py-2  dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
        >
          Submit Questions
        </button>
      </div>
    </form>
  );
};

const Questioner = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="bg-[#1F222B] flex  justify-center items-center gap-28 py-20 h-screen">
      <section>
        <h1 className="buttonForQuestions flex  justify-center items-center gap-10">
          Click here to add Questions
          <Button OnClick={toggleFormVisibility} name={"Create Questions"} />
        </h1>
      </section>
      <section className="AreaToAddQuestions w-[50%] p-10">
        {showForm && <QuestionForm />}
      </section>
    </div>
  );
};

export default Questioner;
