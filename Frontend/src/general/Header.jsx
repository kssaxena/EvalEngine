import React from "react";
import Button from "../utils/Button";

const Header = () => {
  return (
    <div className={`h-20 bg-[#191A1F] flex justify-around items-center`}>
      <section>
        <h1 className="logo text-cyan-500 font-bold text-lg">EvalEngine</h1>
      </section>
      <section className={`flex justify-center items-center gap-5 px-5`}>
        <Button name={"Login"} />
        <Button name={"Register"} />
      </section>
      {/* <section className={`flex justify-center items-center border gap-5 px-5`}>
        <img
          src="https://via.placeholder.com/50"
          alt="Profile Pic"
          className="ProfilePic rounded-full"
        />
        <h2 className="ProfileHolderName">Name</h2>
      </section> */}
    </div>
  );
};

export default Header;
