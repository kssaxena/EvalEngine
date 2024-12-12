import React, { useRef, useState } from "react";
import Button from "../utils/Button";
import { FetchData } from "../utils/FetchFromApi";
import { institutions } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { parseErrorMessage } from "../utils/ErrorMessageParser";
import { setUser } from "../utils/UserSlice";

const Register = () => {
  // Variables
  const [userType, setUserType] = useState("student");
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState("");
  const formRef = useRef(null);
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  const inputList = [
    { title: "name", inputType: "text" },
    { title: "email", inputType: "email" },
    { title: "password", inputType: "password" },
    { title: "confirmPassword", inputType: "password" },
  ];

  // Utility functions
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const password = formData.get("password");
    const confPass = formData.get("confirmPassword");

    if (password != confPass) {
      setError("Password doesn't match! Please recheck");
      return;
    } else setError("");

    formData.delete("confirmPassword");

    const partialUrl =
      userType === "student" ? "respondent/register" : "questioner/register";

    try {
      const response = await FetchData(partialUrl, "post", formData);
      console.log(response);
      alert(response.data.message);
      Dispatch(setUser(response.data.data));
      Dispatch(setUser(userType));

      Navigate("/");
    } catch (error) {
      console.log(error);
      alert(parseErrorMessage(error.response.data));
    }
  };

  return (
    <div className="py-20 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">
          Register
        </h1>

        {/* User Type Selection */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="userType"
              value="student"
              onChange={handleUserTypeChange}
              className="form-radio text-indigo-600"
              defaultChecked
            />
            <span className="text-white">Student</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="userType"
              value="teacher"
              onChange={handleUserTypeChange}
              className="form-radio text-indigo-600"
            />
            <span className="text-white">Teacher</span>
          </label>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {/* Input fields */}
          {inputList.map((item, index) => {
            return item.title === "password" ||
              item.title === "confirmPassword" ? (
              <div className="relative" key={index}>
                <input
                  placeholder={item.title
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  type={showPassword[item.title] ? "text" : "password"}
                  name={item.title}
                  required
                  className="w-full px-4 py-2 mt-2 border-b focus:outline-none border-indigo-500 bg-transparent text-white"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prevData) => {
                      return {
                        ...prevData,
                        [item.title]: !showPassword[item.title],
                      };
                    })
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-500"
                >
                  {showPassword[item.title] ? "Hide" : "Show"}
                </button>
              </div>
            ) : (
              <div key={index}>
                <input
                  placeholder={item.title
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                  type={item.inputType}
                  name={item.title}
                  required
                  className="w-full px-4 py-2 mt-2 border-b focus:outline-none border-indigo-500 bg-transparent text-white"
                />
              </div>
            );
          })}

          {/* Institute selection */}
          {userType === "teacher" && (
            <div>
              <select
                name="collegeName"
                className="w-full px-4 py-2 mt-2 border-b focus:outline-none border-indigo-500 bg-transparent text-white"
                required
              >
                <option value="" selected disabled>
                  Select College Name
                </option>
                {institutions.map((institutions, index) => (
                  <option
                    key={index}
                    className="bg-gray-800"
                    value={institutions}
                  >
                    {institutions}
                  </option>
                ))}
              </select>
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="w-full flex justify-center items-center">
            <Button type="submit" name="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
