const apiKey = "7816d9f235c88adc096427a68ca872f2";
const units = "metric";

const inputElement = document.getElementById("input-element");
const buttonElement = document.getElementById("button-element");
const nameElement = document.getElementById("name-element");
const outputElement = document.getElementById("output-element");
const iconElement = document.getElementById("icon-element");
const descriptionElement = document.getElementById("description-element");
const forecastElement = document.getElementById("forecast-element");

buttonElement.addEventListener('click', function () {
    const userInput = inputElement.value;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${userInput}&appid=${apiKey}&units=${units}`;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            forecastElement.innerHTML = "";
            let city = data.city.name;
            let temp = data.list[0].main.temp;
            let description = data.list[0].weather[0].main;
            let iconID = data.list[0].weather[0].icon;
            let iconURL = `https://openweathermap.org/img/wn/${iconID}@2x.png`;

            nameElement.innerText = `${city}`;
            outputElement.innerText = `${temp}°C`;
            iconElement.src = iconURL;
            descriptionElement.innerText = description;

            for (let i = 7; i < data.list.length; i += 8) {
                let futureTemp = data.list[i].main.temp;
                let futureDescription = data.list[i].weather[0].main;
                let futureIconID = data.list[i].weather[0].icon;
                let futureIconURL = `https://openweathermap.org/img/wn/${futureIconID}@2x.png`;
                let dateTime = data.list[i].dt;
                let day = new Date(dateTime * 1000).toLocaleDateString("en-GB", { weekday: 'long' });

                let htmlString = `
                    <div class="col">
                        <h3>${day}</h3>
                        <h2>${futureTemp}°C</h2>
                        <img src="${futureIconURL}">
                        <h3>${futureDescription}</h3>
                    </div>
                `;
                forecastElement.innerHTML += htmlString;
            }
        });
});