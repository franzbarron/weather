async function getAirQuality(latitude: number, longitude: number) {
  const airQualityData = await fetch(
    `${baseURL}/air-quality/${latitude},${longitude}`
  )
    .then((data) => data.json())
    .catch((e: Error) => console.error(`An error ocurred: ${e.message}`));

  const stationCoords = airQualityData.data.city.geo;

  // The air quality API will always return the closest monitoring station
  // regardless of how near or far away it is from the desired location.
  // A distance of 10 km was chosen because it seems reasonable. If the station
  // is farther away than this distance, its data is discarded.
  if (
    calculateDistance(
      latitude,
      longitude,
      stationCoords[0],
      stationCoords[1]
    ) <= 10
  )
    showAirQuality(airQualityData);
  else invalidStation();
}

function showAirQuality(data) {
  showQualityLevel(data.data.aqi);
  showQualityDescription(data.data.aqi);
}

function showQualityLevel(index: number) {
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

function showQualityDescription(index: number) {
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

  document.querySelector(
    '#quality-description'
  ).textContent = `It seems like there's no information for this location's air quality`;
}
