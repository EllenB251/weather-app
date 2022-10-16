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
  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let currentYear = currentTime.getFullYear();
  let currentMonth = months[currentTime.getMonth()];
  let currentDate = currentTime.getDate();

  return `${day} ${currentDate}/${currentMonth}/${currentYear}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

let dateElement = document.querySelector("#day");
dateElement.innerHTML = formatDate(currentTime);

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `  
        <div class="col">
            <div class="card-deck">
              <div class="card">
                <div class="card-body">
                  <div class="card-title">
                    <img src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png" alt="" width="42"/>
                  </div>
                  <div class="weather-forecast-date">${formatDay(
                    forecastDay.dt
                  )}
		              </div>
		              <div class="weather-forecast-temperatures">
                  <div class="max-temp">${Math.round(
                    forecastDay.temp.max
                  )}°</div><div class="min-temp">${Math.round(
          forecastDay.temp.min
        )}°</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "f5e814a04eddfab1740f07bf0328eee2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  let emojiElement = document.querySelector("#emoji");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector(".digits").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  emojiElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "f5e814a04eddfab1740f07bf0328eee2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "f5e814a04eddfab1740f07bf0328eee2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#btn-link");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Perth");
