var myapp = angular.module("myapp", []);

myapp.controller("ApiController", function($scope, $http){
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


    $scope.getData = function(){

    let from = $scope.depatureDestination;
    let to = $scope.arrivalDestination;
    console.log(from);
    
    $http.get('http://free.rome2rio.com/api/1.4/json/Search?key=S2Q8spaR&oName=' + from + '&dName=' + to + '&noRideshare')
        .then(function (response){
            $scope.result = response.data;
            $scope.routes = response.data.routes;
            $scope.vehicles = response.data.vehicles;

            $scope.daniel = "buffered";
            

            $scope.timeChange = function(timeinmin){



                let hours = parseInt(timeinmin/60);
                let minutes = timeinmin%60;

                let timeToDestination = hours + "h "+ minutes + "min";

                return timeToDestination;

                
            }

          
           

        })
    }

})