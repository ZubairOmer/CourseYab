import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import onError from "../../../middlewares/errors";

import { singleCourseDetails } from "../../../controllers/instructor";
import { isAuthenticatedUser } from "../../../middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.get(singleCourseDetails);

export default handler;
