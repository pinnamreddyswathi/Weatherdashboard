async function getWeather() {

    const city = document.getElementById("city").value;
    const result = document.getElementById("weatherResult");

    const apiKey = "YOUR_API_KEY";

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        result.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;

    } catch(error){
        result.innerHTML = `<p>${error.message}</p>`;
    }
}
