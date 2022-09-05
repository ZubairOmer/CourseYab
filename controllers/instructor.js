import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import absoluteURL from "next-absolute-url";
import cloudinary from "cloudinary";

// Setting up cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// make user instructor
export const makeInstructor = catchAsyncErrors(async (req, res) => {
  let user = await User.findById(req.user._id);

  user.role = ["Instructor", "Subscriber"];
  await user.save();

  res.status(200).json({
    success: true,
    message: "User role execeded to Instructor",
  });
});

// get the current logged in instructor
export const currentInstructor = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user.role.includes("Instructor")) {
    return next(new ErrorHandler("This user is not an instructor sire"));
  } else {
    res.status(200).json({
      success: true,
    });
  }
});

// instructor uload the course image
export const courseUploadImage = catchAsyncErrors(async (req, res) => {
  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "edemy/course-image",
    width: "150",
    crop: "scale",
  });

  res.status(200).json({
    success: true,
    message: "Account Registered successfully",
    result,
  });
});
