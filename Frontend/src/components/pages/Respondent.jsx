import React from "react";
import Button from "../../utils/Button";
import { Respondent1 } from "../../assets/Images";

const Respondent = () => {
  return (
    <div className="flex justify-around items-center h-screen">
      <section>
        <img src={Respondent1} alt="Respondent" className="" />
      </section>
      <section className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <form
          className={`flex flex-col justify-center items-center gap-5 p-10`}
        >
          <h1>Enter Code or Link</h1>
          <input
            type="text"
            placeholder="Enter code or link"
            className="p-2 bg-transparent border-b border-[#6A47FF] outline-none w-full"
          />
          <Button name={"OK"} />
        </form>
      </section>
    </div>
  );
};

export default Respondent;
