const directory = document.getElementById("directory");
const gridView = document.getElementById("gridView");
const listView = document.getElementById("listView");

// Enhanced directory loading with error handling
async function loadDirectory() {
  try {
    directory.innerHTML = '<div class="loading">Loading businesses...</div>';
    const res = await fetch("data/members.json");

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    displayBusinesses(data.companies);
  } catch (err) {
    console.error("Failed to load business listings:", err);
    directory.innerHTML = `
      <div class="error">
        <p>⚠️ Failed to load business listings.</p>
        <button onclick="loadDirectory()">Try Again</button>
      </div>
    `;
  }
}

// Enhanced business display with accessibility
function displayBusinesses(businesses) {
  directory.innerHTML = "";

  if (!businesses || businesses.length === 0) {
    directory.innerHTML = '<p class="no-results">No businesses found.</p>';
    return;
  }

  businesses.forEach((biz) => {
    const card = document.createElement("article");
    card.className = "member-card";
    card.tabIndex = "0";
    card.innerHTML = `
      <img src="${biz.logo}" alt="${biz.name} logo" loading="lazy">
      <div class="card-content">
        <h3>${biz.name}</h3>
        <p class="address">${biz.address}</p>
        <p class="phone"><a href="tel:${biz.phone}">${biz.phone}</a></p>
        <p class="website"><a href="${biz.website}" target="_blank" rel="noopener">Visit Website</a></p>
        <p class="membership">${biz.membershipLevel} Member</p>
      </div>
    `;
    directory.appendChild(card);
  });
}

// View toggle with enhanced feedback
function setViewMode(mode) {
  directory.className = mode;
  localStorage.setItem("viewMode", mode);

  // Update button states
  gridView.classList.toggle("active", mode === "grid");
  listView.classList.toggle("active", mode === "list");
}

// Initialize view from localStorage
function initViewMode() {
  const savedMode = localStorage.getItem("viewMode") || "grid";
  setViewMode(savedMode);
}

// Event listeners with feedback
gridView.addEventListener("click", () => setViewMode("grid"));
listView.addEventListener("click", () => setViewMode("list"));

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  initViewMode();
  loadDirectory();
});
