const weatherInfo = document.querySelector(".js-weather");

const API_KEYS = "5fa7ec2dbfc51f60616cff56cba0ac76";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${API_KEYS}`
  )
    .then(data => data.json())
    .then(result => {
      const temperature = result.main.temp;
      const name = result.name;
      const weather = result.weather[0].description;
      weatherInfo.innerHTML = `
            <p class='locationName'>${name}</p>
            <p class='locationInfo'>
                <span class='temperature'>${temperature}°C</span>
                <span class='weather'> ${weather}</span>
            </p>
        `;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoError() {
  console.log("Can't access geolocation");
}

function handleGeoSuccess(position) {
  const {
    coords: {latitude, longitude},
  } = position;

  const coordsObj = {
    latitude,
    longitude,
  };

  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords !== null) {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  } else {
    askForCoords();
  }
}

function init() {
  loadCoords();
}
init();
