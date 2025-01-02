import React, { useState } from "react";
import { Hero1 } from "../../assets/Images";
import Button from "../../utils/Button";
import { useNavigate } from "react-router-dom";
import PopUp from "../../utils/PopUp";
import AboutInstruction from "../../general/About";

const Hero = () => {
  // const handleClickQuestionerNavigate = () => {
  //   navigate("/questioner");
  // };

  return (
    <div className="bg-[#1F222B] flex justify-center items-center flex-col">
      <div className="bg-[#1F222B] flex justify-center items-center gap-28">
        <section className="flex justify-center items-center flex-col gap-10">
          <div>
            <h1 className="text-cyan-500 font-bold text-6xl">Welcome</h1>
            <p className="text-white text-lg">
              This is a platform where you can evaluate and analyze your skills
              and knowledge.
            </p>
          </div>
          <div className="flex justify-center items-center gap-5 px-5"></div>
        </section>
        <section>
          <img src={Hero1} alt="Hero Image" />
        </section>
      </div>
      <AboutInstruction />
    </div>
  );
};

export default Hero;
