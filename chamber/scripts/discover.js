const cardsContainer = document.getElementById("cards-container");
const visitMessage = document.getElementById("visit-message");

// Enhanced attractions loading
async function loadAttractions() {
  try {
    const response = await fetch("data/attractions.json");
    if (!response.ok) throw new Error("Network response was not ok");

    const attractions = await response.json();
    displayAttractions(attractions);
  } catch (error) {
    console.error("Error loading attractions:", error);
    cardsContainer.innerHTML = `
      <div class="error">
        <p>⚠️ Failed to load attractions. Please try again later.</p>
        <button onclick="loadAttractions()">Retry</button>
      </div>
    `;
  }
}

// Enhanced attraction display
function displayAttractions(attractions) {
  cardsContainer.innerHTML = "";

  attractions.forEach((attraction) => {
    const card = document.createElement("div");
    card.className = "attraction-card";
    card.innerHTML = `
      <h3>${attraction.name}</h3>
      <figure>
        <img src="${attraction.image}" alt="${attraction.name}" loading="lazy">
        <figcaption>${attraction.category}</figcaption>
      </figure>
      <p class="description">${attraction.description}</p>
      <div class="card-footer">
        <p class="location">📍 ${attraction.location}</p>
        <button aria-label="Learn more about ${attraction.name}">More Info</button>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}

// Enhanced visit message with formatting
function showVisitMessage() {
  const now = Date.now();
  const lastVisit = localStorage.getItem("lastVisit");
  const messageEl = document.createElement("div");
  messageEl.className = "visit-message";

  if (!lastVisit) {
    messageEl.innerHTML = `
      <p>🆕 <strong>First visit?</strong> Welcome!</p>
      <p>Explore what our city has to offer!</p>
    `;
  } else {
    const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      messageEl.innerHTML = `
        <p>🔄 <strong>Back so soon!</strong></p>
        <p>We're glad you're enjoying our city!</p>
      `;
    } else {
      messageEl.innerHTML = `
        <p>⏱️ <strong>Last visit:</strong> ${diffDays} day${
        diffDays !== 1 ? "s" : ""
      } ago</p>
        <p>Check out what's new since then!</p>
      `;
    }
  }

  visitMessage.innerHTML = "";
  visitMessage.appendChild(messageEl);
  localStorage.setItem("lastVisit", now.toString());
}

// Initialize with error handling
document.addEventListener("DOMContentLoaded", () => {
  try {
    loadAttractions();
    showVisitMessage();
  } catch (error) {
    console.error("Initialization error:", error);
  }
});
