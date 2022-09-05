import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import absoluteURL from "next-absolute-url";

export const makeInstructor = catchAsyncErrors(async (req, res) => {
  let user = await User.findById(req.user._id);

  user.role = ["Instructor", "Subscriber"];
  await user.save();

  res.status(200).json({
    success: true,
    message: "User role execeded to Instructor",
  });
});

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
