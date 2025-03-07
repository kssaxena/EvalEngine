import { useState } from "react";
import { Search } from "lucide-react";

// Sample data structure
const defaultTestData = {
  studentName: "John Doe",
  grade: "85%",
  explanation:
    "Great job! You demonstrated strong understanding but need slight improvement in structuring your answers.",
  questions: [
    {
      question: "What are the main causes of climate change?",
      answer: "Climate change is caused by greenhouse gases and deforestation.",
    },
    {
      question: "Explain Newton's Second Law of Motion.",
      answer: "It states that Force equals mass times acceleration.",
    },
    {
      question: "Describe the process of photosynthesis.",
      answer:
        "Photosynthesis is the process where plants convert sunlight, water, and carbon dioxide into oxygen and glucose.",
    },
    {
      question: "What is the significance of the Declaration of Independence?",
      answer:
        "The Declaration of Independence established the United States as a sovereign nation and outlined the fundamental principles of liberty and equality.",
    },
    {
      question: "Solve the equation: 2x + 5 = 15",
      answer: "x = 5",
    },
  ],
};

export default function StudentTestEvaluation({allData}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [testData] = useState(defaultTestData);

  // Filter questions based on search query
  const filteredQuestions = testData.questions.filter(
    (q) =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determine grade color based on percentage
  const getGradeColor = (grade) => {
    const percentage = parseInt(grade.replace("%", ""));
    if (percentage >= 80) return "bg-green-100 text-green-800 border-green-300";
    if (percentage >= 60)
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-red-100 text-red-800 border-red-300";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header Section */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Student Test Report
                </h1>
                <p className="text-gray-600 mt-1">{testData.studentName}</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-medium border ${getGradeColor(
                    testData.grade
                  )}`}
                >
                  Grade: {testData.grade}
                </span>
              </div>
            </div>
          </div>

          {/* AI Feedback Section */}
          <div className="p-6 bg-white border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              AI Evaluation
            </h2>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <p className="text-gray-700">{testData.explanation}</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-6 border-b border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search questions or answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Questions and Answers List */}
          <div className="max-h-[600px] overflow-y-auto">
            <ul className="divide-y divide-gray-200">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((item, index) => (
                  <li
                    key={index}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          Question {index + 1}:
                        </h3>
                        <p className="mt-1 text-gray-800">{item.question}</p>
                      </div>
                      <div>
                        <h4 className="text-md font-medium text-gray-700">
                          Student's Answer:
                        </h4>
                        <div className="mt-1 p-3 bg-gray-50 rounded-md border border-gray-200">
                          <p className="text-gray-800">{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="p-6 text-center text-gray-500">
                  No questions match your search criteria.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
