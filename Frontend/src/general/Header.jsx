import React, { useRef, useState } from "react";
import Button from "../utils/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { parseErrorMessage } from "../utils/ErrorMessageParser";
import { FetchData } from "../utils/FetchFromApi";
import PopUp from "../utils/PopUp";

const Header = () => {
  const Navigate = useNavigate();
  const user = useSelector((store) => store.user.user);
  const [showPopup, setShowPopup] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);

    for (const [key, value] in formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = await FetchData("test/create-test", "post", formData);
      console.log(response);
      alert(response.data.message);
      Navigate(`/add-question/${response.data.data._id}`);
      setShowPopup(false);
    } catch (error) {
      console.error(error);
      alert(parseErrorMessage(error.response.data));
    }
  };

  const handleClickProfile = () => {
    Navigate("/profile");
  };
  return (
    <div className={`h-20 bg-[#191A1F] flex justify-around items-center`}>
      <section>
        {/* <h1>EvalEngine</h1> */}
        <Link className="logo text-cyan-500 font-bold text-lg" to={"/"}>
          EvalEngine
        </Link>
      </section>
      {user.length === 0 && (
        <section className={`flex justify-center items-center gap-5 px-5`}>
          <Button OnClick={() => Navigate("/login")} name={"Login"} />
          <Button OnClick={() => Navigate("/register")} name={"Register"} />
        </section>
      )}

      {user.length > 0 && (
        <div className="flex gap-5">
          <Button OnClick={handleClickProfile} name={user[0]?.name} />
          {user[1] === "student" ? (
            <Button OnClick={() => Navigate("/join-test")} name={"Join Test"} />
          ) : (
            <Button OnClick={() => setShowPopup(true)} name={"Create Test"} />
          )}
        </div>
      )}

      <div>
        {/* <Button OnClick={() => setShowPopup(true)} name={"Create Test"} /> */}

        {showPopup && (
          <PopUp onClose={() => setShowPopup(false)}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-[#1F222B] p-5 rounded-lg w-96"
            >
              <h2 className="text-xl font-bold mb-4">Create Test</h2>
              <div className="mb-3">
                <label className="block text-white mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-white mb-1">Topic</label>
                <input
                  type="text"
                  name="topic"
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-white mb-1">Start Time</label>
                <input
                  type="datetime-local"
                  name="startTime"
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-white mb-1">End Time</label>
                <input
                  type="datetime-local"
                  name="endTime"
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="block text-white mb-1">Question Sets</label>
                <input
                  type="text"
                  name="sets"
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded"
                  // required
                />
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  OnClick={() => setShowPopup(false)}
                  className={`bg-gray-600`}
                  name={"Cancel"}
                />
                <Button
                  name={"Submit"}
                  Type={"submit"}
                  className={`hover:bg-green-500 duration-300 ease-in-out`}
                />
              </div>
            </form>
          </PopUp>
        )}
      </div>
    </div>
  );
};

export default Header;
