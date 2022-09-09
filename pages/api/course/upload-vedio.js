import cloudinary from "cloudinary";
import { IncomingForm } from "formidable";
// 👇 CHANGE THESE TO REFLECT YOUR CLOUDINARY SETTINGS 👇
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

export default async (req, res) => {
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
