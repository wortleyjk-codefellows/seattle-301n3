// function initMap() {
//   // Create a map object and specify the DOM element for display.
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 47.611435, lng: -122.330456},
//     scrollwheel: true,
//     zoom: 8
//   });

//   // TODO (DONE): Follow the Google Maps API docs to create markers on the map based on the search options on the home page.
//   var marker = new google.maps.Marker({
//     position: myLatLng,
//     map: map,
//     title: 'Hello World!'
//   });
// }
function initMap(locationData) {
  //this defaults to somewhere in Australia!!!
  console.log(locationData);
  if(locationData == undefined){
    locationData = [{
      longitude : 131.044,
      latitude : -25.363,
      title : 'somwhere',
      population: "a lot"
    }]
  }
  var myLatLng = {lat: locationData[0].latitude, lng: locationData[0].longitude};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: myLatLng
  });
  locationData.forEach(function(elem){
    var marker = new google.maps.Marker({
      position : {lat: elem.latitude,lng: elem.longitude},
      map: map,
      title: elem.city,
      population: elem.population
    });
  })
}
