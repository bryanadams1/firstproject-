function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = "0f9a9eca57cb20def0db5da326d6377a"; // Add your API key here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = `
                <h3>${data.name}</h3>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
            document.getElementById("weatherInfo").innerHTML = weatherInfo;
        })
        .catch(error => {
            document.getElementById("weatherInfo").innerHTML = "<p>City not found!</p>";
        });
}