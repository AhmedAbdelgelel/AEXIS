const express = require("express");
const router = express.Router();
const mlService = require("../services/mlService");
const metricsService = require("../services/metricsService");

router.post("/classify", mlService.classifyHandler);
router.post("/classify/batch", mlService.classifyBatchHandler);
router.post("/train", mlService.trainHandler);
router.post("/validate", mlService.validateHandler);
router.post("/deploy", mlService.deployHandler);
router.get("/metrics", metricsService.metricsHandler);
router.get("/metrics/confusion-matrix", metricsService.confusionMatrixHandler);
router.get("/metrics/history", metricsService.historyHandler);
router.get("/features/importance", metricsService.featureImportanceHandler);
router.get("/data/historical", metricsService.historicalDataHandler);

module.exports = router;
