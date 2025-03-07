import express from "express";
import {
  AddQuestionPaper,
  CheckIfAttemptedTheTest,
  CreateTest,
  DeleteQuestionPaper,
  DeleteTestById,
  GetMyTests,
  GetQuestionPaper,
  GetTestById,
  SubmitAnswersResponse,
  UpdateQuestionPaper,
  UpdateTestById,
} from "../controllers/test.controllers.js";
import {
  VerifyStudent,
  VerifyTeacher,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// Test routes
router.route("/get-test/:testId").get(GetTestById);
router.route("/get-my-tests/:userId").get(GetMyTests);
router.route("/create-test").post(VerifyTeacher, CreateTest);
router.route("/update-test/:testId").post(VerifyTeacher, UpdateTestById);
router.route("/delete-test/testId").post(VerifyTeacher, DeleteTestById);

//make a function of getSet(); for fetching single set at a time which student can attempt
router.route("/get-test-set/:testId").get(GetTestById);

// Question routes
router.route("/add-sets/:testId").post(VerifyTeacher, AddQuestionPaper);
router
  .route("/update-sets/:testId/:setId")
  .post(VerifyTeacher, UpdateQuestionPaper);
router
  .route("/delete-sets/:testId/:setId")
  .post(VerifyTeacher, DeleteQuestionPaper);
router.route("/get-question-paper/:testId").get(GetQuestionPaper);
router
  .route("/check-the-attempts/:testId/:studentId")
  .get(CheckIfAttemptedTheTest);

// Student responses routes
router
  .route("/submit-response/:studentId")
  .post(VerifyStudent, SubmitAnswersResponse);

export default router;
