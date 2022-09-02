import nc from "next-connect";
import dbConnect from "../../config/dbConnect";

import { currentUser } from "../../controllers/auth";

import onError from "../../middlewares/errors";
import { isAuthenticatedUser } from "../../middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(currentUser);

export default handler;
