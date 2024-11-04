import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-800 text-white py-4 px-6 text-center">
      <p>© EvalEngine . All rights reserved.</p>
      <p>
        <a href="#" className="text-blue-500 hover:underline">
          Terms of Service
        </a>
        {" | "}
        <a href="#" className="text-blue-500 hover:underline">
          Privacy Policy
        </a>
      </p>
    </div>
  );
};

export default Footer;
