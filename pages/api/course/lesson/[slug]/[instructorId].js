import nc from "next-connect";
import dbConnect from "../../../../../config/dbConnect";

import onError from "../../../../../middlewares/errors";

import { addLesson } from "../../../../../controllers/instructor";
import { isAuthenticatedUser } from "../../../../../middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).post(addLesson);

export default handler;
