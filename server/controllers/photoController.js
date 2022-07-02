import dotenv from "dotenv";
import aws from "aws-sdk";
import path from "path";
import multer from "multer";
// import { multi_upload } from "../index.js";

dotenv.config();

const s3 = new aws.S3();

aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

export const getAllPhotos = async (req, res) => {
  try {
    const response = await s3
      .listObjectsV2({
        Bucket: "im-homework",
      })
      .promise();
    const r = response.Contents.map((file) => file.Key);

    res.status(200).json(r);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getOneImage = async (req, res) => {
  try {
    const filename = req.params.filename;
    const response = await s3
      .listObjectsV2({
        Bucket: "im-homework",
      })
      .promise();
    const r = response.Contents.find((file) => file.Key === filename);
    res.status(200).json(r.Key);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePhoto = async (req, res) => {
  try {
    const filename = req.params.filename;
    await s3.deleteObject({ Bucket: "im-homework", Key: filename }).promise();
    res.status(200).json({ msg: "File Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const uploadImages = async (req, res) => {};
