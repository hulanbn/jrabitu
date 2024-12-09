let data = {}; // Global variable to store fetched data

// Fetch data from the JSON file
async function loadData() {
  try {
    const response = await fetch('./extras/dattta.json'); // Ensure the JSON file is in the same directory
    data = await response.json(); // Parse the JSON data
    console.log("Data loaded successfully:", data);
  } catch (error) {
    console.error("Error loading JSON data:", error);
    alert("Failed to load data. Please check the JSON file.");
  }
}

function openGenrePopup(category) {
  const genrePopup = document.getElementById("genre-popup");
  const genreOptions = document.getElementById("genre-options");
  const genreTitle = document.getElementById("genre-title");

  genreOptions.innerHTML = "";
  genreTitle.textContent = `Select a Genre for ${category.charAt(0).toUpperCase() + category.slice(1)}`;

  const genres = Object.keys(data[category]);
  genres.forEach((genre) => {
    const button = document.createElement("button");
    button.textContent = genre.charAt(0).toUpperCase() + genre.slice(1);
    button.className = "category-btn";
    button.onclick = () => openResultPopup(category, genre);
    genreOptions.appendChild(button);
  });

  genrePopup.classList.remove("hidden");
}

function closeGenrePopup() {
  document.getElementById("genre-popup").classList.add("hidden");
}

function openResultPopup(category, genre) {
  const resultPopup = document.getElementById("result-popup");
  const result = data[category][genre];

  if (result) {
    document.getElementById("result-title").textContent = result.title;
    document.getElementById("result-details").textContent = result.details;
    document.getElementById("result-image").src = result.image;
    resultPopup.classList.remove("hidden");
  } else {
    alert("No data found for this genre.");
  }

  closeGenrePopup();
}

function closeResultPopup() {
  document.getElementById("result-popup").classList.add("hidden");
}

// Load the data when the page loads
document.addEventListener("DOMContentLoaded", loadData);
