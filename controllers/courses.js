import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { Course } from "../models/course";
import { Lesson } from "../models/course";
import User from "../models/user";
import slugify from "slugify";

// get All published course in home page
export const getAllPublishedCourses = catchAsyncErrors(
  async (req, res, next) => {
    const courses = await Course.find({ published: true }).populate(
      "instructor",
      "_id name"
    );

    res.json(courses);
  }
);

// check checkEnrollment
export const checkEnrollment = catchAsyncErrors(async (req, res, next) => {
  const { courseId } = req.query;
  // find courses of the currently logged in user
  const user = await User.findById(req.user._id).exec();
  // check if course id is found in user courses array
  let ids = [];
  const length = user.courses && user.courses.length;
  for (let i = 0; i < length; i++) {
    ids.push(user.courses[i].toString());
  }

  res.json({
    status: ids.includes(courseId),
    course: await Course.findById(courseId).exec(),
  });
});

// free Enrollment
export const freeEnrollment = catchAsyncErrors(async (req, res) => {
  console.log("blahblahblah", req.query.courseId);
  const course = await Course.findById(req.query.courseId).exec();
  if (course.paid) return;

  const result = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { courses: course._id },
    },
    { new: true }
  ).exec();
  res.json({
    message: "Congratulations! You have successfully enrolled",
    course,
  });
});

// get user courses
export const getUserCourses = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);
  const courses = await Course.find({ _id: { $in: user.courses } }).populate(
    "instructor",
    "_id name"
  );

  res.json(courses);
});
