import express from "express";
import cors from "cors";
import fs from "fs";
import dotenv from "dotenv";
import aws from "aws-sdk";
import util from "util";
const unlinkFile = util.promisify(fs.unlink);
import multer from "multer";
import { uploadFile, getFileStream } from "./s3.js";
dotenv.config();

const s3 = new aws.S3();

aws.config.setPromisesDependency();
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "us-east-1",
});

const upload = multer({ dest: "uploads/" });

const app = express();
app.use(express.json());
const port = 5000;

app.use(cors());

app.get("/images/:key", (req, res) => {
  const key = req.params.key;
  const readStream = getFileStream(key);

  readStream.pipe(res);
});

app.post("/images", upload.single("image"), async (req, res) => {
  const file = req.file;
  console.log(req.body);
  console.log(req.file);

  const result = await uploadFile(file);
  await unlinkFile(file.path);

  res.send({ imagePath: `/images/${result.Key}` });
});

app.delete("/images/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;
    await s3.deleteObject({ Bucket: "im-homework", Key: filename }).promise();
    res.status(200).json({ msg: "File Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () =>
  console.log(`server is listening on url http://localhost:${port}`)
);
