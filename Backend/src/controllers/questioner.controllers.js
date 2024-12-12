import ApiError from "../utils/ApiError.js";
import { UserQuestioner } from "../models/questioner.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

const userQuestionerRegister = asyncHandler(async (req, res) => {
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
  const existingUser = await UserQuestioner.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const newUser = await UserQuestioner.create({
    name,
    email,
    collegeName,
    password,
  });

  const checkUser = await UserQuestioner.findById(newUser._id).select(
    "-password"
  );
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
    const user = await UserQuestioner.findById(userId);
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

const userQuestionerLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!(email || !password)) {
    throw new ApiError(400, "Please provide email and password");
  }

  const user = await UserQuestioner.findOne({ email });

  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) throw new ApiError(401, "Invalid user password");

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user?._id
  );

  const loggedInUser = await UserQuestioner.findById(user._id).select(
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

    const user = await UserQuestioner.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Refresh token");
  }
});

export {
  userQuestionerRegister,
  userQuestionerLogin,
  refreshAccessToken,
  generateAccessAndRefreshTokens,
};
