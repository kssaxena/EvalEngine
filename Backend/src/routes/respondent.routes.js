import express from "express";
import {
  RespondentRegister,
  RespondentLogin,
  refreshAccessToken,
  getAllTests,
} from "../controllers/respondent.controllers.js";
import { VerifyStudent } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register").post(RespondentRegister);
router.route("/login").post(RespondentLogin);

router.route("/student/re-login").post(refreshAccessToken);

router.route("/get-all-test-details/:studentId").get(getAllTests);

export default router;
