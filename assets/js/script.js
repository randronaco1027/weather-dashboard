var citySearchTerm = document.querySelector("#city-search-term")

var getWeatherCity = function (city) {
    //URL TBD
    var apiURL = "https://openweathermap.org/api/one-call-api" + city;

    fetch(apiURL).then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data)
                displayWeather()
            })
        }
    })
}

var displayWeather = function (weather, searchTerm) {
    citySearchTerm.textContent = searchTerm;
    for (var i = 0; i < 5; i++) {
        // Add five days (cards) of weather for that city
    }
}