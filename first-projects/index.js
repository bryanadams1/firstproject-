// WEATHER APP
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "0f9a9eca57cb20def0db5da326d6377a";

weatherForm.addEventListener("submit", async event => {
   event.preventDefault();
   const city = cityInput.value.trim(); // Trim input value

   if (city) {
      try {
         const weatherData = await getWeatherData(city);
         displayWeatherInfo(weatherData);
      } catch (error) {
         console.error(error);
         displayError(error.message); // Pass the error message
      }
   } else {
      displayError("Please enter a city");
   }
});

async function getWeatherData(city) {
   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
   const response = await fetch(apiUrl);

   if (!response.ok) {
      throw new Error("Failed to fetch weather data. Please check the city name.");
   }

   const data = await response.json();
   return data;
}

function displayError(message) {
   card.textContent = ""; // Clear previous content
   const errorDisplay = document.createElement("p");
   errorDisplay.textContent = message;
   errorDisplay.classList.add("errorDisplay");

   card.style.display = "flex"; // Ensure the card is visible
   card.appendChild(errorDisplay); // Add the error message
}

function displayWeatherInfo(data) {
   const weatherDisplay = document.createElement("div");
   weatherDisplay.classList.add("weatherDisplay");

   const cityName = document.createElement("h2");
   cityName.textContent = data.name;

   const temperature = document.createElement("p");
   temperature.textContent = `Temperature: ${data.main.temp}°C`;

   const weatherDescription = document.createElement("p");
   weatherDescription.textContent = `Weather: ${data.weather[0].description}`;

   const weatherEmoji = document.createElement("span");
   weatherEmoji.textContent = getWeatherEmoji(data.weather[0].id);

   weatherDisplay.appendChild(cityName);
   weatherDisplay.appendChild(temperature);
   weatherDisplay.appendChild(weatherDescription);
   weatherDisplay.appendChild(weatherEmoji);

   card.textContent = ""; // Clear previous content
   card.style.display = "flex"; // Ensure the card is visible
   card.appendChild(weatherDisplay); // Add the weather info
}

function getWeatherEmoji(weatherId) {
   if (weatherId >= 200 && weatherId < 300) return "⛈️"; // Thunderstorm
   if (weatherId >= 300 && weatherId < 500) return "🌧️"; // Drizzle
   if (weatherId >= 500 && weatherId < 600) return "🌦️"; // Rain
   if (weatherId >= 600 && weatherId < 700) return "❄️"; // Snow
   if (weatherId >= 700 && weatherId < 800) return "🌫️"; // Atmosphere
   if (weatherId === 800) return "☀️"; // Clear
   if (weatherId > 800) return "☁️"; // Clouds
   return "🌍"; // Default
}