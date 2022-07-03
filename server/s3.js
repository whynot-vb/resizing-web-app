import aws from "aws-sdk";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const s3 = new aws.S3();

aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

export const uploadFile = (file) => {
  try {
    const fileStream = fs.createReadStream(file.path);

    const uploadParams = {
      Bucket: "im-homework",
      Body: fileStream,
      Key: file.filename,
    };

    return s3.upload(uploadParams).promise();
  } catch (error) {
    console.log(error);
  }
};

export const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: "im-homework",
  };

  return s3.getObject(downloadParams).createReadStream();
};
