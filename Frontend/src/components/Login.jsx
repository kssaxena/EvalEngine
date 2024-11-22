import React, { useRef } from "react";
import Button from "../utils/Button";

const LoginStudent = () => {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(formRef);

    console.log(formData.get("userType"));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <section className="flex flex-col justify-center items-center w-full">
        {/* form  */}
        <div className="flex justify-center items-center flex-col gap-10 py-20 w-[30%]">
          <h1>Login</h1>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex justify-center items-center flex-col gap-5 w-[70%]"
          >
            {/* User Type Selection */}
            <div className="flex items-center justify-center space-x-4 mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="userType"
                  value="student"
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
                  className="form-radio text-indigo-600"
                />
                <span className="text-white">Teacher</span>
              </label>
            </div>

            <input
              type="email"
              placeholder="Email"
              className="p-2 bg-transparent border-b border-[#6A47FF] outline-none w-full"
            />
            <input
              type="password"
              placeholder="Password"
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
