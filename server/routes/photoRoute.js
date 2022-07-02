import express from "express";

import {
  getAllPhotos,
  deletePhoto,
  getOneImage,
} from "../controllers/photoController.js";

const router = express.Router();
router.route("/").get(getAllPhotos);

router.route("/:filename").get(getOneImage).delete(deletePhoto);

export default router;
