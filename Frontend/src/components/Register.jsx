import React, { useState } from "react";
import Button from "../utils/Button";
import { FetchData } from "../utils/FetchFromApi";
import { institutions } from "../utils/Constants";

const Register = () => {
  const [formData, setFormData] = useState({
    userType: "student",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    college_name: "", //only for questioners
    question_preference: "", //only for questioners
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserTypeChange = (e) => {
    setFormData({
      ...formData,
      userType: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

     console.log(formData.userType);
     if (formData.userType === "student") {
       handleRespondentRegister();
       console.log("selected student");
     } else {
       handleQuestionerRegister();
       console.log("selected Teacher");
     }
    // console.log("Registration successful:", formData);
  };

  const handleRespondentRegister = async () => {
    try {
      const { name, email, password } = formData;
      const dataToSend = { name, email, password };

      const response = await FetchData(
        `respondent/register`,
        "post",
        dataToSend
      );
      console.log(dataToSend);

      if (response.status === 200) {
        console.log("Registration successful:", response.data);
        alert("Registration Successful");
      } else {
        console.error("Error:", response.data);
        setError("Failed to Register");
      }
    } catch (error) {
      console.error("Request failed:", error);
      setError("An error occurred during registration");
    }
  };
  const handleQuestionerRegister = async () => {
    try {
      // const { name, email, password } = formData;
      // const dataToSend = { name, email, password };

      const response = await FetchData(`questioner / register`, "post", formData);
      console.log(formData);

      if (response.status === 200) {
        console.log("Registration successful:", response.data);
        alert("Registration Successful");
      } else {
        console.error("Error:", response.data);
        setError("Failed to Register");
      }
    } catch (error) {
      console.error("Request failed:", error);
      setError("An error occurred during registration");
    }
  };

  return (
    <div className="py-20 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Type Selection */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="userType"
                value="student"
                checked={formData.userType === "student"}
                onChange={handleUserTypeChange}
                className="form-radio text-indigo-600"
              />
              <span className="text-white">Student</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="userType"
                value="teacher"
                checked={formData.userType === "teacher"}
                onChange={handleUserTypeChange}
                className="form-radio text-indigo-600"
              />
              <span className="text-white">Teacher</span>
            </label>
          </div>

          <div>
            <input
              placeholder="Enter Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border-b focus:outline-none border-indigo-500 bg-transparent text-white"
            />
          </div>

          <div>
            <input
              placeholder="Enter Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border-b focus:outline-none border-indigo-500 bg-transparent text-white"
            />
          </div>

          <div className="relative">
            <input
              placeholder="Enter Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border-b focus:outline-none border-indigo-500 bg-transparent text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="relative">
            <input
              placeholder="Confirm Password"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border-b focus:outline-none border-indigo-500 bg-transparent text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Conditionally only for Teachers */}
          {formData.userType === "teacher" && (
            <>
              <div>
                <select
                  name="college_name"
                  value={formData.college_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border-b focus:outline-none border-indigo-500 bg-transparent text-white"
                >
                  <option value="" disabled>
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

              <div>
                <select
                  name="question_preference"
                  value={formData.question_preference}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border-b focus:outline-none border-indigo-500 bg-transparent text-white"
                >
                  <option value="code" className="bg-gray-800">
                    Code
                  </option>
                  <option value="text" className="bg-gray-800">
                    Text
                  </option>
                </select>
              </div>
            </>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="w-full flex justify-center items-center">
            <Button
              type="submit"
              name="Register"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
