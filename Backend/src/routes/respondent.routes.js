import express from "express";
import {
  RespondentRegister,
  RespondentLogin,
  refreshAccessToken,
} from "../controllers/respondent.controllers.js";

const router = express.Router();

router.route("/register").post(RespondentRegister);
router.route("/login").post(RespondentLogin);

router.route("/student/re-login").post(refreshAccessToken);

export default router;
