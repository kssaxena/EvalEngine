import React, { useState } from "react";
import Button from "../utils/Button";

const RegisterStudent = () => {
  const [formData, setFormData] = useState({
    userType: "student",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    collegeName: "", // For teachers only
    questionPreference: "", // For teachers only
  });
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
    setError("");
    console.log("Registration successful:", formData);
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

          <div>
            <input
              placeholder="Enter Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border-b focus:outline-none border-indigo-500 bg-transparent text-white"
            />
          </div>

          <div>
            <input
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 border-b focus:outline-none border-indigo-500 bg-transparent text-white"
            />
          </div>

          {/* Conditionally only for Teachers */}
          {formData.userType === "teacher" && (
            <>
              {/* College Name Input */}
              <div>
                <input
                  placeholder="College Name"
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border-b focus:outline-none border-indigo-500 bg-transparent text-white"
                />
              </div>

              <div>
                <input
                  placeholder="Question Preference"
                  type="text"
                  name="questionPreference"
                  value={formData.questionPreference}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 mt-2 border-b focus:outline-none border-indigo-500 bg-transparent text-white"
                />
              </div>
            </>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/*  */}
          <div className="w-full flex justify-center items-center">
            <Button Type={"submit"} name={"Register"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterStudent;
