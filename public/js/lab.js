// Lab Page JavaScript - Advanced ML Control & Data Management

let currentMetrics = {};
let featureImportance = [];

// Initialize page
document.addEventListener("DOMContentLoaded", async () => {
  await loadMetrics();
  await loadFeatureImportance();
  setupEventHandlers();
  createFeatureChart();
});

// Load current model metrics
async function loadMetrics() {
  try {
    const response = await fetch("/api/metrics");
    const result = await response.json();
    currentMetrics = result.data || result;
    updateMetricsDisplay();
  } catch (error) {
    console.error("Failed to load metrics:", error);
  }
}

// Load feature importance data
async function loadFeatureImportance() {
  try {
    const response = await fetch("/api/features/importance");
    const result = await response.json();
    featureImportance = result.data || result;
  } catch (error) {
    console.error("Failed to load feature importance:", error);
  }
}

// Update metrics display
function updateMetricsDisplay() {
  // Update gauge
  const f1Score = currentMetrics.f1Score || 0.927;
  updateGauge(f1Score);

  // Update metric cards
  document.getElementById("metricAccuracy").textContent = `${(
    currentMetrics.accuracy * 100
  ).toFixed(1)}%`;
  document.getElementById("metricPrecision").textContent = `${(
    currentMetrics.precision * 100
  ).toFixed(1)}%`;
  document.getElementById("metricRecall").textContent = `${(
    currentMetrics.recall * 100
  ).toFixed(1)}%`;

  // Update confusion matrix
  const cm = currentMetrics.confusionMatrix || {};
  document.getElementById("matrixTP").textContent = cm.truePositive || 342;
  document.getElementById("matrixFP").textContent = cm.falsePositive || 28;
  document.getElementById("matrixFN").textContent = cm.falseNegative || 21;
  document.getElementById("matrixTN").textContent = cm.trueNegative || 298;
}

// Update accuracy gauge animation
function updateGauge(value) {
  const circle = document.getElementById("accuracyCircle");
  const text = document.getElementById("gaugeValue");
  const circumference = 2 * Math.PI * 80;
  const offset = circumference - value * circumference;

  // Animate the circle
  circle.style.transition = "stroke-dashoffset 2s ease-out";
  circle.style.strokeDashoffset = offset;

  // Animate the text
  animateCounter(text, 0, value * 100, 2000, "%");
}

// Animate counter with custom suffix
function animateCounter(element, start, end, duration, suffix = "") {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      element.textContent = `${end.toFixed(1)}${suffix}`;
      clearInterval(timer);
    } else {
      element.textContent = `${current.toFixed(1)}${suffix}`;
    }
  }, 16);
}

// Create feature importance chart
function createFeatureChart() {
  if (featureImportance.length === 0) {
    featureImportance = [
      { feature: "Orbital Period", importance: 0.284 },
      { feature: "Planet Radius", importance: 0.231 },
      { feature: "Stellar Temperature", importance: 0.186 },
      { feature: "Transit Depth", importance: 0.152 },
      { feature: "Impact Parameter", importance: 0.147 },
    ];
  }

  const trace = {
    x: featureImportance.map((f) => f.importance),
    y: featureImportance.map((f) => f.feature),
    type: "bar",
    orientation: "h",
    marker: {
      color: "#4a9eff",
      line: {
        color: "#4a9eff",
        width: 1,
      },
    },
  };

  const layout = {
    title: {
      text: "Top 5 Features",
      font: { color: "#4a9eff", size: 14 },
    },
    xaxis: {
      title: "Importance Score",
      gridcolor: "rgba(255, 255, 255, 0.08)",
      color: "rgba(255, 255, 255, 0.6)",
    },
    yaxis: {
      gridcolor: "rgba(255, 255, 255, 0.08)",
      color: "rgba(255, 255, 255, 0.6)",
    },
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(10, 14, 39, 0.3)",
    font: { color: "#ffffff", family: "Montserrat" },
    margin: { l: 150, r: 20, t: 40, b: 60 },
  };

  Plotly.newPlot("featureChart", [trace], layout, { responsive: true });
}

// Setup event handlers
function setupEventHandlers() {
  // File upload
  const uploadZone = document.getElementById("uploadZone");
  const fileInput = document.getElementById("fileInput");

  uploadZone.addEventListener("click", () => fileInput.click());

  uploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadZone.style.background = "rgba(0, 255, 255, 0.1)";
  });

  uploadZone.addEventListener("dragleave", () => {
    uploadZone.style.background = "";
  });

  uploadZone.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadZone.style.background = "";
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  });

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) handleFileUpload(file);
  });

  // Train button
  document
    .getElementById("trainButton")
    .addEventListener("click", handleTraining);

  // Hyperparameter sliders
  setupSliderHandlers();

  // Validate button
  document
    .getElementById("validateButton")
    .addEventListener("click", handleValidation);

  // Deploy button
  document
    .getElementById("deployButton")
    .addEventListener("click", handleDeployment);

  // Algorithm selector
  document
    .getElementById("algorithmSelect")
    .addEventListener("change", updateHyperparameters);
}

// Handle file upload
async function handleFileUpload(file) {
  if (!file.name.endsWith(".csv")) {
    alert("Please upload a CSV file");
    return;
  }

  const formData = new FormData();
  formData.append("datafile", file);

  const progressContainer = document.getElementById("progressContainer");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");

  progressContainer.style.display = "block";

  try {
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress <= 90) {
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;
      }
    }, 100);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    clearInterval(interval);
    const result = await response.json();
    const data = result.data || result;

    progressBar.style.width = "100%";
    progressText.textContent = "100%";

    setTimeout(() => {
      if (data.evaluation) {
        const evaluation = data.evaluation;
        showNotification(
          `Data uploaded! ${evaluation.rowCount} rows, ${evaluation.columnCount} columns. ` +
            `Quality: ${evaluation.quality}%. ${
              evaluation.readyForTraining
                ? "Ready for training!"
                : "Check recommendations."
            }`
        );

        console.log("Dataset Evaluation:", evaluation);
        console.log("Preview:", evaluation.preview);
        console.log("Recommendations:", evaluation.recommendations);
      } else {
        showNotification("Data uploaded successfully!");
      }
      progressContainer.style.display = "none";
      progressBar.style.width = "0%";
    }, 500);
  } catch (error) {
    console.error("Upload error:", error);
    alert("Upload failed. Please try again.");
    progressContainer.style.display = "none";
  }
}

// Handle model training
async function handleTraining() {
  const features = getSelectedFeatures();
  const hyperparameters = getCurrentHyperparameters();

  if (features.length === 0) {
    alert("Please select at least one feature");
    return;
  }

  showNotification("Training in progress...", true);

  try {
    const response = await fetch("/api/train", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dataPath: "current",
        hyperparameters: hyperparameters,
        features: features,
      }),
    });

    const result = await response.json();
    const data = result.data || result;

    setTimeout(() => {
      showNotification(
        `Model v${data.modelVersion} trained! Accuracy: ${(
          data.accuracy * 100
        ).toFixed(1)}%`
      );
      document.getElementById("nextVersion").textContent = (
        parseFloat(data.modelVersion) + 0.1
      ).toFixed(1);
    }, 3000);
  } catch (error) {
    console.error("Training error:", error);
    showNotification("Training failed. Please try again.");
  }
}

// Handle quick validation
async function handleValidation() {
  const hyperparameters = getCurrentHyperparameters();
  const button = document.getElementById("validateButton");

  button.disabled = true;
  button.textContent = "VALIDATING...";

  try {
    const response = await fetch("/api/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hyperparameters }),
    });

    const result = await response.json();
    const data = result.data || result;

    const scoreSection = document.getElementById("validationScore");
    const scoreValue = document.getElementById("scoreValue");
    const scoreImprovement = document.getElementById("scoreImprovement");

    scoreSection.style.display = "block";
    animateCounter(
      scoreValue,
      0,
      parseFloat(data.validationScore) * 100,
      1000,
      "%"
    );
    scoreImprovement.textContent = `Estimated Improvement: ${data.estimatedImprovement}`;
  } catch (error) {
    console.error("Validation error:", error);
    alert("Validation failed");
  } finally {
    button.disabled = false;
    button.textContent = "QUICK VALIDATE";
  }
}

// Handle model deployment
async function handleDeployment() {
  if (!confirm("Deploy new model to production?")) return;

  const hyperparameters = getCurrentHyperparameters();
  const nextVersion = document.getElementById("nextVersion").textContent;

  showNotification("Deploying model...", true);

  try {
    const response = await fetch("/api/deploy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        modelVersion: nextVersion,
        hyperparameters: hyperparameters,
      }),
    });

    const result = await response.json();
    const data = result.data || result;

    setTimeout(() => {
      showNotification(`Model v${data.deployedVersion} deployed successfully!`);
      loadMetrics();
    }, 2000);
  } catch (error) {
    console.error("Deployment error:", error);
    showNotification("Deployment failed");
  }
}

// Setup slider event handlers
function setupSliderHandlers() {
  const sliders = ["nTrees", "maxDepth", "minSamples", "learningRate"];

  sliders.forEach((id) => {
    const slider = document.getElementById(id);
    const valueDisplay = document.getElementById(`${id}Value`);

    slider.addEventListener("input", (e) => {
      valueDisplay.textContent = e.target.value;
    });
  });
}

// Update hyperparameters based on algorithm
function updateHyperparameters() {
  // This would change the available hyperparameters based on selected algorithm
  // For now, we keep the same parameters
}

// Get selected features
function getSelectedFeatures() {
  const checkboxes = document.querySelectorAll(
    '.feature-item input[type="checkbox"]:checked'
  );
  return Array.from(checkboxes).map((cb) => cb.dataset.feature);
}

// Get current hyperparameter values
function getCurrentHyperparameters() {
  return {
    algorithm: document.getElementById("algorithmSelect").value,
    nTrees: parseInt(document.getElementById("nTrees").value),
    maxDepth: parseInt(document.getElementById("maxDepth").value),
    minSamples: parseInt(document.getElementById("minSamples").value),
    learningRate: parseFloat(document.getElementById("learningRate").value),
  };
}

// Show notification
function showNotification(message, persistent = false) {
  const notification = document.getElementById("notification");
  const text = document.getElementById("notificationText");
  const icon = notification.querySelector(".notification-icon");

  text.textContent = message;
  notification.style.display = "block";

  if (persistent) {
    icon.style.display = "inline-block";
  } else {
    icon.style.display = "none";
    setTimeout(() => {
      notification.style.display = "none";
    }, 3000);
  }
}
