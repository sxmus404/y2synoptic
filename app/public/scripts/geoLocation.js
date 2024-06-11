//33ab05142e62d332c43e4a6bd89e6df3 weather API key
var map;
var lat_;
var lon_;
var popup;
let idValue;
let currentWeather;
const fieldLat = [12.5898727551881,12.589786370543436,12.58969736815183,12.589699985869677,12.589621454322831,
	12.589587423978399,12.58953506959354,12.589592659416292,12.58975495793816,12.589857048891245,12.590021964960393,
	12.590050759818737,12.590228764325854,12.590377973891067,12.590268030009332,12.590134526661004,12.589987934669088,
	12.589891079199903,12.589839251634079,12.589476953102275,12.589587423978399,12.589741869351837,12.590032435818703,
	12.590160703793956,12.590273265433693]
const fieldLon = [106.92497569790845,106.92496228686365, 106.92494082919198, 106.92481476537091, 106.9247638034007, 
	106.92494887581887, 106.92477989665444, 106.92458945981836, 106.92460555307213, 106.92475843898278, 106.92489523163968
	, 106.92477185002757, 106.92483622304258, 106.9247691678186, 106.92465919725129, 106.9246189641169, 106.92459482423628
	, 106.92447948925104, 106.92460823528107, 106.92458141319148, 106.92440706960916, 106.92441779844499, 106.92443120948978
	, 106.92445803157938, 106.9244633959973]
	
document.addEventListener("DOMContentLoaded", (event) => {
	showPosition();
  });

function showPosition() {
	if(navigator.geolocation) {
		var container = L.DomUtil.get('map-main');
		if(container != null){ container._leaflet_id = null; }
		// Map
      	navigator.geolocation.getCurrentPosition( function(position) {
			// current location
			// lat_ = position.coords.latitude;
			// lon_ = position.coords.longitude;

			// Pu Ngaol
			lat_ = 12.58973689927903;
			lon_ = 106.925101118714666;
			var positionInfo = "Your current position is (" + "Latitude: " + lat_ + ", " + "Longitude: " + lon_ + ")";
			document.getElementById("map-result").innerHTML = positionInfo;
			map = L.map('map-main').setView([position.coords.latitude, position.coords.longitude], 19);
			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 50,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(map);
			var currentLocation = L.marker([lat_, lon_]).addTo(map).bindPopup("You Are Here").openPopup();

			for (let i = 0; i < fieldLat.length; i++) {
				L.marker([fieldLat[i],fieldLon[i]]).addTo(map).bindPopup("Field Number: " + (i + 1).toString())
			  }

			map.on('click', onMapClick);
		
			console.log(lat_ + "//" + lon_);
			
			// Weather
			fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat_+'&lon='+lon_+'&appid=93b803fddcaf9fac244d7f72437b87f7') //API KEY ERROR, WILL WAIT AS MIGHT BE USING TO OFTEN
			.then(response => response.json())
			.then(data => { 
				console.log(data);
				var cityData = data['city'];
				let weatherlist = data['list'];
				idValue = cityData['id'];
				console.log(idValue);
				currentWeather = weatherlist[0].weather[0].main //This is the current weather stored in a variable, doing .description instead of .main gives you a little more info if you want that
				console.log("This is the current weather: " + currentWeather)
				setupWeatherWidget()
			})
	
		.catch(err => alert(err));
		});
		;
	} else { alert("Sorry, your browser does not support HTML5 geolocation."); }

}
function onMapClick(e) {
	console.log(e.latlng)
	popup = L.popup();
    popup
        .setLatLng(e.latlng)
        .setContent("Would you like to add a field?")
        .openOn(map);
}
