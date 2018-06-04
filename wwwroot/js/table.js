var myapp = angular.module("myapp", []);

myapp.controller("ApiController", function ($scope, $http) {
    // Har en funktion redo för att gömma och vissa information
    //     $scope.going = false;

    $scope.goEvent = function () {
        $scope.going = !$scope.going;
        if ($scope.going) {
            $scope.go();
        } else {
            $scope.stop();
        }
    }
    $scope.showTrip = false;

    $scope.tripShow = function () {
        $scope.showTrip = !$scope.showTrip;
        if ($scope.showTrip) {
            $scope.show();
        } else {
            $scope.hide();
        }
    }

    $scope.getData = function () {

        let from = $scope.depatureDestination;
        let to = $scope.arrivalDestination;
        
        from = from.replace(", ", "-");

        $http.get('http://free.rome2rio.com/api/1.4/json/Search?key=S2Q8spaR&oName=' + from + '&dName=' + to + '&noRideshare')
            .then(function (response) {
                $scope.r2Rdata = response.data;
                $scope.routes = response.data.routes;
                $scope.vehicles = response.data.vehicles;
                $scope.places = response.data.places;

                $scope.daniel = "buffered";

                $scope.toDest = function () {
                    let toDesti = " to " + to;
                    return toDesti;
                }

                var startLatLng = new google.maps.LatLng($scope.r2Rdata.places[0].lat, $scope.r2Rdata.places[0].lng);
                var endLatLng = new google.maps.LatLng($scope.r2Rdata.places[1].lat, $scope.r2Rdata.places[1].lng);

                addPlaces($scope.r2Rdata.places);
                setPolylineStarterFunction($scope.r2Rdata);

                $scope.timeChange = function (timeinmin) {

                    let hours = parseInt(timeinmin / 60);
                    let minutes = timeinmin % 60;
                    let timeToDestination;

                    hours < 1 ? timeToDestination = minutes + "min" : timeToDestination = hours + "h " + minutes + "min";

                    return timeToDestination;
                }

                $scope.timeTransfer = function (timeinmin) {

                    let hours = parseInt(timeinmin / 60);
                    let minutes = timeinmin % 60;
                    let timeToDestination;

                    if (hours < 1 && minutes < 1) {
                        timeToDestination = " ";

                    } else if (hours < 1 && minutes >= 1) {
                        timeToDestination = "Transfer time : " + minutes + "min";
                    } else {
                        timeToDestination = "Transfer time : " + hours + "h " + minutes + "min";
                    }
                    $scope.timeTransfer = function (timeinmin) {

                        let hours = parseInt(timeinmin / 60);
                        let minutes = timeinmin % 60;
                        let timeToDestination;

                        if (hours < 1 && minutes < 1) {
                            timeToDestination = " ";

                        } else if (hours < 1 && minutes >= 1) {
                            timeToDestination = "Transfer time : " + minutes + "min";
                        } else {
                            timeToDestination = "Transfer time : " + hours + "h " + minutes + "min";
                        }

                        return timeToDestination;
                    }

                    $scope.setIcon = function(transporKind){

                        let icon =" ";
                        
                        console.log("hej!");
                        
                        switch (transporKind){
                            case transporKind = "train" : 
                            icon = "fa fa-train fa-lg train";
                            break;
                            case transporKind = "plane" :
                            icon = "fa fa-plane fa-lg plane";
                            break;
                            case transporKind = "bus" :
                            icon = "fa fa-bus fa-lg bus";
                            break;
                            case transporKind = "night bus" :
                            icon = "fa fa-bus fa-lg nightbus";
                            break;
                            case transporKind = "car":
                            icon = "fa fa-car fa-lg car";
                            break;
                            case transporKind = "shuttle" :
                            icon = "fa fa-car fa-lg shuttle";
                            break;
                            case transporKind = "taxi" :
                            icon = "fa fa-car fa-lg taxi";
                            break;
                            case transporKind = "towncar" :
                            icon = "fa fa-car fa-lg towncar";
                            break;
                            case transporKind = "foot" :
                            icon = "fa fa-car fa-lg foot";
                            break;
                            case transporKind = "subway" :
                            icon = "fa fa-car fa-lg subway";
                            break;
                            case transporKind = "tram" :
                            icon = "fa fa-car fa-lg tram";
                            break;
                            case transporKind = "ferry" :
                            icon = "fa fa-car fa-lg ferry";
                            break;
                            default: ;
                            icon = "ooops "  
                            break;
           
                        }

                        return icon;

                    }

                    $scope.goEvent = function () {
                        $scope.going = !$scope.going;
                        if ($scope.going) {
                            $scope.go();
                        } else {
                            $scope.stop();
                        }
                    }
                    $scope.showTrip = false;

                    $scope.tripShow = function () {
                        $scope.showTrip = !$scope.showTrip;
                        if ($scope.showTrip) {
                            $scope.show();
                        } else {
                            $scope.hide();
                        }
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

})


myapp.directive('googleplace', function () {

    return {
        require: 'ngModel',
        link: function (scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: null
            };

            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            console.log(scope.gPlace);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                scope.$apply(function () {
                    model.$setViewValue(element.val());
                });
            });
        }
    };
})