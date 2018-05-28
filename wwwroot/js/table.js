var myapp = angular.module("myapp", []);

myapp.controller("ApiController", function($scope, $http){
// Har en funktion redo för att gömma och vissa information
    $scope.going = false;

$scope.goEvent = function(){
   $scope.going = !$scope.going;
   if($scope.going){  
       $scope.go();
   }else{
       $scope.stop();
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

            $scope.timeChange = function(timeinmin){

                let hours = parseInt(timeinmin/60);
                let minutes = timeinmin%60;

                let timeToDestination = hours + "h "+ minutes + "min";

                return timeToDestination;
            }

            $scope.setIcon = function(inComingNumber){

                let icon =" ";
                
                switch (inComingNumber){
                    case inComingNumber = 0 : 
                    icon = "fas fa-train fa-2x";
                    break;
                    case inComingNumber = 1 :
                    icon = "fas fa-plane fa-2x";
                    break;
                    case inComingNumber = 2 :
                    icon = "fas fa-bus fa-2x";
                    break;
                    case inComingNumber = 3 :
                    icon = "fas fa-bus fa-2x";
                    break;
                    case inComingNumber = 4 :
                    icon = "fas fa-car fa-2x";
                    break;
                    case inComingNumber = 5 :
                    icon = "fas fa-camera-retro fa-2x";
                    break;
                    case inComingNumber = 6 :
                    icon = "fas fa-camera-retro fa-2x";
                    break;
                    case inComingNumber = 7 :
                    icon = "fas fa-camera-retro fa-2x";
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