let apiKey = "745b025da524f67261b6a7f65eb9dc66"

// Get text from search bar
$("#cityBtn").click(function (event) {
    event.preventDefault()
    let citySearchTerm = $("#city-search-term").val()

    fetchApi(citySearchTerm)
})

function fetchApi(citySearchTerm) {
    // First API call for current weather
    let urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchTerm + "&Appid=" + apiKey + "&units=imperial";

    if (citySearchTerm == "") {
        console.log(citySearchTerm);
    } else {
        $.ajax({
            url: urlCurrent,
            method: "GET"
        })
            .then(function () {
                fetch(urlCurrent)
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        // Local Storage
                        var storedCities = JSON.parse(localStorage.getItem("newCity")) || []
                        let storedCitiesUpper = JSON.stringify(storedCities).toUpperCase()
                        let citySearchTermUpper = JSON.stringify(citySearchTerm).toUpperCase()
                        
                        if (storedCitiesUpper.indexOf(citySearchTermUpper) == -1) {
                            storedCities.push(citySearchTerm);
                            window.localStorage.setItem("newCity", JSON.stringify(storedCities));
                            var searchedCityBtn = document.createElement('button')
                            $(searchedCityBtn).text(citySearchTerm)
                            $("#searched-cities").prepend(searchedCityBtn)
                        }
                
                        // Separate API call for forecasted weather
                        let urlForecast = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&appid=' + apiKey + '&units=imperial'
                        fetch(urlForecast)
                            .then(function (responseUvi) {
                                return responseUvi.json();
                            })
                            .then(function (dataForecast) {
                                // Display current weather
                                var milliseconds = new Date(data.dt * 1000);
                                var currentDate = milliseconds.toLocaleDateString();
                                var textDisplay = data.name + " (" + currentDate + ")"
                                $("#cityDisplay").text(textDisplay)
                                $("#temp").text(data.main.temp + "°F")
                                $("#wind").text(data.wind.speed + " MPH")
                                $("#humidity").text(data.main.humidity + "%")
                                $("#uvIndex").text(dataForecast.current.uvi)

                                // UV Index Color Coding
                                if (dataForecast.current.uvi < 3) {
                                    $("#uvIndex").addClass("uv-low")
                                    $("#uvIndex").removeClass("uv-moderate")
                                    $("#uvIndex").removeClass("uv-high")
                                    $("#uvIndex").removeClass("uv-very-high")
                                    $("#uvIndex").removeClass("uv-extreme")
                                }
                                else if (dataForecast.current.uvi >= 3 && dataForecast.current.uvi < 6) {
                                    $("#uvIndex").removeClass("uv-low")
                                    $("#uvIndex").addClass("uv-moderate")
                                    $("#uvIndex").removeClass("uv-high")
                                    $("#uvIndex").removeClass("uv-very-high")
                                    $("#uvIndex").removeClass("uv-extreme")
                                }
                                else if (dataForecast.current.uvi >= 6 && dataForecast.current.uvi < 8) {
                                    $("#uvIndex").removeClass("uv-low")
                                    $("#uvIndex").removeClass("uv-moderate")
                                    $("#uvIndex").addClass("uv-high")
                                    $("#uvIndex").removeClass("uv-very-high")
                                    $("#uvIndex").removeClass("uv-extreme")
                                }
                                else if (dataForecast.current.uvi >= 8 && dataForecast.current.uvi < 11) {
                                    $("#uvIndex").removeClass("uv-low")
                                    $("#uvIndex").removeClass("uv-moderate")
                                    $("#uvIndex").removeClass("uv-high")
                                    $("#uvIndex").addClass("uv-very-high")
                                    $("#uvIndex").removeClass("uv-extreme")
                                }
                                else if (dataForecast.current.uvi >= 11) {
                                    $("#uvIndex").removeClass("uv-low")
                                    $("#uvIndex").removeClass("uv-moderate")
                                    $("#uvIndex").removeClass("uv-high")
                                    $("#uvIndex").removeClass("uv-very-high")
                                    $("#uvIndex").addClass("uv-extreme")
                                }

                                // Emoji for Current Weather
                                if (data.weather[0].main === "Clear") {
                                    $("#cityDisplay").text(textDisplay + "☀️")
                                }
                                else if (data.weather[0].main === "Clouds") {
                                    $("#cityDisplay").text(textDisplay + "☁️")
                                }
                                else if (data.weather[0].main === "Rain") {
                                    $("#cityDisplay").text(textDisplay + "🌧️")
                                }
                                else if (data.weather[0].main === "Snow") {
                                    $("#cityDisplay").text(textDisplay + "❄️")
                                }

                                // Weather for 5 Day Forecast
                                let emoji = [];
                                let millisecondsForecast = []
                                let currentDateForecast = []
                                let textDisplayForecast = []
                                for (var i = 1; i < 6; i++) {
                                    millisecondsForecast[i] = new Date(dataForecast.daily[i].dt * 1000);
                                    currentDateForecast[i] = millisecondsForecast[i].toLocaleDateString();
                                    textDisplayForecast[i] = currentDateForecast[i]
                                    $("#day1").text(textDisplayForecast[1])
                                    $("#day2").text(textDisplayForecast[2])
                                    $("#day3").text(textDisplayForecast[3])
                                    $("#day4").text(textDisplayForecast[4])
                                    $("#day5").text(textDisplayForecast[5])

                                    if (dataForecast.daily[i].weather[0].main === "Clear") {
                                        emoji[i] = "☀️"
                                    }
                                    else if (dataForecast.daily[i].weather[0].main === "Clouds") {
                                        emoji[i] = "☁️"
                                    }
                                    else if (dataForecast.daily[i].weather[0].main === "Rain") {
                                        emoji[i] = "🌧️"
                                    }
                                    else if (dataForecast.daily[i].weather[0].main === "Snow") {
                                        emoji[i] = "❄️"
                                    }
                                    $("#day1Weather").text(emoji[1])
                                    $("#day2Weather").text(emoji[2])
                                    $("#day3Weather").text(emoji[3])
                                    $("#day4Weather").text(emoji[4])
                                    $("#day5Weather").text(emoji[5])
                                }
                                $("#temp1").text(dataForecast.daily[1].temp.day + "°F")
                                $("#wind1").text(dataForecast.daily[1].wind_speed + " MPH")
                                $("#humidity1").text(dataForecast.daily[1].humidity + "%")

                                $("#temp2").text(dataForecast.daily[2].temp.day + "°F")
                                $("#wind2").text(dataForecast.daily[2].wind_speed + " MPH")
                                $("#humidity2").text(dataForecast.daily[2].humidity + "%")

                                $("#temp3").text(dataForecast.daily[3].temp.day + "°F")
                                $("#wind3").text(dataForecast.daily[3].wind_speed + " MPH")
                                $("#humidity3").text(dataForecast.daily[3].humidity + "%")

                                $("#temp4").text(dataForecast.daily[4].temp.day + "°F")
                                $("#wind4").text(dataForecast.daily[4].wind_speed + " MPH")
                                $("#humidity4").text(dataForecast.daily[4].humidity + "%")

                                $("#temp5").text(dataForecast.daily[5].temp.day + "°F")
                                $("#wind5").text(dataForecast.daily[5].wind_speed + " MPH")
                                $("#humidity5").text(dataForecast.daily[5].humidity + "%")
                            })
                    })
            })
    }
}

// Display previously searched cities from local storage
var displayCities = JSON.parse(localStorage.getItem("newCity")) || []

for (var i = 0; i < displayCities.length; i++) {
    var cityButton = document.createElement('button')
    $(cityButton).text(displayCities[i])
    $("#searched-cities").prepend(cityButton)
}

const wrapper = document.getElementById('searched-cities');

// Added click function to previously searched cities
wrapper.addEventListener('click', (eventCity) => {
    const isButton = eventCity.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
    }
    let historyCity = eventCity.target.textContent
    fetchApi(historyCity)
})

// Clear previously searched cities
$("#clearBtn").on("click", function () {
    localStorage.clear()
})