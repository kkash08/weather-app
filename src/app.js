// Displaying current date and time
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function formatDate(timestamp) {
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
  let day = now.getDay();
  let displayDate = `${days[day]} ${currentHour}:${currentMinute}`;
  return displayDate;
}

function showForecast(response) {
  console.log(response);
  let daysForecast = [];
  let tempForecastElements = document.querySelectorAll("#forecast-temp");
  for (let i = 0; i < 6; i++) {
    tempForecastElements[i].innerHTML = `${Math.round(
      response.data.daily[i].temp.day
    )}°`;
  }

  console.log(daysForecast);
}
function getForecast(lat, lon) {
  let newUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={[current,hourly,minutely,alerts]}&appid=${apiKey}&units=metric`;
  axios.get(newUrl).then(showForecast);
}

function handleTemp(response) {
  // console.log(response);
  isDegreeCelcius = true;
  farenheitLink.classList.remove("active");
  celciusLink.classList.add("active");
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
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  getForecast(lat, lon);
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
  let cityInput = document.querySelector("#search-input");
  let cityText = cityInput.value;
  getTemp(cityText);
  cityInput.value = "";
}

function obtainPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(handleTemp);
}

function getUserLocation() {
  navigator.geolocation.getCurrentPosition(obtainPosition);
}

let forecastDays = document.querySelectorAll("#forecast-day");
let j = 0;
let now = new Date();
let day = now.getDay();
let i = day;
do {
  i += 1;
  if (i < days.length) {
    forecastDays[j].innerHTML = days[i].slice(0, 3);
    j += 1;
  }

  if (i >= days.length) {
    i = 0;
  }
} while (i !== day);

let apiKey = "7bd031cbff42b694954d946388edc911";
let isDegreeCelcius = true;
let form = document.querySelector("#search-form");
form.addEventListener("submit", getPlace);
let locateBtn = document.querySelector(".locate-btn");
locateBtn.addEventListener("click", getUserLocation);

let celciusLink = document.querySelector("#celcius");
let farenheitLink = document.querySelector("#farenheit");

function showFarenheit(event) {
  event.preventDefault();
  if (isDegreeCelcius === true) {
    farenheitLink.classList.add("active");
    celciusLink.classList.remove("active");
    let tempLabel = document.querySelector("#temp-label");
    let tempEle = tempLabel.innerHTML;
    let farenDeg = (tempEle * 9) / 5 + 32;
    tempLabel.innerHTML = Math.round(farenDeg);
    isDegreeCelcius = false;
  }
}
farenheitLink.addEventListener("click", showFarenheit);

function showCelcius(event) {
  event.preventDefault();
  if (isDegreeCelcius === false) {
    farenheitLink.classList.remove("active");
    celciusLink.classList.add("active");
    let tempLabel = document.querySelector("#temp-label");
    let tempEle = tempLabel.innerHTML;
    let celDeg = (5 * (tempEle - 32)) / 9;
    tempLabel.innerHTML = Math.round(celDeg);
    isDegreeCelcius = true;
  }
}
celciusLink.addEventListener("click", showCelcius);
