import React from "react";
import Button from "../utils/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate("/login-Student");
  };
  const handleClickRegister = () => {
    navigate("/register-Student");
  };

  const handleClickProfile = () => {
    navigate("/profile-Student");
  };
  return (
    <div className={`h-20 bg-[#191A1F] flex justify-around items-center`}>
      <section>
        {/* <h1>EvalEngine</h1> */}
        <Link className="logo text-cyan-500 font-bold text-lg" to={"/"}>
          EvalEngine
        </Link>
      </section>
      <section className={`flex justify-center items-center gap-5 px-5`}>
        <Button OnClick={handleClickLogin} name={"Login"} />
        <Button OnClick={handleClickRegister} name={"Register"} />
      </section>
      <button
        onClick={handleClickProfile}
        className="px-4 py-2  dark:text-white text-black rounded-lg font-bold transform hover:translate-y-1 transition duration-400 bg-[#6A47FF]"
      >
        <section className={`flex justify-center items-center gap-5`}>
          <img
            src="https://via.placeholder.com/50"
            alt="Profile Pic"
            className="ProfilePic rounded-full"
          />
          <h2 className="ProfileHolderName">Name</h2>
        </section>
      </button>
    </div>
  );
};

export default Header;
