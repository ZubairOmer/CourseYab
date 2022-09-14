import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import onError from "../../../middlewares/errors";

import { getAllPublishedCourses } from "../../../controllers/courses";
import { isAuthenticatedUser, isInstructor } from "../../../middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(getAllPublishedCourses);

export default handler;
