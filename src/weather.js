var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getWeatherData(latitude, longitude) {
    return __awaiter(this, void 0, void 0, function* () {
        const weatherData = yield fetch(`${baseURL}/weather/${units}/${latitude},${longitude}`)
            .then((data) => data.json())
            .catch((e) => {
            console.log(e.message);
            showNoWeather();
        });
        showCurrentWeather(weatherData.current);
        showWeatherForecast(weatherData.daily, weatherData.timezone);
    });
}
function showWeatherIcon(icon, elt) {
    var _a;
    if (!iconsList[icon])
        console.warn(`No icon for ${icon}`);
    const iconClass = (_a = iconsList[icon]) !== null && _a !== void 0 ? _a : 'wi-na';
    elt.classList.value = `wi ${iconClass}`;
}
function showDescription(description, elt) {
    description = description.charAt(0).toUpperCase() + description.substring(1);
    elt.textContent = description;
}
function showCurrentWeather(data) {
    if (units === 'metric') {
        data.feels_like_f = 1.8 * data.feels_like + 32;
        data.feels_like_c = data.feels_like;
    }
    else {
        data.feels_like_c = (5 / 9) * (data.feels_like - 32);
        data.feels_like_f = data.feels_like;
    }
    const weatherIcon = document.querySelector('#weather-icon');
    showWeatherIcon(data.weather[0].icon, weatherIcon);
    const weatherDescription = document.querySelector('#weather-description');
    showDescription(data.weather[0].description, weatherDescription);
    const temperatureCelsiusElt = document.querySelector('#weather-temperature-c');
    const temperatureFahrenheitElt = document.querySelector('#weather-temperature-f');
    let temperatureC = Math.round(data.feels_like_c);
    let temperatureF = Math.round(data.feels_like_f);
    temperatureCelsiusElt.textContent = `${temperatureC}°C`;
    temperatureFahrenheitElt.textContent = `${temperatureF}°F`;
}
function showWeatherForecast(data, timeZone) {
    document.querySelector('#weather-forecast').classList.remove('hidden');
    for (let day = 0; day < data.length; day++) {
        if (units === 'metric') {
            data[day].temp.max_f = 1.8 * data[day].temp.max + 32;
            data[day].temp.max_c = data[day].temp.max;
            data[day].temp.min_f = 1.8 * data[day].temp.min + 32;
            data[day].temp.min_c = data[day].temp.min;
        }
        else {
            data[day].temp.max_c = (5 / 9) * (data[day].temp.max - 32);
            data[day].temp.max_f = data[day].temp.max;
            data[day].temp.min_c = (5 / 9) * (data[day].temp.min - 32);
            data[day].temp.min_f = data[day].temp.min;
        }
        showDate(data[day].dt, timeZone, day);
        const descriptionElt = document.querySelector(`#description-${day}`);
        showDescription(data[day].weather[0].description, descriptionElt);
        const iconElt = document.querySelector(`#icon-${day}`);
        showWeatherIcon(data[day].weather[0].icon, iconElt);
        const maxCelsiusElt = document.querySelector(`#max-c-${day}`);
        const maxFahrenheitElt = document.querySelector(`#max-f-${day}`);
        const maxTempCelsius = Math.floor(data[day].temp.max_c);
        const maxTempFahrenheit = Math.floor(data[day].temp.max_f);
        maxCelsiusElt.textContent = `${maxTempCelsius}°C`;
        maxFahrenheitElt.textContent = `${maxTempFahrenheit}°F`;
        const minCelsiusElt = document.querySelector(`#min-c-${day}`);
        const minFahrenheitElt = document.querySelector(`#min-f-${day}`);
        const minTempCelsius = Math.floor(data[day].temp.min_c);
        const minTempFahrenheit = Math.floor(data[day].temp.min_f);
        minCelsiusElt.textContent = `${minTempCelsius}°C`;
        minFahrenheitElt.textContent = `${minTempFahrenheit}°F`;
    }
}
function showDate(date, timezone, day) {
    const dateElt = document.querySelector(`#date-${day}`);
    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        timeZone: timezone
    };
    const parsedDay = new Date(date * 1000).toLocaleDateString('en-US', options);
    dateElt.textContent = parsedDay;
}
function showNoWeather() {
    const weatherIcon = document.querySelector('#weather-icon');
    showWeatherIcon(null, weatherIcon);
    const weatherDescription = document.querySelector('#weather-description');
    weatherDescription.textContent = 'Weather not available for this location';
    const temperatureCelsiusElt = document.querySelector('#weather-temperature-c');
    const temperatureFahrenheitElt = document.querySelector('#weather-temperature-f');
    temperatureCelsiusElt.textContent = `N/A`;
    temperatureFahrenheitElt.textContent = `N/A`;
    document.querySelector('#weather-forecast').classList.add('hidden');
}
