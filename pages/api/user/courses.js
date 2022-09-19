import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import { getUserCourses } from "../../../controllers/courses";

import onError from "../../../middlewares/errors";
import { isAuthenticatedUser } from "../../../middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(getUserCourses);

export default handler;
