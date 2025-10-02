// Home Page JavaScript

// Fetch and display current model metrics
async function fetchModelMetrics() {
  try {
    const response = await fetch("/api/metrics");
    const result = await response.json();
    const data = result.data || result;

    document.getElementById("modelVersion").textContent = `v${data.version}`;
    document.getElementById("modelAccuracy").textContent = `${(
      data.accuracy * 100
    ).toFixed(1)}%`;

    animateValue("modelAccuracy", 0, data.accuracy * 100, 1500);
  } catch (error) {
    console.error("Failed to fetch metrics:", error);
  }
}

// Animate number counting up
function animateValue(id, start, end, duration) {
  const element = document.getElementById(id);
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      element.textContent = `${end.toFixed(1)}%`;
      clearInterval(timer);
    } else {
      element.textContent = `${current.toFixed(1)}%`;
    }
  }, 16);
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  fetchModelMetrics();

  // Add ripple effect to CTA cards
  const cards = document.querySelectorAll(".cta-card");
  cards.forEach((card) => {
    card.addEventListener("click", function (e) {
      const ripple = document.createElement("div");
      ripple.className = "ripple";
      ripple.style.left = e.clientX - this.offsetLeft + "px";
      ripple.style.top = e.clientY - this.offsetTop + "px";
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });
});
