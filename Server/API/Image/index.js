// Library
import express from "express";
//import AWS from "aws-sdk";
import multer from "multer";

//Database Models
import { ImageModel } from "../../Database/allModels.js";

const Router = express.Router();

//multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });

//utility function
import { s3Upload } from "../../utils/s3.js";

/**
 * Router       /
 * Desc         upload given image to s3 bucket and save file link to mongodb
 * Params       none
 * Access       Public
 * Method       POST
 */

Router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    //s3 bucket options
    const bucketOptions = {
      Bucket: "workforcenew",
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      // ACL: "public-read", //access control list
    };

    const uploadImage = await s3Upload(bucketOptions);

    const saveImageToDatabase = await ImageModel.create({
      images: [{ location: uploadImage.Location }],
    });

    return res.status(200).json(saveImageToDatabase);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const image = await ImageModel.findById(_id);

    return res.status(200).json(image);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
