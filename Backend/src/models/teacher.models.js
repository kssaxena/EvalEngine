import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Jwt from "jsonwebtoken";

const teacherSchema = new mongoose.Schema(
  {
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
    collegeName: {
      type: String,
      required: true,
    },
    question_preference: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    allTests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
    ],
  },
  {
    timestamps: true,
  }
);

//hashing password

teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//function to compare password

teacherSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//function to generate access token

teacherSchema.methods.generateAccessToken = function () {
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
teacherSchema.methods.generateRefreshToken = function () {
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

export const Teacher = mongoose.model("Teacher", teacherSchema);
