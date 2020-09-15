var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getAirQuality(latitude, longitude) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const airQualityData = yield fetch(`${baseURL}/air-quality/${latitude},${longitude}`)
            .then((data) => data.json())
            .catch((e) => console.error(`An error ocurred: ${e.message}`));
        const stationCoords = (_b = (_a = airQualityData === null || airQualityData === void 0 ? void 0 : airQualityData.data) === null || _a === void 0 ? void 0 : _a.city) === null || _b === void 0 ? void 0 : _b.geo;
        if (stationCoords &&
            calculateDistance(latitude, longitude, stationCoords[0], stationCoords[1]) <= 10)
            showAirQuality(airQualityData);
        else
            invalidStation();
    });
}
function showAirQuality(data) {
    showQualityLevel(data.data.aqi);
    showQualityDescription(data.data.aqi);
    showAttributions(data.data.attributions);
}
function showQualityLevel(index) {
    const qualityLevelElt = document.querySelector('#quality-level');
    if (index <= 50) {
        qualityLevelElt.textContent = 'Good';
        qualityLevelElt.classList.value = 'aq-0';
    }
    if (index > 50 && index <= 100) {
        qualityLevelElt.textContent = 'Moderate';
        qualityLevelElt.classList.value = 'aq-1';
    }
    if (index > 100 && index <= 150) {
        qualityLevelElt.textContent = 'Unhealthy for sensitive groups';
        qualityLevelElt.classList.value = 'aq-2';
    }
    if (index > 150 && index <= 200) {
        qualityLevelElt.textContent = 'Unhealthy';
        qualityLevelElt.classList.value = 'aq-3';
    }
    if (index > 200 && index <= 300) {
        qualityLevelElt.textContent = 'Very unhealthy';
        qualityLevelElt.classList.value = 'aq-4';
    }
    if (index > 300) {
        qualityLevelElt.textContent = 'Hazardous';
        qualityLevelElt.classList.value = 'aq-5';
    }
}
function showQualityDescription(index) {
    const qualityDescriptionElt = document.querySelector('#quality-description');
    if (index <= 50) {
        qualityDescriptionElt.textContent =
            'Air quality is considered satisfactory, and air pollution poses little or no risk';
    }
    if (index > 50 && index <= 100) {
        qualityDescriptionElt.textContent =
            'Air quality is acceptable; however, there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.';
    }
    if (index > 100 && index <= 150) {
        qualityDescriptionElt.textContent =
            'Members of sensitive groups may experience health effects. The general public is not likely to be affected.';
    }
    if (index > 150 && index <= 200) {
        qualityDescriptionElt.textContent =
            'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects';
    }
    if (index > 200 && index <= 300) {
        qualityDescriptionElt.textContent =
            'Health warnings of emergency conditions. The entire population is more likely to be affected.';
    }
    if (index > 300) {
        qualityDescriptionElt.textContent =
            'Health alert. Everyone may experience more serious health effects';
    }
}
function invalidStation() {
    const qualityLevelElt = document.querySelector('#quality-level');
    qualityLevelElt.classList.value = '';
    qualityLevelElt.textContent = 'N/A';
    document.querySelector('#quality-description').textContent = `It seems like there's no information for this location's air quality`;
    document.querySelector('#air-quality-source').classList.add('hidden');
}
function showAttributions(attributions) {
    document.querySelector('#air-quality-source').classList.remove('hidden');
    const attributionsListElt = document.querySelector('#attributions-list');
    attributionsListElt.textContent = '';
    const length = attributions.length;
    for (let i = 0; i < length; i++) {
        const link = document.createElement('a');
        link.setAttribute('href', attributions[i].url);
        if (i === length - 1 && i !== 0)
            attributionsListElt.innerHTML += 'and ';
        link.innerHTML = attributions[i].name;
        attributionsListElt.appendChild(link);
        if (i !== length - 1 && length > 2)
            attributionsListElt.innerHTML += ', ';
        else
            attributionsListElt.innerHTML += ' ';
    }
}
