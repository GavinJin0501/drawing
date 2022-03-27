// global variables
let lat = 40.73631261124923;
let lon = -73.99119620561996;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'air-quality.p.rapidapi.com',
		'X-RapidAPI-Key': 'dc819e7943msh54953fbb42c7dc8p1a5387jsnf6b0091f4393'
	}
};

function setPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    console.log('Updated lat&lon:', lat, lon);
    getAQI();
}


function showError(error) {
    switch (error.code) {

      case error.PERMISSION_DENIED:
        console.log('User denied the request for location');
        break;

      case error.POSITION_UNAVAILABLE:
        console.log('Location info is not available');
        break;

      case error.TIMEOUT:
        console.log('Location request has timed out');
        break;

      case error.UNKNOWN_ERROR:
        console.log('Mysterious location error');
        break;
    }

    getAQI();
}


async function getAQI() {
    let aqi;
    const res = await fetch(`https://air-quality.p.rapidapi.com/current/airquality?lat=${lat}&lon=${lon}`, options);

    if (res.ok) {
        const data = await res.json();
        aqi = data.data[0].aqi;
    }
    
    displayData(aqi);
}

function displayData(aqi) {
    console.log("aqi:", aqi);

    // get the relative element
    const win = document.querySelector(".demo");
    const imgBlueSky = document.querySelector("#blue-sky");
    const pollutedSky = document.querySelector("#polluted-sky");


    // control the color
    let color;
    let brightness;
    let opacity1;
    let opacity2;

    opacity1 = 1 - aqi / 500;
    opacity2 = 1 - opacity1;

    console.log(opacity1, opacity2);

    if (aqi >= 0 && aqi <= 50) {
        color = "green";
        brightness = 1 + (50 - aqi) / 100 * 2;
    }
    else if (aqi <= 100) {
        color = "yellow";
        brightness = 1 + (100 - aqi) / 100 * 2;
    }
    else if (aqi <= 150) {
        color = "orange";
        brightness = 1 + (150 - aqi) / 100 / 2;
    }
    else if (aqi <= 200) {
        color = "red";
        brightness = 1 + (200 - aqi) / 100 * 2;
    }
    else if (aqi <= 300) {
        color = "purple";
        brightness = 1 + (300 - aqi) / 100;
    }
    else {color = "maroon";}


    win.style.backgroundColor = color;
    win.style.filter = `brightness(${brightness})`;
    console.log(imgBlueSky);
    imgBlueSky.style.filter = `brightness(${1 / brightness})`;
    pollutedSky.style.filter = `brightness(${1 / brightness})`;
    imgBlueSky.style.opacity = opacity1;
    pollutedSky.style.opacity = opacity2;
}


function main() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, showError);
    } else {
        getAQI();
    }
}

main();

