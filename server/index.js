const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const { uploadFile, getFileStream } = require("./s3");
const app = express();
const port = 5000;

app.use(cors());

// app.use(express.static("uploads"));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "./uploads"));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0]
    );
  },
});

const multi_upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error("Only .jpg .jpeg .png images are supported!");
      err.name = "ExtensionError";
      return cb(err);
    }
  },
}).array("uploadImages", 10);

app.get("/api/upload/:key", async (req, res) => {
  console.log(req.params);
  // const key = req.params.key;
  // const readStream = getFileStream(key);

  // readStream.pipe(res);
});

app.post("/api/upload", async (req, res) => {
  multi_upload(req, res, async function (err) {
    console.log(req.files);
    req.files.forEach(async (file) => {
      await uploadFile(file);
    });

    //multer error
    if (err instanceof multer.MulterError) {
      console.log(err);
      res
        .status(500)
        .send({
          error: { msg: `multer uploading error: ${err.message}` },
        })
        .end();
      return;
    } else if (err) {
      //unknown error
      if (err.name == "ExtensionError") {
        res
          .status(413)
          .send({ error: { msg: `${err.message}` } })
          .end();
      } else {
        res
          .status(500)
          .send({ error: { msg: `unknown uploading error: ${err.message}` } })
          .end();
      }
      return;
    }
    res.status(200).send("file uploaded");
  });
});

app.listen(port, () =>
  console.log(`server is listening on url http://localhost:${port}`)
);
