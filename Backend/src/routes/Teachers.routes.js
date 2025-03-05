import express from "express";
import {
  TeacherRegister,
  TeacherLogin,
  refreshAccessToken,
} from "../controllers/Teacher.controllers.js";

const router = express.Router();

router.route("/register").post(TeacherRegister);
router.route("/login").post(TeacherLogin);

router.route("/teacher/re-login").post(refreshAccessToken);

export default router;
