const express = require("express");
const router = express.Router();
const apiRoutes = require("./api");
const uploadRoutes = require("./upload");

router.use("/api", apiRoutes);
router.use("/api", uploadRoutes);

module.exports = router;
