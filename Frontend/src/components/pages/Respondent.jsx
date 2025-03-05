import React, { useState } from "react";
import Button from "../../utils/Button";
import { Respondent1 } from "../../assets/Images";
import { useNavigate } from "react-router-dom";

const Respondent = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleToTest = () => {
    navigate(`/answers-page/${inputValue}`);
  };

  return (
    <div className="flex justify-around items-center h-screen">
      <section>
        <img src={Respondent1} alt="Respondent" />
      </section>
      <section className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <form
          className="flex flex-col justify-center items-center gap-5 p-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1>Enter Code or Link</h1>
          <input
            type="text"
            placeholder="Enter code or link"
            className="p-2 bg-transparent border-b border-[#6A47FF] outline-none w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button name={"OK"} OnClick={handleToTest} />
        </form>
      </section>
    </div>
  );
};

export default Respondent;
