var myapp = angular.module("myapp", []);

myapp.controller("ApiController", function ($scope, $http) {
    // Har en funktion redo för att gömma och vissa information
    //     $scope.going = false;

    // $scope.goEvent = function(){
    //    $scope.going = !$scope.going;
    //    if($scope.going){  
    //        $scope.go();
    //    }else{
    //        $scope.stop();
    //    }      
    // }

    $scope.r2Rdata = {};
    $scope.map = {};
    $scope.markers = [];
    $scope.polylines = [];
    $scope.LatitudeLongitude = [];

    $scope.getData = function () {

        let from = $scope.depatureDestination;
        let to = $scope.arrivalDestination;
        console.log(from);

        $http.get('http://free.rome2rio.com/api/1.4/json/Search?key=S2Q8spaR&oName=' + from + '&dName=' + to + '&noRideshare')
            .then(function (response) {
                $scope.r2Rdata = response.data;
                $scope.routes = response.data.routes;
                $scope.vehicles = response.data.vehicles;

                var startLatLng = new google.maps.LatLng($scope.r2Rdata.places[0].lat, $scope.r2Rdata.places[0].lng);
                var endLatLng = new google.maps.LatLng($scope.r2Rdata.places[1].lat, $scope.r2Rdata.places[1].lng);
                console.log($scope.r2Rdata);

                addPlaces($scope.r2Rdata.places);
                calculateAndDisplayRoute(directionsService, directionsDisplay, startLatLng, endLatLng);
                setPolylineStarterFunction($scope.r2Rdata);

                $scope.timeChange = function (timeinmin) {

                    let hours = parseInt(timeinmin / 60);
                    let minutes = timeinmin % 60;
                    let timeToDestination = hours + "h " + minutes + "min";

                    return timeToDestination;
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

})