//33ab05142e62d332c43e4a6bd89e6df3 weather API key
var map;
var lat_;
var lon_;
var popup;
let idValue;
let currentWeather;

document.addEventListener("DOMContentLoaded", (event) => {
	showPosition();
	
  });
function centerMap() {
	map.setView([lat_, lon_], 19);
};
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

			map = L.map('map-main').setView([lat_, lon_], 19);
			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 20,
				minZoom:18,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(map);
			//Current Location
			L.marker([lat_, lon_]).addTo(map).bindPopup("You Are Here").openPopup();
			
			map.on('click', onMapClick)

			var fields = [
				{lat: 12.5898727551881, lng: 106.92497569790845, fieldNum: 1},
				{lat: 12.589786370543436, lng: 106.92496228686365, fieldNum: 2},
				{lat: 12.58969736815183, lng: 106.92494082919198, fieldNum: 3},
				{lat: 12.589699985869677, lng: 106.92481476537091, fieldNum: 4},
				{lat: 12.589621454322831, lng: 106.9247638034007, fieldNum: 5},
				{lat: 12.589587423978399, lng: 106.92494887581887, fieldNum: 6},
				{lat: 12.58953506959354, lng: 106.92477989665444, fieldNum: 7},
				{lat: 12.589592659416292, lng: 106.92458945981836, fieldNum: 8},
				{lat: 12.58975495793816, lng: 106.92460555307213, fieldNum: 9},
				{lat: 12.589857048891245, lng: 106.92475843898278, fieldNum: 10},
				{lat: 12.590021964960393, lng: 106.92489523163968, fieldNum: 11},
				{lat: 12.590050759818737, lng: 106.92477185002757, fieldNum: 12},
				{lat: 12.590228764325854, lng: 106.92483622304258, fieldNum: 13},
				{lat: 12.590377973891067, lng: 106.9247691678186, fieldNum: 14},
				{lat: 12.590268030009332, lng: 106.92465919725129, fieldNum: 15},
				{lat: 12.590134526661004, lng: 106.9246189641169, fieldNum: 16},
				{lat: 12.589987934669088, lng: 106.92459482423628, fieldNum: 17},
				{lat: 12.589891079199903, lng: 106.92447948925104, fieldNum: 18},
				{lat: 12.589839251634079, lng: 106.92460823528107, fieldNum: 19},
				{lat: 12.589476953102275, lng: 106.92458141319148, fieldNum: 20},
				{lat: 12.589587423978399, lng: 106.92440706960916, fieldNum: 21},
				{lat: 12.589741869351837, lng: 106.92441779844499, fieldNum: 22},
				{lat: 12.590032435818703, lng: 106.92443120948978, fieldNum: 23},
				{lat: 12.590160703793956, lng: 106.92445803157938, fieldNum: 24},
				{lat: 12.590273265433693, lng: 106.9244633959973, fieldNum: 25},
			]
			var points = [];
				
			var points = fields.map(function (datum) {
				return L.circleMarker(datum, {radius: 15, fieldNum: datum.fieldNum}).bindPopup("Field Number: " + datum.fieldNum);
			});
				
			var group = L.featureGroup(points);
			group.addTo(map);
				
			group.on("click", function (e) {
				console.log(e.sourceTarget.options.fieldNum);
			});

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
				currentWeather = weatherlist[0].weather[0].main; //This is the current weather stored in a variable, doing .description instead of .main gives you a little more info if you want that
				console.log("This is the current weather: " + currentWeather);
				// notifyWeather();
				setupWeatherWidget();
			})
			
	
		.catch(err => alert(err));
		});
		;
	} else { alert("Sorry, your browser does not support HTML5 geolocation."); }

}
function onMarkerClick(e){
	console.log(e.i);
}
function onMapClick(e) {
	popup = L.popup();
    popup
        .setLatLng(e.latlng)
        .setContent("Would you like to add a field?")
        .openOn(map);
}

function notifyWeather() {
	var phoneNumber = +447549057216;
	var apikey =  "8a8ab1595cce3611ea693ee2130868b23d4d85179lLFmzAiwSaurb66tA1N6pKYE";
	var messagetotext = "The current weather is: " + currentWeather  
	fetch('https://textbelt.com/text', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
		  phone: phoneNumber,
		  message: messagetotext,
		  key: apikey,
		}),
	  }).then(response => {
		return response.json();
	  }).then(data => {
		console.log(data);
	  });
	
}

