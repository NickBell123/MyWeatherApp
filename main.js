

const api = {
    key: "4dbaf49b84d9809469c0aa09d6b1cd0c",
    baseURL: "http://api.openweathermap.org/data/2.5/",
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', getCity);

function getCity (evt) {
    if( evt.keyCode == 13) {
        getResults(searchBox.value);
        console.log(searchBox.value);
    }
}

function getResults(data){
    fetch(`${api.baseURL}weather?q=${data}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
}
