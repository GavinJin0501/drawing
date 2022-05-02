const ghosts = document.querySelectorAll(".svgs");
let lat = 40;
let lon = -73;
let cloudOpacity = 100; // from 0 - 100 <-> opacity: 1 -> 0.5
// 0 -> 1
// 100 -> 0.5 

function changeOpacity() {
    const ratio = 1 - (100-cloudOpacity) / 200;
    ghosts.forEach(g => {
        g.style.opacity = ratio;
    });

    document.body.style.background = `linear-gradient(to left, #ff8100, #ff9a00, #ffc100, #ffdb00, #ffe700 ${ratio*100}%)`;
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("no ");
        changeOpacity();
    }
}

async function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'solcast.p.rapidapi.com',
            'X-RapidAPI-Key': 'dc819e7943msh54953fbb42c7dc8p1a5387jsnf6b0091f4393'
        }
    };
    
    try {
        const response = await fetch(`https://solcast.p.rapidapi.com/radiation/forecasts?api_key=tUEOkEmlpNi9FQO2QAVRgcngLoR-xKcc&latitude=${lat}&longitude=${lon}&format=json`, options);
        const data = await response.json();
        cloudOpacity = (data.forecasts) ? data.forecasts[0].cloud_opacity : 50;
    } catch (error) {
        console.log(error);
    }
    
    console.log(cloudOpacity);

    changeOpacity();
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

    changeOpacity();
}


window.addEventListener("load", getLocation);