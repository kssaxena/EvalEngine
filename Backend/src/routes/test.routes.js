import express from "express";
import {
  AddQuestionPaper,
  CreateTest,
  DeleteQuestionPaper,
  DeleteTestById,
  GetMyTests,
  GetTestById,
  UpdateQuestionPaper,
  UpdateTestById,
} from "../controllers/test.controllers.js";
import { VerifyUser } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(VerifyUser);

// Test routes
router.route("/get-test/:testId").get(GetTestById);
router.route("/get-my-tests/:userId").get(GetMyTests);
router.route("/create-test").post(CreateTest);
router.route("/update-test/:testId").post(UpdateTestById);
router.route("/delete-test/testId").post(DeleteTestById);

//make a function of getSet(); for fetching single set at a time which student can attempt
router.route("/get-test-set/:testId").get(GetTestById);

// Question routes
router.route("/add-sets/:testId").post(AddQuestionPaper);
router.route("/update-sets/:testId/:setId").post(UpdateQuestionPaper);
router.route("/delete-sets/:testId/:setId").post(DeleteQuestionPaper);

export default router;
