import express from "express";
import {
  userQuestionerRegister,
  userQuestionerLogin,
} from "../controllers/questioner.controllers.js";

const router = express.Router();

router.route("/register").post(userQuestionerRegister);
router.route("/login").get(userQuestionerLogin);

export default router;
