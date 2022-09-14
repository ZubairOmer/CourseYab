import ErrorHandler from "../utils/errorHandler";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import { Course } from "../models/course";
import { Lesson } from "../models/course";
import slugify from "slugify";

export const getAllPublishedCourses = catchAsyncErrors(
  async (req, res, next) => {
    const courses = await Course.find({ published: true }).populate(
      "instructor",
      "_id name"
    );

    res.json(courses);
  }
);
