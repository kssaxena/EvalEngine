import React, { useState } from "react";
import { Hero1 } from "../../assets/Images";
import Button from "../../utils/Button";
import { useNavigate } from "react-router-dom";
import PopUp from "../../utils/PopUp";

const Hero = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    topic: "",
    start: "",
    end: "",
    sets: "",
  });

  const handleClickQuestioner = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleClickRespondentNavigate = () => {
    navigate("/respondent");
  };

  // const handleClickQuestionerNavigate = () => {
  //   navigate("/questioner");
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setShowPopup(false);
    navigate("/questioner");
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
          <Button OnClick={handleClickRespondentNavigate} name={"Join Test"} />
        </div>
      </section>
      <section>
        <img src={Hero1} alt="Hero Image" />
      </section>

      {showPopup && (
        <PopUp onClose={handleClosePopup}>
          <form
            onSubmit={handleSubmit}
            className="bg-[#1F222B] p-5 rounded-lg w-96"
          >
            <h2 className="text-xl font-bold mb-4">Create Test</h2>
            <div className="mb-3">
              <label className="block text-white mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-white mb-1">Topic</label>
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-white mb-1">Start Time</label>
              <input
                type="datetime-local"
                name="start"
                value={formData.start}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-white mb-1">End Time</label>
              <input
                type="datetime-local"
                name="end"
                value={formData.end}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-white mb-1">Question Sets</label>
              <input
                type="text"
                name="sets"
                value={formData.sets}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                // required
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                OnClick={handleClosePopup}
                className={`bg-gray-600`}
                name={"Cancel"}
              />
              <Button
                name={"Submit"}
                className={`hover:bg-green-500 duration-300 ease-in-out`}
              />
            </div>
          </form>
        </PopUp>
      )}
    </div>
  );
};

export default Hero;
