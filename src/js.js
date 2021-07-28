let now = new Date();
let year = now.getFullYear();
let date = now.getDate();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let minutes = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
let hours = now.getHours() > 12 ? now.getHours() - 12 : now.getHours();
let amPm = now.getHours() >= 12 ? "pm" : "am";

let h2 = document.querySelector("h2");
h2.innerHTML = `${day},  ${date} ${month} ${hours}:${minutes} ${amPm} `;

function defaultCity(city) {
  let apiKey = "456a5de287faeb02ba871a9c7698e2c6";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayCity);
}
defaultCity("Berlin");
function searchCity(event) {
  event.preventDefault();

  let city = document.querySelector("#searchCity").value;

  defaultCity(city);
}
let newCity = document.querySelector("#city-search-form");
newCity.addEventListener("submit", searchCity);

function displayCity(response) {
  console.log(response);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  // currentTemperature = Math.round(response.data.main.temp);
  let showTemperature = document.querySelector("#currentTemp");
  showTemperature.innerHTML = Math.round(response.data.main.temp);
  let minTemp = document.querySelector("#minTemp");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);
  let maxTemp = document.querySelector("#maxTemp");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);
  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
}

// function changeUnit(event) {
//   event.preventDefault();
//   let h3 = document.querySelector("h3");
//   h3.innerHTML = 32;
// }

// // let fahrenheitUnit = document.querySelector("#fahrenheitUnit");
// // fahrenheitUnit.addEventListener("click", changeUnit);

// function changeUnit2(event) {
//   event.preventDefault();
//   let h3 = document.querySelector("h3");
//   h3.innerHTML = 15;
// }

// let celsiusUnit = document.querySelector("#celsiusUnit");
// celsiusUnit.addEventListener("click", changeUnit2);

function showTemperature(response) {
  console.log(response);
  let h1 = document.querySelector("h1");
  let nameCity = response.data.name;
  h1.innerHTML = `${nameCity}`;

  let h3 = document.querySelector("h3");
  let currentTemperature = Math.round(response.data.main.temp);
  h3.innerHTML = `${currentTemperature}`;
}
function showPosition(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "456a5de287faeb02ba871a9c7698e2c6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#currentLocation");
button.addEventListener("click", getCurrentPosition);
