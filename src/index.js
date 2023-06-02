// Function to display the weather information on the page
function showWeather(response) {
  let h1 = document.querySelector("#currentCity");
  let tempNow = document.querySelector("#tempNow");
  let li = document.querySelector("#humidity");
  let windLi = document.querySelector("#wind");
  let descLi = document.querySelector("#description");

  // Extract the relevant data from the response
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;

  // Update the HTML elements with the weather information
  h1.innerHTML = city;
  tempNow.innerHTML = temperature;
  li.innerHTML = humidity;
  windLi.innerHTML = windSpeed;
  descLi.innerHTML = description;
}

// Function to handle the current position
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "539ae10d0214cfc2ca5a52d472b9998d";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  // Retrieve weather information based on the current position
  axios.get(url).then(showWeather);
}

// Event listener for the search form submission
let searchForm = document.querySelector("#form-id");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  let apiKey = "539ae10d0214cfc2ca5a52d472b9998d";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Retrieve weather information based on the city entered in the search form
  axios.get(url).then(showWeather);
});

// Event listener for the "Current" button click
let currentButton = document.querySelector("#current-temp");
currentButton.addEventListener("click", function () {
  // Retrieve the current position and call the showPosition function as the callback
  navigator.geolocation.getCurrentPosition(showPosition);
});
