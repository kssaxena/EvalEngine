import React from "react";

const Button = ({ name, OnClick, Type }) => {
  return (
    <div>
      <button
        type={Type}
        onClick={OnClick}
        className="px-6 py-2  dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 bg-[#6A47FF]"
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
