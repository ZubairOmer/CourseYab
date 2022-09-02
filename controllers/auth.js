import User from "../models/user";
import cloudinary from "cloudinary";

import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";

// Register user   =>   /api/auth/register
export const registerUser = catchAsyncErrors(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "bookit/rooms/1_bzynlv",
      url: "https://res.cloudinary.com/bookit/image/upload/v1618590762/bookit/rooms/1_bzynlv.jpg",
    },
  });

  res.status(200).json({
    success: true,
    message: "Account Registered successfully",
  });
});
