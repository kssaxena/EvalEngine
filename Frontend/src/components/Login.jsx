import React, { useRef, useState } from "react";
import Button from "../utils/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FetchData } from "../utils/FetchFromApi";
import { setUser } from "../utils/UserSlice";
import { parseErrorMessage } from "../utils/ErrorMessageParser";

const LoginStudent = () => {
  const formRef = useRef(null);
  const [userType, setUserType] = useState("student");
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    const partialUrl =
      userType === "student" ? "respondent/login" : "questioner/login";

    try {
      const response = await FetchData(partialUrl, "post", formData);
      console.log(response);

      // Storing the tokens into browser's local storage
      localStorage.clear(); // will clear the all the data from localStorage
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      localStorage.setItem("userType", userType);

      alert(response.data.message);
      Dispatch(setUser(response.data.data.user));
      Dispatch(setUser(userType));
      Navigate("/");
    } catch (error) {
      console.log(error);
      alert(parseErrorMessage(error.response.data));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <section className="flex flex-col justify-center items-center w-full">
        {/* form  */}
        <div className="flex justify-center items-center flex-col gap-10 py-20 w-[30%]">
          <h1>Login</h1>

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

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col gap-5 w-[70%]"
          >
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="p-2 bg-transparent border-b border-[#6A47FF] outline-none w-full"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="p-2 bg-transparent border-b border-[#6A47FF] outline-none w-full"
            />
            <Button Type="submit" name={"Login"} />
          </form>
        </div>
      </section>
      <div className="m-20">
        <p>
          Don't have an account?{" "}
          <a href="/register-student" className="hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginStudent;
