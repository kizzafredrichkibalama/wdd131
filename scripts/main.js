// main.js — Scripts for form.html

// 1. Dynamically populate the Product Name <select> from the products array
(function populateProducts() {
  const select = document.getElementById("productName");
  if (!select) return;

  products.forEach(function (product) {
    const option = document.createElement("option");
    option.value = product.id;       // value = product id per assignment
    option.textContent = product.name; // display text = product name
    select.appendChild(option);
  });
})();

// 2. Display last modified date in footer
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
