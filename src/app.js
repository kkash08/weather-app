// Displaying current date and time
function formatDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let now = new Date(timestamp);
  let minutes = now.getMinutes();
  let currentMinute = minutes;
  if (minutes < 10) {
    currentMinute = `0${minutes}`;
  }
  let hours = now.getHours();
  let currentHour = hours;
  if (hours < 10) {
    currentHour = `0${hours}`;
  }
  let displayDate = `${days[now.getDay()]} ${currentHour}:${currentMinute}`;
  return displayDate;
}

function handleTemp(response) {
  console.log(response);
  let condition = response.data.weather[0].id;
  let imgWeather = document.querySelector(".icon-container");
  if (condition < 600) {
    imgWeather.innerHTML =
      '<i class="fa-solid fa-cloud-rain weather-icon rain"></i>';
  } else if (condition >= 600 && condition <= 700) {
    imgWeather.innerHTML =
      '<i class="fa-solid fa-snowflake weather-icon snow">';
  } else if (condition > 800) {
    imgWeather.innerHTML = '<i class="fa-solid fa-cloud weather-icon cloud">';
  } else if (condition > 700 && condition < 800) {
    imgWeather.innerHTML = '<i class="fa-solid fa-smog weather-icon haze"></i>';
  } else if (condition === 800) {
    imgWeather.innerHTML = '<i class="fa-solid fa-sun weather-icon"></i>';
  }
  let placeLabel = document.querySelector("#place-name");
  let tempLabel = document.querySelector("#temp-label");
  let descLabel = document.querySelector("#label-today");
  let humidityLabel = document.querySelector("#humidity-label");
  let windSpeedLabel = document.querySelector("#wind-speed-label");
  let dateLabel = document.querySelector("#today-date-text");
  placeLabel.innerHTML = `📍${response.data.name}`;
  tempLabel.innerHTML = `${Math.round(response.data.main.temp)}`;
  descLabel.innerHTML = `${response.data.weather[0].main}`;
  windSpeedLabel.innerHTML = `🌬${Math.round(response.data.wind.speed)}km/h`;
  humidityLabel.innerHTML = `🌧${Math.round(response.data.main.humidity)}%`;
  dateLabel.innerHTML = formatDate(response.data.dt * 1000);
}

function getTemp(cityName) {
  let apiKey = "7bd031cbff42b694954d946388edc911";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(handleTemp);
}

function getPlace(event) {
  event.preventDefault();
  isDegreeCelcius = true;
  let cityInput = document.querySelector("#search-input");
  let cityText = cityInput.value;
  getTemp(cityText);
  cityInput.value = "";
}

function obtainPosition(position) {
  let apiKey = "7bd031cbff42b694954d946388edc911";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(handleTemp);
}

function getUserLocation() {
  navigator.geolocation.getCurrentPosition(obtainPosition);
}

let isDegreeCelcius = true;
let form = document.querySelector("#search-form");
form.addEventListener("submit", getPlace);
let locateBtn = document.querySelector(".locate-btn");
locateBtn.addEventListener("click", getUserLocation);

let celciusLink = document.querySelector("#celcius");
let farenheitLink = document.querySelector("#farenheit");

function showFarenheit() {
  if (isDegreeCelcius === true) {
    let tempLabel = document.querySelector("#temp-label");
    let tempEle = tempLabel.innerHTML;
    let farenDeg = (tempEle * 9) / 5 + 32;
    tempLabel.innerHTML = Math.round(farenDeg);
    isDegreeCelcius = false;
  }
}
farenheitLink.addEventListener("click", showFarenheit);

function showCelcius() {
  if (isDegreeCelcius === false) {
    let tempLabel = document.querySelector("#temp-label");
    let tempEle = tempLabel.innerHTML;
    let celDeg = (5 * (tempEle - 32)) / 9;
    tempLabel.innerHTML = Math.round(celDeg);
    isDegreeCelcius = true;
  }
}
celciusLink.addEventListener("click", showCelcius);
