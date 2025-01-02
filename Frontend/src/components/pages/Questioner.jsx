import React, { useEffect, useState } from "react";
import Button from "../../utils/Button";
import { parseErrorMessage } from "../../utils/ErrorMessageParser";
import { FetchData } from "../../utils/FetchFromApi";
import { useNavigate, useParams } from "react-router-dom";
import { formatDateTime } from "../../utils/FormatDateTime";
import { Copy } from "lucide-react";

const Questioner = () => {
  const [showForm, setShowForm] = useState(false);
  const [questionSet, setQuestionSet] = useState({});
  const { testId } = useParams();
  const [test, setTest] = useState();
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };

  // Functions
  useEffect(() => {
    const fetchTest = async () => {
      try {
        const Response = await FetchData(`test/get-test/${testId}`, "get");
        setTest(Response.data.data);
      } catch (error) {
        console.error("error", error);
        alert(parseErrorMessage(error.response.data));
      }
    };

    fetchTest();
  }, []);

  // const QuestionForm = ({ testId, questionSet, setTest }) => {
  //   // State management
  //   const [questions, setQuestions] = useState(() =>
  //     questionSet?.questions?.length > 0 ? questionSet.questions : [""]
  //   );

  //   // Functions
  //   const addQuestion = () => {
  //     setQuestions((prevQuestions) => [...prevQuestions, ""]);
  //   };

  //   const handleQuestionChange = (index, event) => {
  //     setQuestions((prevQuestions) => {
  //       const newQuestions = [...prevQuestions];
  //       newQuestions[index] = event.target.value;
  //       return newQuestions;
  //     });
  //   };

  // const handleAddSets = async () => {
  //   console.log("all questions", questions);

  //   try {
  //     const Response = await FetchData(`test/add-sets/${testId}`, "post", {
  //       questions: JSON.stringify(questions),
  //     });
  //     console.log(Response);

  //     alert(Response.data.message);
  //     setTest(Response.data.data.test);
  //     setShowForm(false);
  //   } catch (error) {
  //     console.error("error", error);
  //     alert(parseErrorMessage(error.response.data));
  //   }
  // };

  // const handleDeleteQuestion = (index) => {
  //   setQuestions((prevQuestions) =>
  //     prevQuestions.filter((_, i) => i !== index)
  //   );
  // };

  // const handleUpdateSet = async (index) => {
  //   try {
  //     const Response = await FetchData(
  //       `test/update-sets/${testId}/${questionSet._id}`,
  //       "post",
  //       {
  //         questions: JSON.stringify(questions),
  //       }
  //     );
  //     console.log(Response);
  //     alert(Response.data.message);
  //     setShowForm(false);
  //   } catch (error) {
  //     console.error("error", error);
  //     alert(parseErrorMessage(error.response.data));
  //   }
  // };

  // const handleDeleteSet = async (setId) => {
  //   try {
  //     const Response = await FetchData(
  //       `test/delete-sets/${testId}/${setId}`,
  //       "post"
  //     );
  //     console.log(Response);
  //     setTest(Response.data.data);
  //     alert(Response.data.message);
  //     setShowForm(false);
  //   } catch (error) {
  //     console.error("error", error);
  //     alert(parseErrorMessage(error.response.data));
  //   }
  // };

  //   const handleSubmitAllSets = (event) => {
  //     event.preventDefault();
  //     console.log("Submitted Questions:", questions);
  //   };

  //   return (
  //     <form
  //       onSubmit={handleSubmitAllSets}
  //       className="flex flex-col gap-5 w-full"
  //     >
  //       <div className="flex gap-10">
  //         <h2 className="text-2xl font-bold mb-4">Create Your Questions</h2>
  //         <Button
  //           name={"Delete Set"}
  //           className={"bg-red-600 hover:bg-red-800"}
  //           OnClick={() => handleDeleteSet(questionSet._id)}
  //         />
  //       </div>

  //       {questions.map((question, index) => (
  //         <div key={index} className="flex gap-5 items-center ">
  //           <div className="flex flex-col gap-2 w-full">
  //             <label className="text-white">Question {index + 1}</label>
  //             <input
  //               type="text"
  //               value={question}
  //               onChange={(e) => handleQuestionChange(index, e)}
  //               placeholder="Enter your question"
  //               className="p-2 bg-transparent border-b border-[#6A47FF] outline-none"
  //             />
  //           </div>
  //           <div>
  //             <Button
  //               OnClick={() => handleDeleteQuestion(index)}
  //               name="Delete"
  //             />
  //           </div>
  //         </div>
  //       ))}
  //       <div className={`flex justify-evenly items-center`}>
  //         <Button Type="button" OnClick={addQuestion} name="Add Questions" />
  //         {questionSet?.questions?.length > 0 ? (
  //           <Button name={"Update set"} OnClick={handleUpdateSet} />
  //         ) : (
  //           <Button name={"Add set"} OnClick={handleAddSets} />
  //         )}

  //         <Button
  //           Type="submit"
  //           className=" bg-green-500 px-6 py-2  dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
  //           name={"Submit"}
  //         />
  //       </div>
  //     </form>
  //   );
  // };

  const QuestionForm = ({ testId, questionSet, setTest }) => {
    const [questions, setQuestions] = useState(() =>
      questionSet?.questions?.length > 0 ? questionSet.questions : [""]
    );
    const [showPopup, setShowPopup] = useState(false);

    const addQuestion = () => {
      setQuestions((prevQuestions) => [...prevQuestions, ""]);
    };

    const handleQuestionChange = (index, event) => {
      setQuestions((prevQuestions) => {
        const newQuestions = [...prevQuestions];
        newQuestions[index] = event.target.value;
        return newQuestions;
      });
    };

    const handleSubmitAllSets = (event) => {
      event.preventDefault();
      console.log("Submitted Questions:", questions);
      setShowPopup(true); // Show popup when form is submitted
    };

    const handleCopyToClipboard = () => {
      navigator.clipboard.writeText(testId);
      alert("Test ID copied to clipboard!");
    };
    const handleAddSets = async () => {
      console.log("all questions", questions);

      try {
        const Response = await FetchData(`test/add-sets/${testId}`, "post", {
          questions: JSON.stringify(questions),
        });
        console.log(Response);

        alert(Response.data.message);
        setTest(Response.data.data.test);
        setShowForm(false);
      } catch (error) {
        console.error("error", error);
        alert(parseErrorMessage(error.response.data));
      }
    };

    const handleDeleteQuestion = (index) => {
      setQuestions((prevQuestions) =>
        prevQuestions.filter((_, i) => i !== index)
      );
    };

    const handleUpdateSet = async (index) => {
      try {
        const Response = await FetchData(
          `test/update-sets/${testId}/${questionSet._id}`,
          "post",
          {
            questions: JSON.stringify(questions),
          }
        );
        console.log(Response);
        alert(Response.data.message);
        setShowForm(false);
      } catch (error) {
        console.error("error", error);
        alert(parseErrorMessage(error.response.data));
      }
    };

    const handleDeleteSet = async (setId) => {
      try {
        const Response = await FetchData(
          `test/delete-sets/${testId}/${setId}`,
          "post"
        );
        console.log(Response);
        setTest(Response.data.data);
        alert(Response.data.message);
        setShowForm(false);
      } catch (error) {
        console.error("error", error);
        alert(parseErrorMessage(error.response.data));
      }
    };
    

    return (
      <div>
        <form
          onSubmit={handleSubmitAllSets}
          className="flex flex-col gap-5 w-full"
        >
          <div className="flex gap-10">
            <h2 className="text-2xl font-bold mb-4">Create Your Questions</h2>
            <Button
              name={"Delete Set"}
              className={"bg-red-600 hover:bg-red-800"}
              OnClick={() => handleDeleteSet(questionSet._id)}
            />
          </div>

          {questions.map((question, index) => (
            <div key={index} className="flex gap-5 items-center">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-white">Question {index + 1}</label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => handleQuestionChange(index, e)}
                  placeholder="Enter your question"
                  className="p-2 bg-transparent border-b border-[#6A47FF] outline-none"
                />
              </div>
              <div>
                <Button
                  OnClick={() => handleDeleteQuestion(index)}
                  name="Delete"
                />
              </div>
            </div>
          ))}
          <div className={`flex justify-evenly items-center`}>
            <Button Type="button" OnClick={addQuestion} name="Add Questions" />
            {questionSet?.questions?.length > 0 ? (
              <Button name={"Update set"} OnClick={handleUpdateSet} />
            ) : (
              <Button name={"Add set"} OnClick={handleAddSets} />
            )}

            <Button
              Type="submit"
              className=" bg-green-500 px-6 py-2 dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
              name={"Submit"}
            />
          </div>
        </form>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#1F222B] p-6 rounded-lg shadow-lg w-1/3">
              <h2 className="text-lg font-bold mb-4">Test ID</h2>
              <div className="flex items-center justify-between bg-gray-600 p-3 rounded-md">
                <span className="text-sm">{testId}</span>
                <button
                  onClick={handleCopyToClipboard}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={navigateHome}
                // onClick={() => setShowPopup(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-[#1F222B] flex  justify-evenly items-center w-full  h-fit min-h-screen">
      {/* Add sets and previously added sets */}
      <section className="w-2/5  ">
        {/* Add set btn */}
        <div className="flex gap-10 justify-center items-center">
          <h1 className="buttonForQuestions">Click here to add Questions</h1>
          <Button
            OnClick={() => {
              setQuestionSet({});
              setShowForm(true);
            }}
            name={"Create Sets"}
          />
        </div>

        {/* Previously added sets */}
        <div className="mt-10  ">
          <h1 className="text-2xl font-bold font-serif  text-center text-cyan-500  ">
            All sets added to this test
          </h1>
          <div className="flex justify-center items-center gap-5 flex-wrap w-full mt-10 py-2 px-5 ">
            {test?.sets?.map((set, index) => (
              <div
                key={index}
                className="bg-[#6A47FF] p-5 rounded-lg hover:bg-[#4a2cce] hover:scale-105 transition duration-150 ease-in-out cursor-pointer"
                onClick={() => {
                  console.log(set);
                  setQuestionSet(set);
                  setShowForm(true);
                  console.log("Selected Questions", questionSet);
                }}
              >
                <h2 className="text-white">Set {index + 1}</h2>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Area to add questions */}
      <section className="AreaToAddQuestions w-2/5 h-full p-10 flex flex-col justify-start items-start gap-10   ">
        {/* Test details part */}
        <div className="flex flex-col gap-5 w-full  ">
          <h1 className="text-2xl font-bold font-serif  text-center text-cyan-500">
            Test Details
          </h1>
          <div className="mx-10">
            <h2>
              <span className="font-serif text-xl text text-cyan-500">
                Test Title:
              </span>{" "}
              <span>{test?.title}</span>
            </h2>
            <h2>
              <span className="font-serif text-xl text text-cyan-500">
                Topic:
              </span>{" "}
              <span>{test?.topic[0]}</span>s
            </h2>
            <h2>
              <span className="font-serif text-xl text text-cyan-500">
                From{" "}
              </span>{" "}
              <span>{formatDateTime(test?.timing?.start)}</span> <br />
              <span className="font-serif text-xl text text-cyan-500">
                To{" "}
              </span>{" "}
              <span>{formatDateTime(test?.timing?.end)}</span>
            </h2>
          </div>
        </div>
        {/* Add Questions section */}
        <div className="w-full">
          {showForm && (
            <QuestionForm
              testId={testId}
              questionSet={questionSet}
              setTest={setTest}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default Questioner;
