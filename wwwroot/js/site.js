
// Write your JavaScript code.
var initZoom = false;
var firstMapId;
var map;
var mapArray = [];
var mapArrayId = [];
var markers = [];
var polylines = [];
var LatitudeLongitude = [];
var bounds = [];
var selectedRoute = 0;
// var path = [];   
var pathArray = [];
var pathArrayList = [];
var pathColor = {
    train: "#00ff00",
    plane: "#fffb00",
    bus: "#0f0000",
    nightbus: "#ff0000",
    car: "#00fff0",
    shuttle: "#570f52",
    taxi: "#8d6360",
    towncar: "#505007",
    foot: "#e05bda",
    subway: "#f06c6c",
    tram: "#22a875",
    ferry: "#7c057c",
};

function setPolylineStarterFunction(r2Rdata, routeId) {

    for (let i = 0; i < pathArray.length; i++) {
        pathArray[i] = null;
    }
    pathArray = [];

    var route = [];
    for (i = 0; i < r2Rdata.routes[routeId].segments.length; i++) {
        var segment = r2Rdata.routes[routeId].segments[i];
        if (segment.segmentKind.match("surface")) {
            var surfaceRoute = [];
            decodedPath = google.maps.geometry.encoding.decodePath(segment.path);
            for (z = 0; z < decodedPath.length; z++) {
                surfaceRoute.push(decodedPath[z]);
            }
            var path = new google.maps.Polyline({
                path: surfaceRoute,
                geodesic: false,
                strokeColor: pathColor[r2Rdata.vehicles[segment.vehicle].kind],
                strokeOpacity: 0.7,
                strokeWeight: 6
            });
            pathArray.push(path);
            path.setMap(mapArray[routeId]);

        } else {
            var airRoute = []
            airRoute.push({ lat: r2Rdata.places[segment.depPlace].lat, lng: r2Rdata.places[segment.depPlace].lng })
            airRoute.push({ lat: r2Rdata.places[segment.arrPlace].lat, lng: r2Rdata.places[segment.arrPlace].lng })
            var path = new google.maps.Polyline({
                path: airRoute,
                geodesic: false,
                strokeColor: pathColor[r2Rdata.vehicles[segment.vehicle].kind],
                strokeOpacity: 0.7,
                strokeWeight: 6
            });
            pathArray.push(path);
            path.setMap(mapArray[routeId]);
        }
    }
    pathArrayList[routeId] = pathArray;
}

function addPlaces(places, routeId) {
    for (let i = 0; i < 2; i++) {
        var myLatlng = new google.maps.LatLng(places[i].lat, places[i].lng);
        addMarker(myLatlng, routeId);
    }
}

// Adds a marker to the map and push to the array.
function addMarker(location, routeId) {
    var marker = new google.maps.Marker({
        animation: google.maps.Animation.DROP,
        position: location,
        size: 5,
        map: mapArray[routeId]
    });
    markers.push(marker);
}

function handlesBounds(place, routeId) {
    bounds = new google.maps.LatLngBounds();
    bounds.extend(new google.maps.LatLng(place[0].lat, place[0].lng));
    bounds.extend(new google.maps.LatLng(place[1].lat, place[1].lng));
    mapArray[routeId].fitBounds(bounds);
}


function clearMapCache() {
    for (i = 0; i < mapArray.length; i++) {
        mapArray[i] = null;
        mapArrayId[i] = null;
    }
    for (i = 0; i < markers.length; i++) {
        markers[i] = null;
    }
    for (let i = 0; i < pathArrayList.length; i++) {
        if (pathArrayList[i] != null) {
            for (let a = 0; a < pathArrayList[i].length; a++) {
                pathArrayList[i][a] = null;
            }
        }
        pathArrayList[i] = null;
    }
    for (let i = 0; i < pathArray.length; i++) {
        pathArray[i] = null;
        
    }
    bounds = null;
    firstMapId = null;
    initZoom = false;
    map = null;
}

// GOOGLE MAPS FUNCTIONS BELOW! :)
function initMap(data, routeId) {
    console.log(routeId);
    let mapOptions = {
        center: new google.maps.LatLng(59.334591, 18.06324),
        zoom: 4,
        styles: [
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
            },
        ]
    };

    map = new google.maps.Map(document.getElementById("go2SwedenMap" + routeId), mapOptions);
    mapArray[routeId] = map;

    setPolylineStarterFunction(data, routeId);
    addPlaces(data.places, routeId);
    handlesBounds(data.places, routeId);

    if (!initZoom) {
        firstMapId = routeId;
        initZoom = true
    } else {
        mapArray[routeId].setZoom(mapArray[firstMapId].zoom);
    }
}