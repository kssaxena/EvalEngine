import express from "express";
import {
  userRespondentRegister,
  userRespondentLogin,
} from "../controllers/respondent.controllers.js";

const router = express.Router();

router.route("/register").post(userRespondentRegister);
router.route("/login").get(userRespondentLogin);

export default router;
