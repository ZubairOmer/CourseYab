import catchAsyncErrors from "./catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";
import { getSession } from "next-auth/client";
import User from "../models/user";
import { Course } from "../models/course";

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }

  req.user = session.user;
  next();
});

// Handling user roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource.`,
          403
        )
      );
    }

    next();
  };
};

// isInstructor middlewares
export const isInstructor = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).exec();
    if (!user.role.includes("Instructor")) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource.`,
          403
        )
      );
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export const isEnrolled = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).exec();
    const course = await Course.findOne({ slug: req.query.slug }).exec();

    // check if course id is found in user courses array
    let ids = [];
    for (let i = 0; i < user.courses.length; i++) {
      ids.push(user.courses[i].toString());
    }

    if (!ids.includes(course._id.toString())) {
      res.sendStatus(403);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

export { isAuthenticatedUser, authorizeRoles };
