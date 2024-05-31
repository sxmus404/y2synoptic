function showPosition() {
  console.log("TESAT");
  if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          var positionInfo = "Your current position is (" + "Latitude: " + position.coords.latitude + ", " + "Longitude: " + position.coords.longitude + ")";
          document.getElementById("result").innerHTML = positionInfo;
      });
  } else {
      alert("Sorry, your browser does not support HTML5 geolocation.");
  }
}

showPosition();