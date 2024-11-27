import React from "react";

const ProfileStudent = () => {
  return (
    <div className="flex flex-col items-center max-w-screen-sm mx-auto p-4">
      <section className=" py-20 px-20 rounded-2xl shadow-md border border-[#6A47FF] shadow-[#6A47FF] flex flex-col justify-center items-center">
        {/* <div className="w-full max-w-xs">
        <img
          className="rounded-full w-full"
          src="https://via.placeholder.com/150"
          alt="Profile Picture"
        />
      </div> */}
        <h2 className="text-2xl font-bold mt-4">Student Name</h2>

        <div className="mt-8">
          {/* <div className="border-t border-gray-200 py-4">
          <h3 className="text-lg font-semibold">About Me</h3>
          <p className="mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
            risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing
            nec, ultricies sed, dolor.
          </p>
        </div> */}

          <div className="border-t border-gray-200 py-4">
            <h3 className="text-lg font-semibold">Education</h3>
            <ul className="mt-2 list-disc list-inside">
              <li>University of XYZ - Bachelor's Degree in Computer Science</li>
              <li>College ABC - High School Diploma</li>
            </ul>
          </div>

          <div className="border-t border-gray-200 py-4">
            <h3 className="text-lg font-semibold">Skills</h3>
            <ul className="mt-2 list-disc list-inside">
              <li>JavaScript</li>
              <li>React</li>
              <li>HTML/CSS</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileStudent;
