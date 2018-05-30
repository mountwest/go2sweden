// Write your JavaScript code.
var map;
var markers = [];
var polylines = [];
var directionsService;
var directionsDisplay;
var LatitudeLongitude = []; 

// function getData() {
// //   var oName = document.getElementById("oDestination").value;
// //   var dName = document.getElementById("toDestinationSelect").value;
// //   var currencyCode = "sv";

//   axios
//     .get("http://free.rome2rio.com/api/1.4/json/Search", {
//       params: {
//         key: "S2Q8spaR",
//         oName: oName,
//         dName: dName,
//         currencyCode: currencyCode
//       }
//     })
//     .then(function(response) {
//       var r2Rdata = response.data;
//       var startLatLng = new google.maps.LatLng(r2Rdata.places[0].lat, r2Rdata.places[0].lng);
//       var endLatLng = new google.maps.LatLng(r2Rdata.places[1].lat, r2Rdata.places[1].lng);
//       console.log(r2Rdata);
//       addPlaces(r2Rdata.places);
//       calculateAndDisplayRoute(directionsService, directionsDisplay, startLatLng, endLatLng);
//       handelATags(r2Rdata);

//       //console.log(r2Rdata.routes[0].segments[0].path);
//       //setPolylineStarterFunction(r2Rdata);

//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// }

function setPolylineStarterFunction(r2Rdata) {
    var dataPath = r2Rdata.routes[0].segments[0].path;
    var dataTest = google.maps.geometry.encoding.decodePath(dataPath);
    var path = new google.maps.Polyline({
        path: dataTest,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    path.setMap(map);
}

function handelATags(r2Rdata) {
  var container = document.getElementById('routeSelect').className = "container mt-5 d-block";
  var displaydiv = document.getElementById('my-list-tab-test');
  while (displaydiv.hasChildNodes()) {
    displaydiv.removeChild(displaydiv.firstChild);
  }
  for (let i = 0; i < r2Rdata.routes.length; i++) {
    var count = i + 1;
    var currentPositionInRoutesArray = r2Rdata.routes[i];
    addingATag(count, currentPositionInRoutesArray);
  }
}

function addingATag(count, currentPositionInRoutesArray) {
  var aTag = document.createElement("A");
  var text = document.createTextNode("Option " + count + ": " + currentPositionInRoutesArray.name);
  aTag.appendChild(text);
  var aClass = document.createAttribute("class");
  aClass.value = "list-group-item list-group-item-action";
  var aId = document.createAttribute("id");
  aId.value = "list-" + "tab" + count + "-list";
  var aDataToggle = document.createAttribute("data-toggle");
  aDataToggle.value = "list";
  var aHref = document.createAttribute("href");
  aHref.value = "#list-" + "tab" + count;
  var aRole = document.createAttribute("role");
  aRole.value = "tab";
  var aAriaControls = document.createAttribute("aria-controls");
  aAriaControls.value = "tab" + count;
  aTag.setAttributeNode(aClass);
  aTag.setAttributeNode(aId);
  aTag.setAttributeNode(aDataToggle);
  aTag.setAttributeNode(aHref);
  aTag.setAttributeNode(aRole);
  aTag.setAttributeNode(aAriaControls);
  document.getElementById('my-list-tab-test').appendChild(aTag);
}

function addPlaces(places) {
  deleteMarkers();
  for (let i = 0; i < 2; i++) {
    var myLatlng = new google.maps.LatLng(places[i].lat, places[i].lng);
    addMarker(myLatlng);
  }
  setMapOnAll(map);
}

// GOOGLE MAPS FUNCTIONS BELOW! :)
function initMap() {

  var styledMapType = new google.maps.StyledMapType(
    [
      {
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#444444"
              }
          ]
      },
      {
          "featureType": "administrative.country",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ff0000"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#fecd01"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": -100
              },
              {
                  "lightness": 45
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#006bab"
              },
              {
                  "visibility": "on"
              }
          ]
      }
    ],
    {name: 'go2swedenMap'});

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  
  map = new google.maps.Map(document.getElementById("googleMap"), {
    center: new google.maps.LatLng(59.334591, 18.06324),
    zoom: 6,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
              'go2swedenMap']
    }
  });

  map.mapTypes.set('go2swedenMap', styledMapType);
  map.setMapTypeId('go2swedenMap')

//   var card = document.getElementById('search-card');
//   var input = document.getElementById('oDestination');

//   map.controls[google.maps.ControlPosition.TOP_CENTER].push(card);

//   setTimeout(function name(params) {
//     card.className = "card text-white bg-primary m-5 d-block";
//   }, 1000);

//   var autocomplete = new google.maps.places.Autocomplete(input);

//   autocomplete.addListener('place_changed', function() {

//     var place = autocomplete.getPlace();
//     if (!place.geometry) {
//       console.log("No details available for input: '" + place.name + "'");
//       return;
//     }

//       map.setCenter(place.geometry.location);
//       console.log(place.geometry.location);
//       map.setZoom(8);
//   });

  directionsDisplay.setMap(map);

}

function calculateAndDisplayRoute(directionsService, directionsDisplay, startLatLng, endLatLng) {
  deleteMarkers();
  directionsService.route({
    origin: startLatLng,
    destination: endLatLng,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      console.log(response);
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

// Adds a marker to the map and push to the array.
function addMarker(location) {
  var marker = new google.maps.Marker({
    animation: google.maps.Animation.DROP,
    position: location,
    map: map
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  setMapOnAll(null);
  markers = [];
}