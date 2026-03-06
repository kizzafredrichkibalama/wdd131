// Get the current year
const year = new Date().getFullYear();

// Insert the year into the span with id="currentyear"
document.getElementById("currentyear").textContent = year;


// Get the last modified date of the document
const lastModified = document.lastModified;

// Insert the last modified date into the paragraph
document.getElementById("lastModified").textContent = "Last Modified: " + lastModified;