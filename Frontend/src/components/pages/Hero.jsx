import React from "react";
import { Hero1 } from "../../assets/Images";
import Button from "../../utils/Button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const handleClickQuestioner = () => {
    navigate("/questioner");
  };
  const handleClickRespondent = () => {
    navigate("/respondent");
  };

  return (
    <div className="bg-[#1F222B] flex justify-center items-center gap-28 py-20">
      <section className="flex justify-center items-center flex-col gap-10">
        <div>
          <h1 className="text-cyan-500 font-bold text-6xl">Welcome</h1>
          <p className="text-white text-lg">
            This is a platform where you can evaluate and analyze your skills
            and knowledge.
          </p>
        </div>
        <div className="flex justify-center items-center gap-5 px-5">
          <Button OnClick={handleClickQuestioner} name={"Create Test"} />
          <Button OnClick={handleClickRespondent} name={"Join Test"} />
        </div>
      </section>
      <section>
        <img src={Hero1} alt="Hero Image" />
      </section>
    </div>
  );
};

export default Hero;
