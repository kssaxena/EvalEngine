export function getRandomIndex(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error("Invalid array");
  }
  return Math.floor(Math.random() * arr.length);
}

export const PromptGenerator = (questionsAndAnswers) => {
  return `
  You are an advanced grading assistant. Your task is to evaluate a student's responses based on the given rubric for each question. 
  Analyze all answers thoroughly and provide an overall grade along with a short explanation.
  
  Questions and Answers:
  ${questionsAndAnswers
    .map(
      (qa, index) => `
  ${index + 1}. Question: ${qa.question}  
     Student's Answer: ${qa.answer}  
  `
    )
    .join("\n")}
  
  ### Grading Criteria:
  - Each question will be graded based on its respective rubric.
  - The final grade should reflect the student's performance across all questions.
  - Consider factors such as accuracy, completeness, clarity, and structure.
  - The final grade should be in the range of **A-F**.
  - Provide a concise summary explaining the grade.
  - If the answer is N/A, consider that the student has skipped this question.
  - If the question is skipped, 0 marks for that question and don't take that answer into consideration for the final grade.
  
  Provide your response in the following format:
  
  Overall Grade: [A-F]  
  Explanation: [Your brief reasoning here]
  `;
};

export function pairQuestionsWithAnswers(questions, answers) {
  if (!Array.isArray(questions) || !Array.isArray(answers)) {
    throw new Error("Both questions and answers must be arrays");
  }
  if (questions.length !== answers.length) {
    throw new Error("Questions and answers arrays must have the same length");
  }

  return questions.map((question, index) => ({
    question: question,
    answer: answers[index],
  }));
}

export function extractGradeAndExplanation(response) {
  const gradeMatch = response.match(/Overall Grade:\s*([A-F])/);
  const explanationMatch = response.match(/Explanation:(.*)/s);

  const grade = gradeMatch ? gradeMatch[1] : null;
  const explanation = explanationMatch ? explanationMatch[1].trim() : null;

  return { grade, explanation };
}
