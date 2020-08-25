var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let iconsList;
let units = 'metric';
const baseURL = 'https://weather-air-quality-app.herokuapp.com';
fetch(baseURL).then(() => {
    console.log('Server awake');
});
(() => __awaiter(this, void 0, void 0, function* () {
    iconsList = yield fetch('./src/icons.json').then((data) => data.json());
}))();
function gotPosition(position) {
    return __awaiter(this, void 0, void 0, function* () {
        const { latitude, longitude } = position.coords;
        const locationData = yield fetch(`${baseURL}/geocode/${latitude},${longitude}`)
            .then((data) => data.json())
            .catch((err) => {
            console.error(`An error ocurred: ${err}`);
            if (err.message === 'Failed to fetch')
                showError(`There was a problem connecting to the web.`);
            return;
        });
        const parsedLocation = parseLocation(locationData.results[0].components);
        showLocation(parsedLocation);
        document.querySelector('#location-data').classList.remove('hidden');
        document.querySelector('#error').classList.add('hidden');
        getWeatherData(latitude, longitude);
        getAirQuality(latitude, longitude);
    });
}
function parseLocation(data) {
    var _a, _b;
    const thirdLevel = ((_a = data.city) !== null && _a !== void 0 ? _a : data.county);
    const secondLevel = ((_b = data.state) !== null && _b !== void 0 ? _b : '');
    const firstLevel = data.country;
    return { firstLevel, secondLevel, thirdLevel };
}
function showError(error) {
    document.querySelector('#location-data').classList.add('hidden');
    document.querySelector('#error').classList.remove('hidden');
    document.querySelector('#error-message').textContent = error;
    document.querySelector('#loading').classList.add('hidden');
}
function getLocationCoords(locationName) {
    return __awaiter(this, void 0, void 0, function* () {
        const locationData = yield fetch(`${baseURL}/geocode/${locationName}`)
            .then((data) => data.json())
            .catch((err) => {
            console.error(`An error ocurred: ${err}`);
            if (err.message === 'Failed to fetch')
                showError(`There was a problem connecting to the web.`);
            return;
        });
        if (locationData.results.length === 0) {
            console.error(`An error ocurred: No data found for ${locationName}`);
            showError(`Sorry! We couldn't find a place called ${locationName}.`);
            return;
        }
        const { lat, lng } = locationData.results[0].geometry;
        const parsedLocation = parseLocation(locationData.results[0].components);
        showLocation(parsedLocation);
        document.querySelector('#location-data').classList.remove('hidden');
        document.querySelector('#error').classList.add('hidden');
        getWeatherData(lat, lng);
        getAirQuality(lat, lng);
    });
}
function showLocation(data) {
    let locationName = '';
    if (data.thirdLevel)
        locationName += `${data.thirdLevel}, `;
    if (data.secondLevel)
        locationName += `${data.secondLevel}, `;
    locationName += `${data.firstLevel}`;
    document.querySelector('#location').textContent = locationName;
    document.querySelector('#loading').classList.add('hidden');
}
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}
