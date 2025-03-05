import ApiError from "../utils/ApiError.js";
import { Teacher } from "../models/teacher.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const TeacherRegister = asyncHandler(async (req, res) => {
  const { name, email, password, collegeName } = req.body;

  if (
    [name, email, collegeName, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are Required");
  }

  if (!email.includes("@")) {
    throw new ApiError(400, "Please enter a valid email");
  }

  // Check if user already exists
  const existingUser = await Teacher.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const newUser = await Teacher.create({
    name,
    email,
    collegeName,
    password,
  });

  const checkUser = await Teacher.findById(newUser._id).select("-password");
  if (!checkUser) {
    throw new ApiError(500, "Failed to create user");
  }

  // Respond with success
  return res
    .status(200)
    .json(new ApiResponse(200, checkUser, "You are Registered."));
});

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await Teacher.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const TeacherLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email || !password)) {
    throw new ApiError(400, "Please provide email and password");
  }

  const user = await Teacher.findOne({ email });

  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid user password");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user?._id
  );

  const loggedInUser = await Teacher.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await Teacher.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Refresh token");
    }


    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          { user, accessToken, refreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Refresh token");
  }
});

export {
  TeacherRegister,
  TeacherLogin,
  refreshAccessToken,
  generateAccessAndRefreshTokens,
};
