import { GoogleGenerativeAI } from "@google/generative-ai";

export const GenerateGrades = async (prompt) => {
  const genAI = new GoogleGenerativeAI(process.env.Google_VERTEX_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  // console.log("From ai function", result.response.text());
  return result.response.text();
};
