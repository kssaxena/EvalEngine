import express from "express";
import {
  AddQuestionPaper,
  CreateTest,
  DeleteQuestionPaper,
  DeleteTestById,
  UpdateTestById,
} from "../controllers/test.controllers.js";
import { VerifyUser } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.use(VerifyUser);

// Test routes
router.route("/create-test").post(CreateTest);
router.route("/update-test/:testId").post(UpdateTestById);
router.route("/delete-test/testId").post(DeleteTestById);

// Question routes
router.route("/add-sets/:testId").post(AddQuestionPaper);
router.route("/update-sets").post();
router.route("/delete-sets/:testId/:setIndex").post(DeleteQuestionPaper);

export default router;
