import nc from "next-connect";
import dbConnect from "../../../../config/dbConnect";

import onError from "../../../../middlewares/errors";

import { updateCourse } from "../../../../controllers/instructor";
import { isAuthenticatedUser } from "../../../../middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(updateCourse);

export default handler;
