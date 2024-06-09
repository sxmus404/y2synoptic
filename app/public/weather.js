function setupWeatherWidget() {
    window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  
    window.windowID = 11;
    window.cityID = idValue;
    window.appID = '93b803fddcaf9fac244d7f72437b87f7';
    window.containerID = 'openweathermap-widget-11';
    window.myWidgetParam.push({
        id: windowID,
        cityid: cityID,
        appid: appID,
        units: 'metric',
        containerid: containerID
    });  
    (function() {
        var script = document.createElement('script');script.async = true;script.charset = "utf-8";
        script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
        var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);
      })();    
}
