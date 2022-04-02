let apiKey = "745b025da524f67261b6a7f65eb9dc66"
let citySearchTerm = "Phoenix"

// $("#cityBtn").click(function () {
//     let citySearchTerm = $("#city-search-term").val()
//     let urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchTerm + "&Appid=" + apiKey + "&units=imperial";
//     console.log(citySearchTerm)
//     if (citySearchTerm == "") {
//         console.log(citySearchTerm);
//     } else {
//         $.ajax({
//             url: urlCurrent,
//             method: "GET"
//         }).then(function (response) {
// })

let url = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchTerm + "&Appid=" + apiKey + "&units=imperial"

fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let urlUvi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&appid=' + apiKey + '&units=imperial'
        fetch(urlUvi)
            .then(function (responseUvi) {
                return responseUvi.json();
            })
            .then(function (dataForecast) {
                var milliseconds = new Date(data.dt * 1000);
                var currentDate = milliseconds.toLocaleDateString();
                // var cityName = data.timezone.split("/")
                var textDisplay = data.name + " (" + currentDate + ")"
                $("#cityDisplay").text(textDisplay)
                $("#temp").text(data.main.temp + "°F")
                $("#wind").text(data.wind.speed + " MPH")
                $("#humidity").text(data.main.humidity + "%")
                $("#uvIndex").text(dataForecast.current.uvi)
                console.log(dataForecast)

                // UV Index Color Coding
                if (dataForecast.current.uvi < 3) {
                    $("#uvIndex").addClass("uv-low")
                }
                else if (dataForecast.current.uvi >= 3 && dataForecast.current.uvi < 6) {
                    $("#uvIndex").addClass("uv-moderate")
                }
                else if (dataForecast.current.uvi >= 6 && dataForecast.current.uvi < 8) {
                    $("#uvIndex").addClass("uv-high")
                }
                else if (dataForecast.current.uvi >= 8 && dataForecast.current.uvi < 11) {
                    $("#uvIndex").addClass("uv-very-high")
                }
                else if (dataForecast.current.uvi >= 11) {
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



