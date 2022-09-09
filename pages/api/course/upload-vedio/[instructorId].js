import cloudinary from "cloudinary";
import { IncomingForm } from "formidable";
import nc from "next-connect";
import dbConnect from "../../../../config/dbConnect";

import onError from "../../../../middlewares/errors";

import { deleteVedio } from "../../../../controllers/instructor";
import { isAuthenticatedUser } from "../../../../middlewares/auth";
// 👇 CHANGE THESE TO REFLECT YOUR CLOUDINARY SETTINGS 👇

const handler = nc({ onError });
dbConnect();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadVedio = async (req, res) => {
  if (req.user._id !== req.query.instructorId) {
    return res.status(403).json({
      success: false,
      message: "Only course creator can add more lessons ",
    });
  }

  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const file = data?.files?.inputFile.path;

  try {
    const response = await cloudinary.v2.uploader.upload(file, {
      folder: "edemy/lesson-vedio",
      resource_type: "video",
      public_id: file.asset_id,
    });
    return res.json(response);
  } catch (error) {
    console.log("Error", error);
    return res.json(error);
  }
};

handler.use(isAuthenticatedUser).post(uploadVedio);

export default handler;
