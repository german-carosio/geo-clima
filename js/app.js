document.getElementById('clima');

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sucess, error, options);
} else {
    alert('no puedes obtener la geo')
}

var options = {
    EnableHighAccuracy:true, //precisión exacta
    Timeout:500, // tiempo de respuesta medio segundo 500
    MaximunAge:0 //0 es actual
}

function sucess (geolocationPosition) {

    console.log(geolocationPosition);

    let coords = geolocationPosition.coords;
    let lat = coords.latitude;
    let lon = coords.longitude;

    console.log(lat);
    console.log(lon);


    const callApi = async () => {

        try {

            const apiKey = 'e2728e5268143ae78ece43a44588dd5a';
            //units=metric para ver grados centigrados
            const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
    
    
            //fetch con await
            const response = await fetch(url);
    
            //console.log(response);
    
            const data = await response.json();
    
            console.log(data);

            const {name, main:{temp, temp_min, temp_max},weather:[extra]} = data;
            
            console.log(name);
            console.log(temp);
            console.log(temp_min);
            console.log(temp_max);
            console.log(extra.icon);
            console.log(lat);
            console.log(lon);
    
            clima.innerHTML = `
                            <h2>${name}</h2>
                            <img src="https://openweathermap.org/img/wn/${extra.icon}@2x.png" alt="logo-clima">
                            <p>Temperatura: ${temp}°</p>
                            <p>Max: ${temp_max}°</p>
                            <p>Min: ${temp_min}°</p>
                            
                            `
        } catch (error) {
            console.log(error);
        }
    
    }

    callApi();

}

function error(err) {
    alert('Algo salió mal')
    console.warn(err)
}




