// review.js — Scripts for review.html

// 1. Increment and display the review counter using localStorage
(function updateCounter() {
  let count = parseInt(localStorage.getItem("reviewCount") || "0", 10);
  count += 1;
  localStorage.setItem("reviewCount", count);

  const countEl = document.getElementById("reviewCount");
  if (countEl) {
    countEl.textContent = count;
    // Animate the counter number
    countEl.style.animation = "none";
    requestAnimationFrame(() => {
      countEl.style.animation = "popIn 0.4s cubic-bezier(.34,1.56,.64,1) both";
    });
  }
})();

// 2. Parse URL params and display a review summary
(function displaySummary() {
  const summaryBox = document.getElementById("reviewSummary");
  if (!summaryBox) return;

  const params = new URLSearchParams(window.location.search);

  // Build star string
  const ratingVal = parseInt(params.get("rating") || "0", 10);
  const stars = ratingVal > 0
    ? "★".repeat(ratingVal) + "☆".repeat(5 - ratingVal) + ` (${ratingVal}/5)`
    : "Not rated";

  // Features (can be multi-value)
  const featureList = params.getAll("features");
  const featuresDisplay = featureList.length > 0 ? featureList.join(", ") : "None selected";

  // Truncate review text
  const reviewText = params.get("writtenReview") || "";
  const previewText = reviewText.length > 120
    ? reviewText.substring(0, 120) + "…"
    : reviewText || "(No written review provided)";

  const rows = [
    { label: "Product",      value: params.get("productName") || "—" },
    { label: "Rating",       value: stars },
    { label: "Install Date", value: params.get("installDate") || "—" },
    { label: "Features",     value: featuresDisplay },
    { label: "Review",       value: previewText },
    { label: "Reviewer",     value: params.get("userName") || "Anonymous" },
  ];

  const html = `<h3>Your Submission</h3>` +
    rows.map(r =>
      `<div class="summary-row">
        <span class="s-label">${r.label}</span>
        <span class="s-value">${escapeHtml(r.value)}</span>
      </div>`
    ).join("");

  summaryBox.innerHTML = html;
})();

// 3. Escape HTML helper (prevent XSS from URL params)
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// 4. Last modified footer
(function setLastModified() {
  const el = document.getElementById("lastModified");
  if (el) {
    const d = new Date(document.lastModified);
    el.textContent = "Last Modification: " + d.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
})();
