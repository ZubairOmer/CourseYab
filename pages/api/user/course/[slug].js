import nc from "next-connect";
import dbConnect from "../../../../config/dbConnect";

import { singleCourseDetails } from "../../../../controllers/instructor";

import onError from "../../../../middlewares/errors";
import { isAuthenticatedUser, isEnrolled } from "../../../../middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, isEnrolled).get(singleCourseDetails);

export default handler;
