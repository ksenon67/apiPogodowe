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

function getWeather() {
    errorMsg.innerHTML = '';
    const apiCity = input.value || "Sopot";
    const URL = apiLink + apiCity + apiKey + apiUnits + apiLang;
    console.log(URL);
    axios.get(URL)
      .then(function (response) {
        console.log(response);
        cityName.innerHTML = response.data.name;
        img.src =  `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
        temperature.innerHTML = `${Math.round(response.data.main.temp)} °C`;
        feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)} °C`;
        pressure.innerHTML = response.data.main.pressure + "hPa";
        humidity.innerHTML = response.data.main.humidity + "%";
        windSpeed.innerHTML = Math.round((response.data.wind.speed  * 3.6 ))+ 'km/h';
        clouds.innerHTML = response.data.clouds.all + " %";
        weatherDescription.innerHTML = response.data.weather[0].description;
      })
      .catch(function (error) {
        errorMsg.innerHTML = "Masz coś nie tak, lub nie ma miasta o podanej nazwie :)"
        console.log(error);
      })
      .finally(function () {
        "Podjęto próbe pobrania informacji o pogodzie"
      });
}

const getWeatherByEnter = e => {
    if(e.key === 'Enter') {
        getWeather();
    }
}

button.addEventListener('click', getWeather)
input.addEventListener('keypress', getWeatherByEnter)

const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-name');
const savedLocationsList = document.getElementById('saved-locations');

function saveLocation(event) {
    event.preventDefault();
    const locationName = locationInput.value.trim();
    if (locationName === '') return;

    const location = {
        id: Date.now(),
        name: locationName
    };

    const savedLocations = JSON.parse(localStorage.getItem('savedLocations')) || [];
    savedLocations.push(location);
    localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
    displaySavedLocations();

    locationInput.value = '';
}

function displaySavedLocations() {
    savedLocationsList.innerHTML = '';
    const savedLocations = JSON.parse(localStorage.getItem('savedLocations')) || [];
    savedLocations.forEach(location => {
        const li = document.createElement('li');
        li.textContent = location.name;
        const weatherButton = document.createElement('button');
        weatherButton.textContent = 'Sprawdź pogodę';
        weatherButton.addEventListener('click', () => getWeatherForSavedLocation(location.name));
        li.appendChild(weatherButton);

        savedLocationsList.appendChild(li);
    });
}

function getWeatherForSavedLocation(locationName) {
    const URL = apiLink + locationName + apiKey + apiUnits + apiLang;
    axios.get(URL)
        .then(function (response) {
            cityName.innerHTML = response.data.name;
            img.src =  `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
            temperature.innerHTML = `${Math.round(response.data.main.temp)} °C`;
            feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)} °C`;
            pressure.innerHTML = response.data.main.pressure + "hPa";
            humidity.innerHTML = response.data.main.humidity + "%";
            windSpeed.innerHTML = Math.round((response.data.wind.speed  * 3.6 ))+ 'km/h';
            clouds.innerHTML = response.data.clouds.all + " %";
            weatherDescription.innerHTML = response.data.weather[0].description;
        })
        .catch(function (error) {
            console.log(error);
            errorMsg.innerHTML = "Masz coś nie tak, lub nie ma miasta o podanej nazwie :)";
        });
}
locationForm.addEventListener('submit', saveLocation);
displaySavedLocations();