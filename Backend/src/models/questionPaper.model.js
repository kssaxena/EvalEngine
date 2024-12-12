import mongoose from "mongoose";

const questionPaperSchema = new mongoose.Schema(
  {
    questions: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const QuestionPaper = mongoose.model(
  "QuestionPaper",
  questionPaperSchema
);
