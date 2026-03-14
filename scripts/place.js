// =============================================
// Uganda Country Page — place.js
// =============================================

// Footer: Current Year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Footer: Last Modified Date
document.getElementById('last-modified').textContent = document.lastModified;

// =============================================
// Wind Chill Calculation (Metric: °C, km/h)
// Formula: 13.12 + 0.6215T - 11.37(V^0.16) + 0.3965T(V^0.16)
// Conditions: Temp <= 10°C AND Wind > 4.8 km/h
// =============================================

const temperature = 28;   // °C — static value matching page content
const windSpeed   = 10;   // km/h — static value matching page content

function calculateWindChill(temp, speed) {
  return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
}

const windChillElement = document.getElementById('wind-chill');

if (temperature <= 10 && windSpeed > 4.8) {
  const chill = calculateWindChill(temperature, windSpeed);
  windChillElement.textContent = `${chill.toFixed(1)} °C`;
} else {
  windChillElement.textContent = 'N/A';
}
