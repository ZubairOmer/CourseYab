import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import onError from "../../../middlewares/errors";

import { vedioUpload } from "../../../controllers/instructor";
import { isAuthenticatedUser } from "../../../middlewares/auth";
export const config = { api: { bodyParser: { sizeLimit: "25mb" } } };
const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).post(vedioUpload);

export default handler;
