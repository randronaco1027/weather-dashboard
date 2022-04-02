
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

var lat = "30.267151"
var lon = "-97.743057"
let apiKey = "745b025da524f67261b6a7f65eb9dc66"
let citySearchTerm = "Beijing"

let url = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchTerm + "&Appid=" + apiKey + "&units=imperial"
let urlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearchTerm + "&Appid=" + apiKey + "&units=imperial"


fetch(url)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)

        var milliseconds = new Date(data.dt * 1000);
        var currentDate = milliseconds.toLocaleDateString();
        // var cityName = data.timezone.split("/")
        var textDisplay = data.name + " (" + currentDate + ")"
        $("#cityDisplay").text(textDisplay)
        $("#temp").text(data.main.temp + "°F")
        $("#wind").text(data.wind.speed + " MPH")
        $("#humidity").text(data.main.humidity + "%")

        console.log(data.coord.lat + " " + data.coord.lon)
        let urlUvi = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&appid=' + apiKey + '&units=imperial'
        fetch(urlUvi)
            .then(function (responseUvi) {
                return responseUvi.json();
            })
            .then(function (dataUvi) {
                console.log(dataUvi)
                $("#uvIndex").text(dataUvi.current.uvi)
                // UV Index Color Coding
                if (dataUvi.current.uvi < 3) {
                    $("#uvIndex").addClass("uv-low")
                }
                else if (dataUvi.current.uvi >= 3 && dataUvi.current.uvi < 6) {
                    $("#uvIndex").addClass("uv-moderate")
                }
                else if (dataUvi.current.uvi >= 6 && dataUvi.current.uvi < 8) {
                    $("#uvIndex").addClass("uv-high")
                }
                else if (dataUvi.current.uvi >= 8 && dataUvi.current.uvi < 11) {
                    $("#uvIndex").addClass("uv-very-high")
                }
                else if (dataUvi.current.uvi >= 11) {
                    $("#uvIndex").addClass("uv-extreme")
                }
            })




        // Emoji for Weather
        if (data.weather[0].main === "Clear") {
            console.log("clear sky")
            $("#cityDisplay").text(textDisplay + "☀️")
        }
        else if (data.weather[0].main === "Clouds") {
            console.log("clouds")
            $("#cityDisplay").text(textDisplay + "☁️")
        }
        else if (data.weather[0].main === "Rain") {
            console.log("rain")
            $("#cityDisplay").text(textDisplay + "🌧️")
        }
        else if (data.weather[0].main === "Snow") {
            console.log("snow")
            $("#cityDisplay").text(textDisplay + "❄️")
        }

        fetch(urlForecast)
            .then(function (response) {
                return response.json();
            })
            .then(function (dataForecast) {
                console.log(dataForecast)
                var milliseconds7 = new Date(dataForecast.list[7].dt * 1000);
                var currentDate7 = milliseconds7.toLocaleDateString();
                var textDisplay7 = currentDate7
                $("#day1").text(textDisplay7)
                $("#temp1").text(dataForecast.list[7].main.temp + "°F")
                $("#wind1").text(dataForecast.list[7].wind.speed + " MPH")
                $("#humidity1").text(dataForecast.list[7].main.humidity + "%")

                var milliseconds15 = new Date(dataForecast.list[15].dt * 1000);
                var currentDate15 = milliseconds15.toLocaleDateString();
                var textDisplay15 = currentDate15
                $("#day2").text(textDisplay15)
                $("#temp2").text(dataForecast.list[15].main.temp + "°F")
                $("#wind2").text(dataForecast.list[15].wind.speed + " MPH")
                $("#humidity2").text(dataForecast.list[15].main.humidity + "%")

                var milliseconds23 = new Date(dataForecast.list[23].dt * 1000);
                var currentDate23 = milliseconds23.toLocaleDateString();
                var textDisplay23 = currentDate23
                $("#day3").text(textDisplay23)
                $("#temp3").text(dataForecast.list[23].main.temp + "°F")
                $("#wind3").text(dataForecast.list[23].wind.speed + " MPH")
                $("#humidity3").text(dataForecast.list[23].main.humidity + "%")

                var milliseconds31 = new Date(dataForecast.list[31].dt * 1000);
                var currentDate31 = milliseconds31.toLocaleDateString();
                var textDisplay31 = currentDate31
                $("#day4").text(textDisplay31)
                $("#temp4").text(dataForecast.list[31].main.temp + "°F")
                $("#wind4").text(dataForecast.list[31].wind.speed + " MPH")
                $("#humidity4").text(dataForecast.list[31].main.humidity + "%")

                var milliseconds39 = new Date(dataForecast.list[39].dt * 1000);
                var currentDate39 = milliseconds39.toLocaleDateString();
                var textDisplay39 = currentDate39
                $("#day5").text(textDisplay39)
                $("#temp5").text(dataForecast.list[39].main.temp + "°F")
                $("#wind5").text(dataForecast.list[39].wind.speed + " MPH")
                $("#humidity5").text(dataForecast.list[39].main.humidity + "%")

            })


    });
