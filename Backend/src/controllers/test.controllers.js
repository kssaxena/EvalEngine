import { UserQuestioner } from "../models/questioner.models.js";
import { QuestionPaper } from "../models/questionPaper.model.js";
import { Test } from "../models/Test.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";

const CreateTest = asyncHandler(async (req, res) => {
  const { title, topic, startTime, endTime } = req.body;

  if (!title || !topic || !startTime || !endTime)
    throw new ApiError(400, "All fields must be provided");

  if (!req.user._id || !req.user)
    throw new ApiError(400, "Authentication failed! Please check middleware");

  const newTest = await QuestionPaper.create({
    title,
    topic: topic || "",
    timing: {
      start: startTime,
      end: endTime,
    },
    questioner: req.user._id,
  });

  const createdTest = await QuestionPaper.findById(newTest._id);

  if (!createdTest)
    throw new ApiError(
      500,
      "Failed to create test due to some internal error! Please try again"
    );

  const user = await UserQuestioner.findById(req.user._id);
  user.allTests.push(createdTest._id);
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, createdTest, "Test created successfully!"));
});

const GetTestById = asyncHandler(async (req, res) => {
  const { testId } = req.params;
  if (!testId) throw new ApiError(400, "Please provide the test id!");

  const test = await Test.findById(testId);
  if (!test) throw new ApiError(400, "Test not found!");

  res
    .status(200)
    .json(new ApiResponse(200, test, "Test fetched successfully!"));
});

const DeleteTestById = asyncHandler(async (req, res) => {
  const { testId } = req.params;
  if (!testId) throw new ApiError(400, "Please provide the test id!");

  const test = await Test.findByIdAndDelete(testId);
  if (!test) throw new ApiError(400, "Test not found!");

  res
    .status(200)
    .json(new ApiResponse(200, test, "Test deleted successfully!"));
});

const UpdateTestById = asyncHandler(async (req, res) => {
  const { testId } = req.params;
  const { startTime, endTime } = req.body;

  if (!testId) throw new ApiError(400, "Please provide the test id!");
  if (!startTime || !endTime)
    throw new ApiError(400, "Start time and end time not found!");

  const test = await Test.findByIdAndUpdate(testId, {
    timing: {
      start: startTime,
      end: endTime,
    },
  });

  if (!test) throw new ApiError(400, "Test not found!");

  res
    .status(200)
    .json(new ApiResponse(200, test, "Test updated successfully!"));
});

const AddQuestionPaper = asyncHandler(async (req, res) => {
  const { questions } = req.body;
  const { testId } = req.params;

  console.log(testId,questions )

  if (questions.length === 0) throw new ApiError(400, "Questions not found!");

  if (!testId) throw new ApiError(400, "Please provide the test id!");

  const test = await Test.findById(testId);

  if (!test)
    throw new ApiError(400, "Provider test id is not valid! Please try again");

  const newQuestionPaper = await QuestionPaper.create({
    questions,
  });

  const createdQuestionPaper = await QuestionPaper.findById(
    newQuestionPaper._id
  );

  if (!createdQuestionPaper)
    throw new ApiError(
      500,
      "failed to create question paper due to some internal error! Please try again"
    );

  test.sets.push(createdQuestionPaper._id);
  await test.save();

  res
    .status(200)
    .json(new ApiResponse(200, createdQuestionPaper, "Set created 😊"));
});

const DeleteQuestionPaper = asyncHandler(async (req, res) => {
  const { testId, setIndex } = req.params;

  if (!testId || !setIndex)
    throw new ApiError(400, "Please provide test id and set index!");

  const test = await Test.findById(testId);
  if (!test)
    throw new ApiError(400, "Provider test id is not valid! Please try again");

  if (!test.sets[setIndex])
    throw new ApiError(
      400,
      "Provider set index is not valid! Please try again"
    );

  const questionPaperId = test.sets[setIndex];

  const deletedQuestionPaper = await QuestionPaper.findByIdAndDelete(
    questionPaperId
  );
  if (!deletedQuestionPaper)
    throw new ApiError(
      500,
      "Failed to delete question paper due to some internal error! Please try again"
    );

  test.sets.splice(setIndex, 1);
  await test.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, deletedQuestionPaper, "Set deleted successfully!")
    );
});

export {
  CreateTest,
  GetTestById,
  UpdateTestById,
  DeleteTestById,
  AddQuestionPaper,
  DeleteQuestionPaper,
};
