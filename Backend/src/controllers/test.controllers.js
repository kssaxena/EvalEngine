import { Teacher } from "../models/teacher.model.js";
import { QuestionPaper } from "../models/questionPaper.model.js";
import { Test } from "../models/Test.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Answer } from "../models/Answer.model.js";
import { getRandomIndex } from "../utils/UtilityFunction.js";
import Respondent from "../models/Respondent.model.js";

const CreateTest = asyncHandler(async (req, res) => {
  const { title, topic, startTime, endTime } = req.body;

  if (!title || !topic || !startTime || !endTime)
    throw new ApiError(400, "All fields must be provided");

  if (!req.user._id || !req.user)
    throw new ApiError(400, "Authentication failed! Please check middleware");

  const newTest = await Test.create({
    title,
    topic: topic || "",
    timing: {
      start: startTime,
      end: endTime,
    },
    questioner: req.user._id,
  });

  const createdTest = await Test.findById(newTest._id);

  if (!createdTest)
    throw new ApiError(
      500,
      "Failed to create test due to some internal error! Please try again"
    );

  const user = await Teacher.findById(req.user._id);
  user.allTests.push(createdTest._id);
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, createdTest, "Test created successfully!"));
});

const GetTestById = asyncHandler(async (req, res) => {
  const { testId } = req.params;
  if (!testId) throw new ApiError(400, "Please provide the test id!");

  const test = await Test.findById(testId).populate("sets");
  if (!test) throw new ApiError(400, "Test not found!");

  res
    .status(200)
    .json(new ApiResponse(200, test, "Test fetched successfully!"));
});

const GetMyTests = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (!userId) throw new ApiError(400, "Please provide the user id!");

  const teacher = await Teacher.findById(userId).populate("allTests");
  if (!teacher) throw new ApiError(400, "Teacher not found!");

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { tests: teacher.allTests },
        "Tests fetched successfully!"
      )
    );
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

  const allQuestions = JSON.parse(questions);

  console.log(testId, allQuestions);

  if (allQuestions.length === 0)
    throw new ApiError(400, "Questions not found!");

  if (!testId) throw new ApiError(400, "Please provide the test id!");

  const test = await Test.findById(testId);

  if (!test)
    throw new ApiError(400, "Provider test id is not valid! Please try again");

  const newQuestionPaper = await QuestionPaper.create({
    questions: allQuestions,
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

  const updatedTest = await test.populate("sets");

  res
    .status(200)
    .json(new ApiResponse(200, { test: updatedTest }, "Set created 😊"));
});

const UpdateQuestionPaper = asyncHandler(async (req, res) => {
  const { questions } = req.body;
  const { testId, setId } = req.params;
  const setIndex = 0;
  if (!questions || !testId || !setId)
    throw new ApiError(400, "Please provide all fields!");

  const allQuestions = JSON.parse(questions);

  if (allQuestions.length === 0)
    throw new ApiError(400, "Questions not found!");

  const test = await Test.findById(testId);
  if (!test)
    throw new ApiError(400, "Provider test id is not valid! Please try again");

  if (!test.sets.some((set) => set.equals(setId)))
    throw new ApiError(
      400,
      "Provider set index is not valid! Please try again"
    );

  const updatedQuestionPaper = await QuestionPaper.findByIdAndUpdate(
    setId,
    {
      questions: allQuestions,
    },
    { new: true }
  );

  if (!updatedQuestionPaper)
    throw new ApiError(
      500,
      "Failed to update question paper due to some internal error! Please try again"
    );

  const newTest = await Test.findById(testId).populate("sets");

  res
    .status(200)
    .json(new ApiResponse(200, { test: newTest }, "Set updated successfully!"));
});

const DeleteQuestionPaper = asyncHandler(async (req, res) => {
  const { testId, setId } = req.params;

  const result = await Test.updateOne(
    { _id: testId }, // Match the specific test document
    { $pull: { sets: setId } } // Remove the setId from the sets array
  );

  const newTest = await Test.findById(testId).populate("sets");

  if (result.modifiedCount > 0) {
    res
      .status(200)
      .json(new ApiResponse(200, newTest, "Set deleted successfully!"));
  } else {
    throw new ApiError(500, "Failed to delete set! Please try again");
  }
});

const GetQuestionPaper = asyncHandler(async (req, res) => {
  const { testId } = req.params;

  if (!testId) throw new ApiError(400, "Please provide test id!");

  const test = await Test.findById(testId);
  if (!test) throw new ApiError(400, "Test not found!");

  const randomSet = getRandomIndex(test.sets);
  const testSet = await QuestionPaper.findById(test.sets[randomSet]);
  console.log(testSet)
  if (!testSet)
    throw new ApiError(500, "Some internal error in finding random sets!");

  res
    .status(200)
    .json(
      new ApiResponse(200, testSet, "Question paper fetched successfully!")
    );
});

const SubmitAnswersResponse = asyncHandler(async (req, res) => {
  const { answers, setId, testId } = req.body;
  const { studentId } = req.params;

  if (!studentId) throw new ApiError(400, "Please provide student id!");

  const student = await Respondent.findById(studentId);
  if (!student) throw new ApiError(400, "Student not found!");

  if (!answers || answers.length === 0) {
    throw new ApiError(400, "Please provide answers!");
  }

  if (!setId || !testId)
    throw new ApiError(400, "Please provide test id and set id!");

  const test = await Test.findById(testId);
  if (!test)
    throw new ApiError(400, "Provider test id is not valid! Please try again");

  const set = await Set.findById(setId);
  if (!set)
    throw new ApiError(400, "Provider set id is not valid! Please try again");

  const answer = await Answer.create({
    answers,
    questionPaper: set._id,
    test: test._id,
    responder: studentId,
  });

  if (!answer)
    throw new ApiError(
      500,
      "Failed to create answer due to some internal error! Please try again"
    );

  const updatedTest = await Test.findByIdAndUpdate(
    testId,
    {
      $push: { answer: answer._id },
    },
    { new: true }
  );

  if (!updatedTest)
    throw new ApiError(
      500,
      "Failed to submit answers due to some internal error! Please try again"
    );

  res
    .status(201)
    .json(new ApiResponse(201, {}, "Your answer is updated successfully 😊"));
});

export {
  CreateTest,
  GetMyTests,
  GetTestById,
  UpdateTestById,
  DeleteTestById,
  AddQuestionPaper,
  GetQuestionPaper,
  DeleteQuestionPaper,
  UpdateQuestionPaper,
  SubmitAnswersResponse,
};
