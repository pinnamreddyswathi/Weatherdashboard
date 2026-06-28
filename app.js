// Global Configuration
const API_KEY = 'YOUR_API_KEY_HERE'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');

const locationName = document.getElementById('location-name');
const tempVal = document.getElementById('temp-val');
const humidityVal = document.getElementById('humidity-val');
const windVal = document.getElementById('wind-val');

// Event Listener for the Search Button
searchBtn.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    if (cityName) {
        getWeatherData(cityName);
    } else {
        displayError("Please enter a valid city name.");
    }
});

// Asynchronous Function to Fetch API Data
async function getWeatherData(city) {
    // Clear previous states
    hideElements();

    try {
        // Fetch data using template literals; units=metric gives us Celsius
        const response = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
        
        // Comprehensive Error Handling for failed network/HTTP requests
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Please check the spelling.");
            } else {
                throw new Error(`Server error: ${response.status}`);
            }
        }

        const data = await response.json();
        
        // Parse and dynamically render complex nested JSON objects
        renderWeather(data);

    } catch (error) {
        // Catch and display network connection errors or thrown errors
        displayError(error.message || "Failed to fetch weather data. Try again later.");
    }
}

// Function to handle DOM rendering
function renderWeather(data) {
    // Extracting properties from nested paths (data.main and data.wind)
    locationName.textContent = `${data.name}, ${data.sys.country}`;
    tempVal.textContent = `${Math.round(data.main.temp)}°C`;
    humidityVal.textContent = `${data.main.humidity}%`;
    windVal.textContent = `${data.wind.speed} m/s`;

    // Reveal result container
    weatherResult.classList.remove('hidden');
}

// Helper function to display errors safely
function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// Helper to reset UI state
function hideElements() {
    weatherResult.classList.add('hidden');
    errorMessage.classList.add('hidden');
}
