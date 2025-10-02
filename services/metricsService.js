let currentModelState = {
  version: "2.1",
  accuracy: 0.928,
  precision: 0.914,
  recall: 0.941,
  f1Score: 0.927,
  confusionMatrix: {
    truePositive: 342,
    trueNegative: 298,
    falsePositive: 28,
    falseNegative: 21,
  },
  lastUpdated: new Date().toISOString(),
  trainedOn: null,
};

function generateRandomMetrics(baseAccuracy = 0.9) {
  const accuracy = baseAccuracy + Math.random() * 0.08;
  const precision = accuracy - 0.02 + Math.random() * 0.04;
  const recall = accuracy - 0.01 + Math.random() * 0.03;

  const total = 689;
  const positives = Math.floor(total * 0.52);
  const negatives = total - positives;

  const tp = Math.floor(positives * recall);
  const fn = positives - tp;
  const tn = Math.floor(negatives * precision);
  const fp = negatives - tn;

  return {
    accuracy: parseFloat(accuracy.toFixed(3)),
    precision: parseFloat(precision.toFixed(3)),
    recall: parseFloat(recall.toFixed(3)),
    f1Score: parseFloat(
      ((2 * (precision * recall)) / (precision + recall)).toFixed(3)
    ),
    confusionMatrix: {
      truePositive: tp,
      trueNegative: tn,
      falsePositive: fp,
      falseNegative: fn,
    },
  };
}

function updateModelMetrics(newMetrics) {
  currentModelState = {
    ...currentModelState,
    ...newMetrics,
    lastUpdated: new Date().toISOString(),
  };
  return currentModelState;
}

async function getCurrentMetrics() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...currentModelState });
    }, 300);
  });
}

async function getFeatureImportance() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { feature: "Orbital Period", importance: 0.284 },
        { feature: "Planet Radius", importance: 0.231 },
        { feature: "Stellar Temperature", importance: 0.186 },
        { feature: "Transit Depth", importance: 0.152 },
        { feature: "Impact Parameter", importance: 0.147 },
      ]);
    }, 300);
  });
}

async function getHistoricalData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [];
      for (let i = 0; i < 100; i++) {
        const isExoplanet = Math.random() > 0.4;
        data.push({
          id: i,
          orbitalPeriod: Math.random() * 365,
          planetRadius: Math.random() * 20,
          stellarTemp: 3000 + Math.random() * 4000,
          transitDepth: Math.random() * 0.05,
          classification: isExoplanet ? "Confirmed" : "False Positive",
          confidence: parseFloat((0.7 + Math.random() * 0.3).toFixed(2)),
        });
      }
      resolve(data);
    }, 500);
  });
}

async function getConfusionMatrix() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        truePositive: 342,
        trueNegative: 298,
        falsePositive: 28,
        falseNegative: 21,
        total: 689,
      });
    }, 300);
  });
}

async function getModelHistory() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          version: "1.0",
          accuracy: 0.876,
          algorithm: "Random Forest",
          date: "2025-09-01",
          features: 5,
          trainingSamples: 500,
        },
        {
          version: "1.5",
          accuracy: 0.901,
          algorithm: "Random Forest",
          date: "2025-09-15",
          features: 7,
          trainingSamples: 650,
        },
        {
          version: "2.0",
          accuracy: 0.918,
          algorithm: "XGBoost",
          date: "2025-09-28",
          features: 8,
          trainingSamples: 689,
        },
        {
          version: "2.1",
          accuracy: 0.928,
          algorithm: "Random Forest",
          date: "2025-10-01",
          features: 8,
          trainingSamples: 689,
        },
      ]);
    }, 300);
  });
}

async function metricsHandler(req, res, next) {
  try {
    const data = await getCurrentMetrics();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function confusionMatrixHandler(req, res, next) {
  try {
    const data = await getConfusionMatrix();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function modelHistoryHandler(req, res, next) {
  try {
    const data = await getModelHistory();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function historyHandler(req, res, next) {
  try {
    const data = await getModelHistory();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function featureImportanceHandler(req, res, next) {
  try {
    const data = await getFeatureImportance();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

async function historicalDataHandler(req, res, next) {
  try {
    const data = await getHistoricalData();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCurrentMetrics,
  getFeatureImportance,
  getHistoricalData,
  getConfusionMatrix,
  getModelHistory,
  metricsHandler,
  confusionMatrixHandler,
  historyHandler,
  featureImportanceHandler,
  historicalDataHandler,
  updateModelMetrics,
  generateRandomMetrics,
};
