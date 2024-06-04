function showPosition() {
	if(navigator.geolocation) {
		var container = L.DomUtil.get('map-main');
		if(container != null){ container._leaflet_id = null; }

      	navigator.geolocation.getCurrentPosition( function(position) {
			var positionInfo = "Your current position is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
			document.getElementById("map-result").innerHTML = positionInfo;
			var map = L.map('map-main').setView([position.coords.latitude, position.coords.longitude], 19);
			L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 50,
				attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			}).addTo(map);
		});
	} else { alert("Sorry, your browser does not support HTML5 geolocation."); }
}

showPosition();