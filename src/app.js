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
let dateLabel = document.querySelector("#today-date-text");
let now = new Date();
let minutes = now.getMinutes();
let currentMinute = minutes;
if (minutes < 10) {
  currentMinute = `0${minutes}`;
}
let displayDate = `${days[now.getDay()]} ${now.getHours()}:${currentMinute}`;
dateLabel.innerHTML = displayDate;

function handleTemp(response) {
  console.log(response);
  let cityName = response.data.name;
  let curTemp = Math.round(response.data.main.temp);
  let description = response.data.weather[0].main;
  let windSpeed = Math.round(response.data.wind.speed);
  let humidity = Math.round(response.data.main.humidity);
  let placeLabel = document.querySelector("#place-name");
  placeLabel.innerHTML = `📍${cityName}`;
  let tempLabel = document.querySelector("#temp-label");
  tempLabel.innerHTML = `${curTemp}°`;
  let descLabel = document.querySelector("#label-today");
  descLabel.innerHTML = `${description}`;
  let humidityLabel = document.querySelector("#humidity-label");
  humidityLabel.innerHTML = `🌧${humidity}%`;
  let windSpeedLabel = document.querySelector("#wind-speed-label");
  windSpeedLabel.innerHTML = `🌬${windSpeed}km/h`;
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
  let apiKey = "7bd031cbff42b694954d946388edc911";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(handleTemp);
}

function getUserLocation() {
  navigator.geolocation.getCurrentPosition(obtainPosition);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", getPlace);
let locateBtn = document.querySelector(".locate-btn");
locateBtn.addEventListener("click", getUserLocation);
