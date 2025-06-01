// Toggle Hamburger Menu
function setupMenuToggle() {
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("show");
      menuToggle.textContent = menu.classList.contains("show") ? "✖" : "☰";
    });
  }
}

// Update footer year
function updateFooterDate() {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// Update last modified date and time
function updateLastModified() {
  const lastModifiedSpan = document.getElementById("last-modified");
  if (lastModifiedSpan) {
    const modified = new Date(document.lastModified);
    if (!isNaN(modified)) {
      lastModifiedSpan.textContent = `Last updated: ${modified.toLocaleString()}`;
    } else {
      lastModifiedSpan.textContent = "Last updated: Unknown";
    }
  }
}

// Update timestamp input field
function updateTimestamp() {
  const timestampField = document.getElementById("timestamp");
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }
}

// Fetch and display weather
function fetchWeather() {
  const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your actual API key
  const city = "Benin City";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const weatherInfo = document.getElementById("weather-info");
      if (weatherInfo) {
        weatherInfo.textContent = `🌡️ ${data.main.temp}°C | ${data.weather[0].description}`;
      }
    })
    .catch(() => {
      const weatherInfo = document.getElementById("weather-info");
      if (weatherInfo) {
        weatherInfo.textContent = "Unable to fetch weather data.";
      }
    });
}

// Show banner if it's Monday–Wednesday
function showMeetAndGreetBanner() {
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, ...
  if (today >= 1 && today <= 3) {
    const banner = document.createElement("div");
    banner.id = "meet-greet-banner";
    banner.innerHTML = `
      <p>Join us for our Chamber of Commerce meet & greet on Wednesday at 7:00 p.m.</p>
      <button onclick="this.parentElement.style.display='none'">❌</button>
    `;
    document.body.prepend(banner);
  }
}

// Load and display members from JSON
async function loadDirectoryMembers() {
  const directory = document.querySelector("#directory");
  const gridViewBtn = document.querySelector("#gridView");
  const listViewBtn = document.querySelector("#listView");
  if (!directory) return;

  const members = await fetchMembers();
  displayMembers(members);

  if (gridViewBtn && listViewBtn) {
    gridViewBtn.addEventListener("click", () => {
      directory.classList.add("grid");
      directory.classList.remove("list");
    });

    listViewBtn.addEventListener("click", () => {
      directory.classList.add("list");
      directory.classList.remove("grid");
    });
  }
}

async function fetchMembers() {
  const response = await fetch("data/members.json");
  return await response.json();
}

function displayMembers(members) {
  const directory = document.querySelector("#directory");
  if (!directory) return;

  directory.innerHTML = "";
  members.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("member");
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="membership">${member.membership} Member</p>
    `;
    directory.appendChild(card);
  });
}

// Password confirmation logic
function handlePasswordConfirmation() {
  const password = document.getElementById("password");
  const confirm = document.getElementById("confirm-password");
  if (password && confirm) {
    confirm.addEventListener("input", () => {
      confirm.setCustomValidity(
        password.value !== confirm.value ? "Passwords do not match." : ""
      );
    });
  }
}

// Rating display
function handleRatingInput() {
  const ratingInput = document.getElementById("rating");
  const ratingValue = document.getElementById("rating-value");
  if (ratingInput && ratingValue) {
    ratingInput.addEventListener("input", () => {
      ratingValue.textContent = ratingInput.value;
    });
  }
}

// Spotlight Ads
function displaySpotlightAds() {
  const spotlightContainer = document.getElementById("spotlight-ads");
  if (!spotlightContainer) return;

  fetch("chamber/data/members.json")
    .then((res) => res.json())
    .then((data) => {
      const topMembers = data.companies.filter(
        (m) => m.membershipLevel >= 2 // Gold (3) or Silver (2)
      );
      const random = topMembers.sort(() => 0.5 - Math.random()).slice(0, 3);
      spotlightContainer.innerHTML = "";
      random.forEach((member) => {
        const ad = document.createElement("div");
        ad.innerHTML = `
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        spotlightContainer.appendChild(ad);
      });
    });
}

function getMembershipLabel(level) {
  return level === 3 ? "Gold" : level === 2 ? "Silver" : "Bronze";
}

function displayMembers(members) {
  const directory = document.querySelector("#directory");
  if (!directory) return;

  directory.innerHTML = "";
  members.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("member");
    card.innerHTML = `
      <img src="${member.logo}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="membership">${getMembershipLabel(
        member.membershipLevel
      )} Member</p>
    `;
    directory.appendChild(card);
  });
}

// INIT on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  setupMenuToggle();
  updateFooterDate();
  updateLastModified();
  updateTimestamp();
  fetchWeather();
  showMeetAndGreetBanner();
  loadDirectoryMembers();
  handlePasswordConfirmation();
  handleRatingInput();
  displaySpotlightAds();
});
