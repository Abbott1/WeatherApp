window.addEventListener('load', ()=> {
   let long;
   let lat;
   let temperatureDescription = document.querySelector('.temp-description');
   let temperatureDegree = document.querySelector('.temp-degree');
   let locationTimezone = document.querySelector('.location-timezone');


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition
        (position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            //review video for proxy
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/d203a27fe82f04866e1641f8377f5256/${lat},${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                //Set DOM Elements from the API
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;
                //Set Icon
                setIcons(icon, document.querySelector(".icon"));
            });
        });
    }
 // broken at this point time=34:09 link = https://www.youtube.com/watch?v=wPElVpR1rwA&t=1206s
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, skycons[currentIcon]);
    }
});