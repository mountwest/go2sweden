// Write your JavaScript code.
var map;
var markers = [];
var polylines = [];
var directionsService;
var directionsDisplay;
var LatitudeLongitude = [];
var selectedRoute = 0;
var path;
var pathColor = [
    "#ff0000",
    "#ffff00",
    "#0f0000",
    "#00ff00",
    "#00fff0",
    "#ff00f0",
    "#f00f00",
    "#f0f000",
    "#ff00f0",
    "#f0f0f0",
    "#ff000f",
    "#f00ff0",
    "#f0ff00",
    "#0f0000",
    "#0f0f00",
    "#ffff00",
    "#ff0f00",
]

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

function calculateAndDisplayRoute(directionsService, directionsDisplay, startLatLng, endLatLng) {
    deleteMarkers();
    directionsService.route({
        origin: startLatLng,
        destination: endLatLng,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {
            console.log("Route response:")
            console.log(response);
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function setPolylineStarterFunction(r2Rdata) {

    if (path != undefined){
        path.setMap(null);
    }

    var route = [];
    for (i = 0; i < r2Rdata.routes[selectedRoute].segments.length; i++) {
        var segment = r2Rdata.routes[selectedRoute].segments[i];
        if (segment.segmentKind.match("surface")) {
            var surfaceRoute = [];
            decodedPath = google.maps.geometry.encoding.decodePath(segment.path);
            for (z = 0; z < decodedPath.length; z++) {
                surfaceRoute.push(decodedPath[z]);
            }
            console.log(r2Rdata);
            path = new google.maps.Polyline({
                path: surfaceRoute,
                geodesic: false,
                strokeColor: pathColor[segment.vehicle],
                strokeOpacity: 1.0,
                strokeWeight: 4
            });
            path.setMap(map);

        } else {
            var airRoute = []
            airRoute.push({ lat: r2Rdata.places[segment.depPlace].lat, lng: r2Rdata.places[segment.depPlace].lng })
            airRoute.push({ lat: r2Rdata.places[segment.arrPlace].lat, lng: r2Rdata.places[segment.arrPlace].lng })
            path = new google.maps.Polyline({
                path: airRoute,
                geodesic: false,
                strokeColor: '#FF00FF',
                strokeOpacity: 1.0,
                strokeWeight: 4
            });
            path.setMap(map);
        }
    }

    // var path = new google.maps.Polyline({
    //     path: route,
    //     geodesic: false,
    //     strokeColor: '#FF00FF',
    //     strokeOpacity: 1.0,
    //     strokeWeight: 4
    // });

    // console.log(path)

    // // calculateAndDisplayRoute(directionsService, directionsDisplay, startLatLng, endLatLng);

    // path.setMap(map);
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
        { name: 'go2swedenMap' });

    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;

    map = new google.maps.Map(document.getElementById("googleMap"), {
        center: new google.maps.LatLng(59.334591, 18.06324),
        zoom: 4,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'go2swedenMap']
        }
    });

    map.mapTypes.set('go2swedenMap', styledMapType);
    map.setMapTypeId('go2swedenMap')

    directionsDisplay.setMap(map);

}