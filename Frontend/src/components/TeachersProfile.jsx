import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PopUp from "../utils/PopUp";
import Button from "../utils/Button";
import { parseErrorMessage } from "../utils/ErrorMessageParser";
import { FetchData } from "../utils/FetchFromApi";
import {
  formatDate,
  formatDateTime,
  formatTime,
} from "../utils/FormatDateTime";

export default function TeachersProfile() {
  // Variables
  const user = useSelector((store) => store.user.user);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef(null);
  const [tests, setTests] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    for (const [key, value] in formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await FetchData("test/create-test", "post", formData);
      console.log(response);
      alert(response.data.message);
      navigate(`/add-question/${response.data.data._id}`);
      setShowPopup(false);
    } catch (error) {
      console.error(error);
      alert(parseErrorMessage(error.response.data));
    }
  };

  useEffect(() => {
    const FetchAllTests = async () => {
      if (user && user[0]._id) {
        try {
          const response = await FetchData(
            `test/get-my-tests/${user[0]._id}`,
            "get"
          );
          console.log(response);
          setTests(response.data.data.tests);
        } catch (error) {
          console.error(error);
          // alert(parseErrorMessage(error.response.data));
        }
      }
    };

    FetchAllTests();
  }, [user]);

  const handleCopyToClipboard = (testId) => {
    navigator.clipboard
      .writeText(testId)
      .then(() => {
        alert("Test ID copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
        alert("Failed to copy the Test ID.");
      });
  };

  return (
    <div className="flex flex-col items-center w-screen mx-auto p-4 bg-[#1F222B] backdrop-blur-3xl  ">
      <section className="w-5/6 h-[74vh]  rounded-2xl shadow-xl flex flex-col  items-center border border-neutral-700  backdrop-blur-lg">
        <div className="bg-neutral-700 text-xl flex flex-col justify-center items-center px-4 py-1  mt-2 rounded-lg backdrop-blur-2xl">
          <h1 className="text-sm">
            Hello, Mr.{" "}
            <span className="text-2xl font-serif font-bold">
              {user[0]?.name}
            </span>
          </h1>
          <span className="text-sm font-thin">{user[0]?.email}</span>
        </div>

        <div className="mt-8 flex  justify-around h-auto w-full items-center">
          <div className=" flex flex-col items-center gap-10">
            <Button OnClick={() => setShowPopup(true)} name={"Create Test"} />

            {showPopup && (
              <PopUp onClose={() => setShowPopup(false)}>
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="bg-[#1F222B] p-5 rounded-lg w-96"
                >
                  <h2 className="text-xl font-bold mb-4">Create Test</h2>
                  <div className="mb-3">
                    <label className="block text-white mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-white mb-1">Topic</label>
                    <input
                      type="text"
                      name="topic"
                      className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-white mb-1">Start Time</label>
                    <input
                      type="datetime-local"
                      name="startTime"
                      className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-white mb-1">End Time</label>
                    <input
                      type="datetime-local"
                      name="endTime"
                      className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="block text-white mb-1">
                      Question Sets
                    </label>
                    <input
                      type="text"
                      name="sets"
                      className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                      // required
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button
                      OnClick={() => setShowPopup(false)}
                      className={`bg-gray-600`}
                      name={"Cancel"}
                    />
                    <Button
                      name={"Submit"}
                      Type={"submit"}
                      className={`hover:bg-green-500 duration-300 ease-in-out`}
                    />
                  </div>
                </form>
              </PopUp>
            )}
          </div>

          {/* Upcoming Test Section */}
          <div className=" border border-gray-700 w-3/4 h-96 m-2 rounded-lg backdrop-blur-2xl text-white   overflow-hidden">
            <h3 className="text-lg text-center font-semibold  ">
              Created tests
            </h3>
            <div className="h-[47vh] w-full overflow-y-scroll overflow-x-hidden">
              {tests?.map((element, index) => (
                <div className="flex justify-center items-center w-full">
                  <Link
                    to={`/add-question/${element._id}`}
                    key={index}
                    className=" flex justify-between items-center px-4  mx-5  my-4 h-8 rounded-xl bg-[#6A47FF] drop-shadow-lg hover:scale-y-110 hover:drop-shadow-2xl  transition duration-200 ease-in-out cursor-pointer w-3/4"
                  >
                    <span className="">{index + 1}</span>
                    <h2 className="transition duration-200 ease-in-out group-hover:font-bold group-hover:scale-110">
                      {element.title}
                    </h2>
                    <p>
                      on{" "}
                      <span className="transition duration-200 ease-in-out group-hover:font-bold group-hover:scale-110">
                        {formatDate(element.timing.start)}
                      </span>
                    </p>
                    <p className="transition duration-200 ease-in-out group-hover:font-bold group-hover:scale-110">
                      from <span>{formatTime(element.timing.start)}</span>
                    </p>
                    <p className="transition duration-200 ease-in-out group-hover:font-bold group-hover:scale-110">
                      to <span>{formatTime(element.timing.end)}</span>
                    </p>
                  </Link>
                  <Button
                    name={"Copy test Id"}
                    OnClick={() => handleCopyToClipboard(element._id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
