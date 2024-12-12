import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    topic: [
      {
        type: String,
      },
    ],

    timing: {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
      },
    },

    questioner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserQuestioner",
      required: true,
    },

    sets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuestionPaper",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Test = mongoose.model("Test", testSchema);
