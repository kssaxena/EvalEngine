export function getRandomIndex(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("Invalid array");
  }
  return Math.floor(Math.random() * arr.length);
}

// export const prompt = `
// You are an advanced grading assistant. Your task is to evaluate a student's responses based on the given rubric for each question. 
// Analyze all answers thoroughly and provide an overall grade along with a short explanation.

// Questions and Answers:
// ${questionsAndAnswers
//   .map(
//     (qa, index) => `
// ${index + 1}. Question: ${qa.question}  
//    Student's Answer: ${qa.answer}  
//    Rubric: ${qa.rubric}  
// `
//   )
//   .join("\n")}

// ### Grading Criteria:
// - Each question will be graded based on its respective rubric.
// - The final grade should reflect the student's performance across all questions.
// - Consider factors such as accuracy, completeness, clarity, and structure.
// - The final grade should be in the range of **A-F**.
// - Provide a concise summary explaining the grade.

// Provide your response in the following format:

// Overall Grade: [A-F]  
// Explanation: [Your brief reasoning here]
// `;

