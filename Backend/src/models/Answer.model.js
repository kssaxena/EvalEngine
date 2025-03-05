import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    answer: [
      {
        type: String,
      },
    ],

    responder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Respondent",
      required: true,
    },

    questionPaper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionPaper",
      required: true,
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Answer = mongoose.model("Answer", answerSchema);
