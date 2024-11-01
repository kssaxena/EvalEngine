import React from "react";
import Button from "../utils/Button";

const LoginStudent = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <section className="flex justify-center items-center w-full">
        {/* <h1>For Teachers</h1> */}

        <div className="flex justify-center items-center flex-col gap-10 py-20 w-[30%]">
          <h1>Login as Student</h1>
          <form className="flex justify-center items-center flex-col gap-5 w-[70%]">
            <input
              type="text"
              placeholder="Username"
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

        {/* <h1>For Teachers</h1> */}

        <div className="flex justify-center items-center flex-col gap-10 py-20 w-[30%]">
          <h1>Login as Teacher</h1>
          <form className="flex justify-center items-center flex-col gap-5 w-[70%]">
            <input
              type="text"
              placeholder="Username"
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
          Don't have an account? <a href="/register-student" className="hover:underline">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default LoginStudent;
