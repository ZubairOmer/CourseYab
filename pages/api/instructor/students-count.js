import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import { studentsCount } from "../../../controllers/instructor";

import onError from "../../../middlewares/errors";
import { isAuthenticatedUser } from "../../../middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).post(studentsCount);

export default handler;
