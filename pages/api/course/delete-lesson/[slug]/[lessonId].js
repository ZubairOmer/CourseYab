import nc from "next-connect";
import dbConnect from "../../../../../config/dbConnect";

import onError from "../../../../../middlewares/errors";

import { deleteLesson } from "../../../../../controllers/instructor";
import { isAuthenticatedUser } from "../../../../../middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).put(deleteLesson);

export default handler;
