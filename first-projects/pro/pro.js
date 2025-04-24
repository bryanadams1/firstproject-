// script.js
function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = "0f9a9eca57cb20def0db5da326d6377a"; // Add your API key here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherHTML = `
                <h2>${data.name}</h2>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;
            document.getElementById('weatherContainer').innerHTML = weatherHTML;
        })
        .catch(() => {
            document.getElementById('weatherContainer').innerHTML = `<p>Unable to retrieve weather data. Please try again!</p>`;
        });
}