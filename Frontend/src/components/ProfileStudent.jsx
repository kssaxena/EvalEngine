import React from "react";

const ProfileStudent = () => {
  return (
    <div className="flex flex-col items-center w-screen mx-auto p-4 bg-[#1F222B] backdrop-blur-3xl ">
      <section className="py-14 px-20 rounded-2xl shadow-xl flex flex-col justify-center items-center border bg-white/10  backdrop-blur-lg">
        {/* Profile Picture */}
        {/* <div className="w-full max-w-xs">
          <img
            className="rounded-full w-full shadow-lg"
            src="https://via.placeholder.com/150"
            alt="Profile Picture"
          />
        </div> */}

        <h2 className="text-xl font-bold mt-2 text-black px-14 py-2 shadow-sm shadow-white rounded-lg  bg-white/10 backdrop-blur-2xl">
          Student Name
        </h2>

        <div className="mt-8 flex flex-col justify-around h-auto w-fit">
          {/* Name and Email Section */}
          <div className="bg-white/40 bg-opacity-80 border border-gray-200 py-4 px-4 w-96 h-32 m-2 rounded-lg backdrop-blur-2xl shadow-xl text-white">
            <h3 className="text-lg font-semibold">Basic Details</h3>
            <ul className="mt-2 list-disc list-inside">
              <li>Name: John Doe</li>
              <li>Email: john.doe@example.com</li>
            </ul>
          </div>

          {/* Upcoming Test Section */}
          <div className="bg-white/40 bg-opacity-80 border border-gray-200 py-4 px-4 w-96 h-32 m-2 rounded-lg backdrop-blur-2xl text-white">
            <h3 className="text-lg font-semibold">Upcoming Test</h3>
            <ul className="mt-2 list-disc list-inside">
              <li>Math Test</li>
              <li>Physics Test</li>
            </ul>
          </div>

          {/* Completed Test Section */}
          <div className="bg-white/40 bg-opacity-80 border border-gray-200 py-4 px-4 w-96 h-32 m-2 rounded-lg backdrop-blur-2xl text-white">
            <h3 className="text-lg font-semibold">Completed Test</h3>
            <ul className="mt-2 list-disc list-inside">
              <li>English Test</li>
              <li>Chemistry Test</li>
              <li>History Test</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileStudent;
