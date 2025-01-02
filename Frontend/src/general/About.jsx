import React from "react";
import { motion } from "framer-motion";

function AboutInstruction() {
  const listItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: -100 }}
      transition={{ duration: 1.5 }}
      className="bg-gray-900 text-white p-8 rounded-xl m-10"
    >
      <h1 className="text-3xl font-bold text-center mb-8">
        Instructions<br></br> (How to use this platform)
      </h1>

      {/* Steps for Teachers */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-500">
          Steps for <span className="text-white">Teacher</span> to generate
          Questions:
        </h2>
        <ol className="list-decimal list-inside text-lg">
          {[
            "Visit your Profile",
            "Click on Create Test Button",
            "Type the questions as many as you need",
            "Create Multiple Sets for Students in the same Room (optional)",
            "Click on Submit Questions Button to Send all Questions and generate a Unique test for Students.",
          ].map((step, index) => (
            <motion.li
              key={index}
              variants={listItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.3 }}
            >
              {step}
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Steps for Students */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-blue-500">
          Steps for <span className="text-white">Students</span> to answer
          Questions:
        </h2>
        <ol className="list-decimal list-inside text-lg">
          {[
            "Visit your Profile",
            "Click on Join Test Button and Enter the Code provided by Teacher",
            "Type the answers by viewing all the questions and saving the response",
            "Save each answer and click on Submit Button",
            "The grades for your answers will be visible on Your Profile.",
          ].map((step, index) => (
            <motion.li
              key={index}
              variants={listItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.3 }}
            >
              {step}
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}

export default AboutInstruction;
