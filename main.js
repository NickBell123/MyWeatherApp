
const api = {
    key: "4dbaf49b84d9809469c0aa09d6b1cd0c",
    baseURL: "https://api.openweathermap.org/data/2.5/",
    unsplashKey: "33cb424db5ad6ec2ecdb527c3ba4e6cf13af4599fc8f72b9b869eba3d1ec5028",
    unsplashURL:"https://api.unsplash.com/search/photos?"
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
    .then(function(weather) {
        return weather.json();
    }).then(displayResults); 
    
    fetch(`${api.unsplashURL}query=${data}&client_id=${api.unsplashKey}`)
    .then(function(image){
        return image.json();
    }).then(displayImage);
}

function displayImage(image) {
    console.log(image.results[0].urls.regular);
    let body = document.querySelector('body');
    body.style.backgroundImage = `url('${image.results[0].urls.regular}')`; 
    // `<script>body{background: "url('${image.results[0].urls.regular}')";}</script>`;
    // document.body.style.backgroundImage = `"url()"`;
} 


function displayResults(weather){
    console.log(weather);

    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');

    date.innerText = getDate(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = `${weather.weather[0].main}`;

    let hiLow = document.querySelector('.current .hi-low');
    hiLow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
}

function getDate(d){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

