const input = document.querySelector("input");
const button = document.querySelector("button");
const errorMsg = document.querySelector("p.error");
const cityName = document.querySelector(".city");
const img = document.querySelector("img");
const temperature = document.querySelector(".temp");
const weatherDescription = document.querySelector(".weather_description");
const feelsLike = document.querySelector(".feels_like");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const windSpeed = document.querySelector(".wind_speed");
const clouds = document.querySelector(".clouds");
const locationForm = document.getElementById('location-form');
const locationNameInput = document.getElementById('location-name');
const savedLocationsList = document.getElementById('saved-locations');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=3d5ad419d8fb3df9762b2f6493181242';
const apiUnits = '&units=metric';
const apiLang = '&lang=pl';

function getWeather(city) {
    errorMsg.innerHTML = '';
    const apiCity = city || input.value || "Sopot";
    const URL = apiLink + apiCity + apiKey + apiUnits + apiLang;
    console.log(URL);
    axios.get(URL)
      .then(function (response) {
        console.log(response);
        cityName.innerHTML = response.data.name;
        img.src = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        temperature.innerHTML = `${Math.round(response.data.main.temp)} °C`;
        feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)} °C`;
        pressure.innerHTML = response.data.main.pressure + "hPa";
        humidity.innerHTML = response.data.main.humidity + "%";
        windSpeed.innerHTML = Math.round((response.data.wind.speed * 3.6)) + 'km/h';
        clouds.innerHTML = response.data.clouds.all + " %";
        weatherDescription.innerHTML = response.data.weather[0].description;
      })
      .catch(function (error) {
        errorMsg.innerHTML = "Masz coś nie tak, lub nie ma miasta o podanej nazwie :)";
        console.log(error);
      });
}

const getWeatherByEnter = e => {
    if (e.key === 'Enter') {
        getWeather();
    }
}

button.addEventListener('click', () => getWeather());
input.addEventListener('keypress', getWeatherByEnter);

locationForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const locationName = locationNameInput.value.trim();
    if (locationName) {
        saveLocation(locationName);
        locationNameInput.value = '';
    }
});

function saveLocation(locationName) {
    axios.post('/saveLocation', { id: Date.now(), name: locationName })
        .then(response => {
            loadSavedLocations();
        })
        .catch(error => {
            console.error('Błąd zapisu lokalizacji', error);
        });
}

function loadSavedLocations() {
    axios.get('/localisation.json')
        .then(response => {
            const locations = response.data;
            displaySavedLocations(locations);
        })
        .catch(error => {
            console.error('Błąd ładowania zapisanych lokalizacji', error);
        });
}

function displaySavedLocations(locations) {
    savedLocationsList.innerHTML = '';
    locations.forEach(location => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${location.name}</span>
            <div class='search-buttons-location'>
            <button onclick="getWeather('${location.name}')">Sprawdź pogodę</button>
            <button onclick="deleteLocation(${location.id})">Usuń</button>
            </div>
        `;
        savedLocationsList.appendChild(li);
    });
}

function deleteLocation(id) {
    axios.post('/deleteLocation', { id })
        .then(response => {
            loadSavedLocations();
        })
        .catch(error => {
            console.error('Błąd usuwania lokalizacji', error);
        });
}

document.addEventListener('DOMContentLoaded', loadSavedLocations);
