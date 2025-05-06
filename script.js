const apiKey = 'dbbb525e785d08f230cfefa0f35ea00c'; // Remplacez par votre clé API OpenWeatherMap
const weatherCardsContainer = document.getElementById('weatherCards');
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const refreshButton = document.getElementById('refreshButton');

let cities = JSON.parse(localStorage.getItem('cities')) || [];

const fetchWeather = async (city) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    return data;
};

const displayWeather = (weatherData) => {
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');
    weatherCard.innerHTML = `
        <h2>${weatherData.name}</h2>
        <p>Température: ${weatherData.main.temp}°C</p>
        <p>Description: ${weatherData.weather[0].description}</p>
        <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" alt="Weather Icon">
        <button onclick="removeCity('${weatherData.name}')">Supprimer</button>
    `;
    weatherCardsContainer.appendChild(weatherCard);
};

const saveCities = () => {
    localStorage.setItem('cities', JSON.stringify(cities));
};

const loadCities = async () => {
    weatherCardsContainer.innerHTML = '';
    for (const city of cities) {
        const weatherData = await fetchWeather(city);
        displayWeather(weatherData);
    }
};

const addCity = async () => {
    const city = cityInput.value.trim();
    if (city && !cities.includes(city)) {
        cities.push(city);
        saveCities();// Sauvegarde les villes après add
        const weatherData = await fetchWeather(city);
        displayWeather(weatherData);
        cityInput.value = '';
    }
};

const removeCity = (city) => {
    cities = cities.filter(c => c !== city);
    saveCities();// Sauvegarde les villes après suppre
    loadCities();
};

const refreshWeather = async () => {
    weatherCardsContainer.innerHTML = '';
    for (const city of cities) {
        const weatherData = await fetchWeather(city);
        displayWeather(weatherData);
    }
};

searchButton.addEventListener('click', addCity);
refreshButton.addEventListener('click', refreshWeather);

loadCities();