let apiKey = "23aaaae64e83c4cd56d9fc7551ec12d8";

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function showTemperature(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temperature");
  let condition = response.data.weather[0].description;
  let conditionElement = document.querySelector("#current-condition");
  let iconElement = document.querySelector("#icon");
  let windElement = document.querySelector("#wind");

  celsiusTemperature = Math.round(response.data.main.temp);

  temperatureElement.innerHTML = `${celsiusTemperature}°`;
  conditionElement.innerHTML = `${condition}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  windElement.innerHTML = `wind: ${Math.round(response.data.wind.speed)} km/h`;
}
function sharePosition(_response) {
  console.log(_response);
  let gpsPosition = _response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = gpsPosition;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${gpsPosition}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "23aaaae64e83c4cd56d9fc7551ec12d8";
  let apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiWeatherUrl).then(sharePosition);
}
function provideGps() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = celsiusTemperature;
}
let celsiusTemperature = null;

let button = document.querySelector("button");
button.addEventListener("click", provideGps);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
let now = new Date();

let currentDate = document.querySelector("#current-time");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

currentDate.innerHTML = `${days[now.getDay()]}, ${hours}h${minutes}min`;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
