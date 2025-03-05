import React from "react";
import { useSelector } from "react-redux";
import Button from "../utils/Button";

const ProfileStudent = () => {
  const user = useSelector((store) => store.user.user);
  console.log(user);

  const ListElement = ({ element, index }) => {
    return (
      <div className="group flex justify-between items-center px-4  mx-5  my-4 h-8 rounded-xl bg-[#6A47FF] drop-shadow-lg hover:scale-105 hover:drop-shadow-2xl  hover:h-12 transition duration-200 ease-in-out cursor-pointer">
        <span className="">{index + 1}</span>
        <h2 className="transition duration-200 ease-in-out group-hover:font-bold group-hover:scale-110">
          Maths Test
        </h2>
        <p>
          on{" "}
          <span className="transition duration-200 ease-in-out group-hover:font-bold group-hover:scale-110">
            15th March
          </span>{" "}
          2023
        </p>
        <p className="transition duration-200 ease-in-out group-hover:font-bold group-hover:scale-110">
          from 12:00 am
        </p>
        <p className="transition duration-200 ease-in-out group-hover:font-bold group-hover:scale-110">
          to 1:00 pm
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center h-screen overflow-x-hidden mx-auto p-4 bg-[#1F222B] backdrop-blur-3xl  ">
      <section className="w-5/6 h-[74vh]  rounded-2xl shadow-xl flex flex-col  items-center border border-[#6A46FF] backdrop-blur-lg">
        <div className="text-xl  flex flex-col justify-center items-center px-4 py-1   mt-2 text-black rounded-lg  bg-[#6A46FF] backdrop-blur-2xl">
          <h1 className="flex gap-2 justify-center items-center flex-col">
            Hii,{" "}
            <span className="text-2xl font-serif font-bold text-white">
              {user[0]?.name}
            </span>
            <span className="text-sm font-thin text-white">
              {user[0]?.email}
            </span>
          </h1>
        </div>

        <div className="mt-8 flex  justify-around h-auto w-full">
          {/* Upcoming Test Section */}
          <div className="bg-white/20 w-1/2 h-96 m-2 rounded-lg backdrop-blur-2xl text-white   overflow-hidden">
            <h3 className="text-xl font-serif text-center font-semibold  ">
              Upcoming Test
            </h3>
            <div className="h-[47vh]  overflow-y-scroll overflow-x-hidden">
              {Array(10)
                .fill(0)
                .map((element, index) => (
                  <ListElement key={index} index={index} element={element} />
                ))}
            </div>
          </div>

          {/* Completed Test Section */}
          <div className="bg-white/20 w-1/2 h-96 m-2 rounded-lg backdrop-blur-2xl text-white   overflow-hidden">
            <h3 className="text-xl font-serif text-center font-semibold  ">
              Completed Test
            </h3>
            <div className="h-[47vh]  overflow-y-scroll overflow-x-hidden">
              {Array(3)
                .fill(0)
                .map((element, index) => (
                  <ListElement key={index} index={index} element={element} />
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileStudent;
