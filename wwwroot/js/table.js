var myapp = angular.module("myapp", []);

myapp.controller("ApiController", function($scope, $http){
// Har en funktion redo för att gömma och vissa information
//     $scope.going = false;

$scope.goEvent = function(){
   $scope.going = !$scope.going;
   if($scope.going){  
       $scope.go();
   }else{
       $scope.stop();
   }      
}
$scope.showTrip = false;

$scope.tripShow = function(){
   $scope.showTrip = !$scope.showTrip;
   if($scope.showTrip){  
       $scope.show();
   }else{
       $scope.hide();
   }      
}

    $scope.getData = function(){

    let from = $scope.depatureDestination;
    let to = $scope.arrivalDestination;
    console.log(from);
    
    $http.get('http://free.rome2rio.com/api/1.4/json/Search?key=S2Q8spaR&oName=' + from + '&dName=' + to + '&noRideshare')
        .then(function (response){
            $scope.result = response.data;
            $scope.routes = response.data.routes;
            $scope.vehicles = response.data.vehicles;
            $scope.places = response.data.places;

            $scope.daniel = "buffered";
            
            $scope.toDest = function(){
                let toDesti = " to " +  to;
                return toDesti;
            }

            $scope.timeChange = function(timeinmin){



                let hours = parseInt(timeinmin/60);
                let minutes = timeinmin%60;
                let timeToDestination ;

                 hours < 1 ? timeToDestination = minutes + "min" : timeToDestination = hours + "h "+ minutes + "min";

                return timeToDestination;
            }
            $scope.timeTransfer = function(timeinmin){

                let hours = parseInt(timeinmin/60);
                let minutes = timeinmin%60;
                let timeToDestination ;

                if (hours < 1 && minutes < 1){
                    timeToDestination = " ";
                
                }else if (hours < 1 && minutes >= 1 ){
                    timeToDestination = "Transfer time : " + minutes + "min" ;
                }else
                {
                    timeToDestination =  "Transfer time : " + hours + "h "+ minutes + "min";
                }

                return timeToDestination;
            }

            $scope.setIcon = function(transporKind){

                let icon =" ";
                
                
                switch (transporKind){
                    case transporKind = "train" : 
                    icon = "fas fa-train fa-2x";
                    break;
                    case transporKind = "plane" :
                    icon = "fas fa-plane fa-2x";
                    break;
                    case transporKind = "bus" :
                    icon = "fas fa-bus fa-2x";
                    break;
                    case transporKind = "night bus" :
                    icon = "fas fa-bus fa-2x";
                    break;
                    case transporKind = "car":
                    icon = "fas fa-car fa-2x";
                    break;
                    case transporKind = "shuttle" :
                    icon = "fas fa-bus fa-2x";
                    break;
                    case transporKind = "taxi" :
                    icon = "fas fa-taxi fa-2x";
                    break;
                    case transporKind = "towncar" :
                    icon = "fab fa-uber fa-2x";
                    break;
                    case transporKind = "foot" :
                    icon = "fas fa-walking fa-2x";
                    break;
                    case transporKind = "subway" :
                    icon = "fas fa-subway fa-2x";
                    break;
                    case transporKind = "tram" :
                    icon = "fas fa-train fa-2x";
                    break;
                    case transporKind = "ferry" :
                    icon = "fas fa-ship fa-2x";
                    break;
                    default: ;
                    icon = "ooops "  
                    break;
                    
                }

               return icon;
                
            }

          
           

        })
    }

})

myapp.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
});