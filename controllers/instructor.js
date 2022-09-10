import User from "../models/user";
import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { Course } from "../models/course";
import { Lesson } from "../models/course";
import absoluteURL from "next-absolute-url";
import cloudinary from "cloudinary";
import slugify from "slugify";
import { IncomingForm } from "formidable";

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

// instructor create the course
export const createCourse = catchAsyncErrors(async (req, res, next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "edemy/course-image",
    width: "150",
    crop: "scale",
  });

  const alreadyExistedCourse = await Course.findOne({
    slug: slugify(req.body.name.toLowerCase()),
  });

  if (alreadyExistedCourse) {
    return next(
      new ErrorHandler(
        `Course ${req.body.name} already exists choose another title`
      )
    );
  }

  const course = await Course.create({
    slug: slugify(req.body.name),
    instructor: req.user._id,
    image: "asdfasdfasdf",
    ...req.body,
  });

  res.status(201).json({
    success: true,
    course,
    result,
  });
});

// get instructor courses
export const instructorCourses = catchAsyncErrors(async (req, res) => {
  const courses = await Course.find({ instructor: req.user._id }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    courses,
  });
});

// get single course detials
export const singleCourseDetails = catchAsyncErrors(async (req, res, next) => {
  const course = await Course.findOne({ slug: req.query.slug }).populate(
    "instructor",
    "id name"
  );

  if (!course) {
    return next(new ErrorHandler(`No course found with this id`, 404));
  }

  res.status(200).json({
    success: true,
    course,
  });
});

// delete vedio from cloudinary
export const deleteVedio = catchAsyncErrors(async (req, res, next) => {
  if (req.user._id !== req.query.instructorId) {
    return next(new ErrorHandler("Only Instructor can delete the lesson", 403));
  }
  const result = await cloudinary.v2.uploader.destroy(req.body.public_id);
  res.status(200).json({
    success: true,
    result,
    message: "Vedio Deleted Successfully",
  });
});

// Add lesson to course collection
export const addLesson = catchAsyncErrors(async (req, res, next) => {
  const { slug, instructorId } = req.query;
  const { title, content, vedio } = req.body;
  console.log("Values from req.body", title, content, vedio);

  if (req.user._id !== instructorId) {
    return next(new ErrorHandler("Only Instructor can add the lesson", 403));
  }

  const lesson = await Lesson.create({
    title,
    content,
    vedio,
    slug: slugify(title),
  });
  const updated = await Course.findOneAndUpdate(
    { slug },
    {
      $push: { lessons: lesson },
    },
    { new: true, useFindAndModify: false, runValidation: true } // if we dont add this so in res.json() updated wont include fresh
  )
    .populate("instructor", "_id name")
    .exec();

  res.status(200).json({
    success: true,
    lesson,
    updated,
  });
});
