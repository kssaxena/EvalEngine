import express from "express";
import {
  userQuestionerRegister,
  userQuestionerLogin,
} from "../controllers/questioner.controllers.js";

const router = express.Router();

router.route("/register").post(userQuestionerRegister);
router.route("/login").post(userQuestionerLogin);

export default router;
