// Explorer Page JavaScript - Separates UI from ML API logic

let historicalData = [];
let newDataPoint = null;

// Initialize page
document.addEventListener("DOMContentLoaded", async () => {
  await loadHistoricalData();
  setupFormHandlers();
  createScatterPlot();
});

// Load historical data for visualization
async function loadHistoricalData() {
  try {
    const response = await fetch("/api/data/historical");
    const result = await response.json();
    historicalData = result.data || result;
  } catch (error) {
    console.error("Failed to load historical data:", error);
    historicalData = generateMockData();
  }
}

// Setup form event handlers
function setupFormHandlers() {
  const form = document.getElementById("classificationForm");
  form.addEventListener("submit", handleClassification);
}

// Handle classification form submission
async function handleClassification(e) {
  e.preventDefault();

  const button = document.getElementById("classifyBtn");
  const buttonText = button.querySelector(".button-text");
  const buttonLoader = button.querySelector(".button-loader");

  // Show loading state
  button.disabled = true;
  buttonText.style.display = "none";
  buttonLoader.style.display = "inline-block";

  // Gather form data
  const features = {
    orbitalPeriod: parseFloat(document.getElementById("orbitalPeriod").value),
    planetRadius: parseFloat(document.getElementById("planetRadius").value),
    stellarTemp: parseFloat(document.getElementById("stellarTemp").value),
    transitDepth: parseFloat(document.getElementById("transitDepth").value),
    impactParam: parseFloat(document.getElementById("impactParam").value),
  };

  try {
    const response = await fetch("/api/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(features),
    });

    const result = await response.json();
    const data = result.data || result;

    newDataPoint = {
      ...features,
      classification: data.classification,
      confidence: parseFloat(data.confidence),
    };

    displayResults(data);

    // Update visualization
    updateScatterPlot();
  } catch (error) {
    console.error("Classification error:", error);
    alert("Failed to classify. Please try again.");
  } finally {
    // Reset button
    button.disabled = false;
    buttonText.style.display = "inline-block";
    buttonLoader.style.display = "none";
  }
}

// Display classification results
function displayResults(result) {
  const resultsSection = document.getElementById("resultsSection");
  const resultBadge = document.getElementById("resultBadge");
  const confidenceScore = document.getElementById("confidenceScore");

  // Show results section
  resultsSection.style.display = "flex";

  // Set badge
  const isConfirmed = result.classification === "Confirmed Exoplanet";
  resultBadge.className = `result-badge ${
    isConfirmed ? "confirmed" : "false-positive"
  }`;
  resultBadge.textContent = result.classification;

  // Animate confidence score
  animateCounter(confidenceScore, 0, parseFloat(result.confidence), 1000);

  // Set metadata
  document.getElementById("resultModelVersion").textContent =
    result.modelVersion;
  document.getElementById("resultTimestamp").textContent = new Date(
    result.timestamp
  ).toLocaleString();

  // Scroll to results
  resultsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Animate counter
function animateCounter(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      element.textContent = `${end.toFixed(2)}%`;
      clearInterval(timer);
    } else {
      element.textContent = `${current.toFixed(2)}%`;
    }
  }, 16);
}

// Create initial scatter plot
function createScatterPlot() {
  if (historicalData.length === 0) return;

  const confirmed = historicalData.filter(
    (d) => d.classification === "Confirmed"
  );
  const falsePositive = historicalData.filter(
    (d) => d.classification === "False Positive"
  );

  const trace1 = {
    x: confirmed.map((d) => d.orbitalPeriod),
    y: confirmed.map((d) => d.planetRadius),
    mode: "markers",
    type: "scatter",
    name: "Confirmed Exoplanet",
    marker: {
      color: "#4a9eff",
      size: 7,
      opacity: 0.7,
      line: {
        color: "#4a9eff",
        width: 1,
      },
    },
  };

  const trace2 = {
    x: falsePositive.map((d) => d.orbitalPeriod),
    y: falsePositive.map((d) => d.planetRadius),
    mode: "markers",
    type: "scatter",
    name: "False Positive",
    marker: {
      color: "#f093fb",
      size: 7,
      opacity: 0.7,
      line: {
        color: "#f093fb",
        width: 1,
      },
    },
  };

  const layout = {
    title: {
      text: "Exoplanet Classification Space",
      font: { color: "#4a9eff", size: 15 },
    },
    xaxis: {
      title: "Orbital Period (days)",
      gridcolor: "rgba(255, 255, 255, 0.08)",
      color: "rgba(255, 255, 255, 0.6)",
    },
    yaxis: {
      title: "Planet Radius (Earth radii)",
      gridcolor: "rgba(255, 255, 255, 0.08)",
      color: "rgba(255, 255, 255, 0.6)",
    },
    paper_bgcolor: "rgba(0, 0, 0, 0)",
    plot_bgcolor: "rgba(10, 14, 39, 0.3)",
    font: { color: "#ffffff", family: "Montserrat" },
    showlegend: true,
    legend: {
      x: 0.7,
      y: 1,
      bgcolor: "rgba(10, 14, 39, 0.6)",
      bordercolor: "rgba(74, 158, 255, 0.2)",
    },
  };

  Plotly.newPlot("scatterPlot", [trace1, trace2], layout, { responsive: true });
}

// Update scatter plot with new data point
function updateScatterPlot() {
  if (!newDataPoint) return;

  const trace = {
    x: [newDataPoint.orbitalPeriod],
    y: [newDataPoint.planetRadius],
    mode: "markers",
    type: "scatter",
    name: "Your Classification",
    marker: {
      color: "#ffffff",
      size: 14,
      symbol: "star",
      line: {
        color:
          newDataPoint.classification === "Confirmed Exoplanet"
            ? "#4a9eff"
            : "#f093fb",
        width: 3,
      },
    },
  };

  Plotly.addTraces("scatterPlot", trace);

  // Add ripple animation effect
  setTimeout(() => {
    Plotly.animate(
      "scatterPlot",
      {
        data: [{}, {}, { marker: { size: 12 } }],
        traces: [2],
      },
      {
        transition: { duration: 500 },
      }
    );
  }, 100);
}

// Reset form
function resetForm() {
  document.getElementById("classificationForm").reset();
  document.getElementById("resultsSection").style.display = "none";

  // Remove the new data point from plot
  if (newDataPoint) {
    Plotly.deleteTraces("scatterPlot", 2);
    newDataPoint = null;
  }
}

// Generate mock data if API fails
function generateMockData() {
  const data = [];
  for (let i = 0; i < 100; i++) {
    const isExoplanet = Math.random() > 0.4;
    data.push({
      orbitalPeriod: Math.random() * 365,
      planetRadius: Math.random() * 20,
      stellarTemp: 3000 + Math.random() * 4000,
      transitDepth: Math.random() * 0.05,
      classification: isExoplanet ? "Confirmed" : "False Positive",
      confidence: 0.7 + Math.random() * 0.3,
    });
  }
  return data;
}
