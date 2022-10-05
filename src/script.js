function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function convertToFahr(event) {
  event.preventDefault();
  let tempCel = document.querySelector("#currentTemp");
  let fahr = (celsius * 9)/5+32;
  tempCel.innerHTML = `${Math.round(fahr)}°F`;
  celsiusConverter.classList.remove("active");
  fahrConverter.classList.add("active");
}

function convertToCelsius(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#currentTemp");
  celsiusTemp.innerHTML = `${Math.round(celsius)}°C`;
  fahrConverter.classList.remove("active");
  celsiusConverter.classList.add("active");
}

function displayTemp(response) {
  let currentTemp = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let tempDescription = document.querySelector("#temp-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date-time");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  currentTemp.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  tempDescription.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "1fd12663f5175c8f043543ba07cbd1c5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemp);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Pärnu");
