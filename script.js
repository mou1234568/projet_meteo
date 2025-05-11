const apiKey = 'CLE_API'; // Remplacez par votre clé API OpenWeatherMap
const weatherCardsContainer = document.getElementById('weatherCards');
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const refreshButton = document.getElementById('refreshButton');

let cities = JSON.parse(localStorage.getItem('cities')) || [];

// Ajout du conteneur d'erreur
const errorContainer = document.createElement('div');
errorContainer.id = 'errorContainer';
errorContainer.style.color = 'red';
errorContainer.style.marginTop = '10px';
cityInput.parentElement.appendChild(errorContainer);

const showError = (message) => {
    errorContainer.textContent = message;
    setTimeout(() => {
        errorContainer.textContent = '';
    }, 4000);
};

const fetchWeather = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`);
        if (!response.ok) throw new Error('Ville non trouvée');
        return await response.json();
    } catch (error) {
        showError(`Erreur : ${error.message}`);
        return null;
    }
};

const displayWeather = (weatherData) => {
    if (!weatherData) return;

    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');
    weatherCard.innerHTML = `
        <h2>${weatherData.name}</h2>
        <p>Température: ${weatherData.main.temp}°C</p>
        <p>Description: ${weatherData.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" alt="Weather Icon">
        <button class="remove-btn" data-city="${weatherData.name}">Supprimer</button>
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
        const weatherData = await fetchWeather(city);
        if (weatherData) {
            cities.push(city);
            saveCities();
            displayWeather(weatherData);
        }
        cityInput.value = '';
    }
};

const removeCity = (city) => {
    cities = cities.filter(c => c !== city);
    saveCities();
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

<<<<<<< HEAD
=======
weatherCardsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
        const city = event.target.getAttribute('data-city');
        removeCity(city);
    }
});

>>>>>>> ab7da11 (troisieme_final)
loadCities();
