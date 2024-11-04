import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

const userQuestionerSchema = new mongoose.schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  college_name: {
    type: String,
    required: true,
    trim: true,
  },
  question_preference: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

//hashing password

userQuestionerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//function to compare password

userQuestionerSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//function to generate access token

userQuestionerSchema.methods.generateAccessToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//method to generate refresh token for user
userQuestionerSchema.methods.generateRefreshToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const UserQuestioner = mongoose.model(
  "UserQuestioner",
  userQuestionerSchema
);
