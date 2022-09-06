import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import onError from "../../../middlewares/errors";

import { createCourse } from "../../../controllers/instructor";
import { isAuthenticatedUser, isInstructor } from "../../../middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, isInstructor).post(createCourse);

export default handler;
