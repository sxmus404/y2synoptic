//33ab05142e62d332c43e4a6bd89e6df3 weather API key
function showPosition() {

	var lat_;
	var lon_;
	if(navigator.geolocation) {
		var container = L.DomUtil.get('map-main');
		if(container != null){ container._leaflet_id = null; }

      	navigator.geolocation.getCurrentPosition( function(position) {
			lat_ = position.coords.latitude;
			lon_ = position.coords.longitude;
			var positionInfo = "Your current position is (" + "Latitude: " + lat_ + ", " + "Longitude: " + lon_ + ")";
			document.getElementById("map-result").innerHTML = positionInfo;
			var map = L.map('map-main').setView([position.coords.latitude, position.coords.longitude], 19);
			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 50,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(map);
			console.log(lat_ + "//" + lon_);
			fetch('https://api.openweathermap.org/data/2.5/forecast?lat='+lat_+'&lon='+lon_+'&appid=93b803fddcaf9fac244d7f72437b87f7') //API KEY ERROR, WILL WAIT AS MIGHT BE USING TO OFTEN
			.then(response => response.json())
			.then(data => { 
				console.log(data);
				var cityData = data['city'];
				var idValue = cityData['id'];
				console.log(idValue);
			})
	
		.catch(err => alert(err));
		});
		

		
		
		;
	} else { alert("Sorry, your browser does not support HTML5 geolocation."); }
}

showPosition();