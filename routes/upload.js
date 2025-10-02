const express = require("express");
const router = express.Router();
const uploadService = require("../services/uploadService");

router.post(
  "/upload",
  uploadService.upload.single("datafile"),
  uploadService.uploadHandler
);
router.get("/files", uploadService.listFilesHandler);

module.exports = router;
