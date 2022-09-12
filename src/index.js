function formatTime(timeElement) {
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

let currentTime = new Date();
let timeElement = document.querySelector("#time");
timeElement.innerHTML = formatTime(currentTime);

function formatDate(dateElement) {
  let dayIndex = currentTime.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[dayIndex];
  let monthIndex = currentTime.getMonth();
  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let currentYear = currentTime.getFullYear();
  let currentMonth = months[currentTime.getMonth()];
  let currentDate = currentTime.getDate();

  return `${day} ${currentDate}/${currentMonth}/${currentYear}`;
}

let dateElement = document.querySelector("#day");
dateElement.innerHTML = formatDate(currentTime);

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".digits").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchCity(city) {
  let apiKey = "8eb79378a344b8d84f6da0bbdb618b6b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "8eb79378a344b8d84f6da0bbdb618b6b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66 + "°F";
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19 + "°C";
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#btn-link");
currentLocationButton.addEventListener("click", getCurrentLocation);
