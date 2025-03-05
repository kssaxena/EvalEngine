import { GoogleGenerativeAI } from "@google/generative-ai";

const GenerateGrades = async () => {
  const genAI = new GoogleGenerativeAI(process.env.Google_Gemini_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "Explain how AI works";

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return result.response;
};
