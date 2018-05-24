$(document).ready(function () {

//     $('#apisearch').on('click', function () {

        

//         var data =
//             {
//                 fromDestination: $('#fromDestination').val().trim(),
//                 toDestination: $('#toDestination').val().trim(),
//             };

//         if (data.fromDestination !== '' && data.toDestination !== '') {
//             $.ajax(
//                 {
//                     url: 'http://free.rome2rio.com/api/1.4/json/Search?key=S2Q8spaR&oName=' + data.fromDestination + '&dName=' + data.toDestination + '&noRideshare',
//                     type: 'GET',
//                     dataType: "json",
//                     processData: false,
//                     cache: false
//                 }).fail(function (jqXHR, textStatus, errorThrown) {
//                     alert("Something went wrong (" + textStatus + ")");
//                 }).done(function (result, textStatus, jqXHR) {
//                     let names = result.routes;
                    
//                     $("#names").empty();
//                     return names.map(function (city) {

//                     // var i, j = "";
                        
//                     // for (i = 0; i < city[i].segments; i++) {

//                     //     for(j= 0; j < segments[j].lenght; j++){
                                 
//                     //     }
//                     // }

//                     var transNumber = city.segments[0].vehicle;
                
//                     for (j = 0; j < names.length; j++){
//                         // for (x = 0; x < city.segments.length; x++){
//                     $('#names > tbody:last-child').append('<tr><td>' + names[j].name + "</td><td>" + parseInt(city.totalDuration/60) + "h " + (city.totalDuration%60) + "min" + "</td><td>" + city.indicativePrices[0].price + " " + city.indicativePrices[0].currency + "</td><td>" + result.vehicles[j].name + '</td></tr>');
                    
                
//                 }})
                
//                 });
//         }


//         if (data.fromDestination !== '' && data.toDestination !== '') {
//             $.ajax(
//                 {
//                     url: 'http://free.rome2rio.com/api/1.4/json/Search?key=S2Q8spaR&oName=' + data.fromDestination + '&dName=' + data.toDestination + '&noRideshare',
//                     type: 'GET',
//                     dataType: "json",
//                     processData: false,
//                     cache: false
//                 }).fail(function (jqXHR, textStatus, errorThrown) {
//                     alert("Something went wrong (" + textStatus + ")");
//                 }).done(function (transportresult, textStatus, jqXHR) {
                    
//                     let transportmode = transportresult.routes;
//                     // let transportmode = transportresult.routes;
//                     $("#transportmode").empty();
//                     // $('#transportmode > tbody:last-child').append('<tr><td>' + transportresult.vehicles[0].name + '</td><td>');
//                 return transportmode.map(function (tmode) {
                  
//                // $('#transportmode > tbody:last-child').append('<tr><td>' + transportresult.vehicles[0].name + '</td><td>');
//                 $('#transportmode > tbody:last-child').append('<tr><td>' + tmode.segments[0].vehicle + '</td><td>');
//                  })
//                 });
//         }
//     });

    $(".scroll").click(function (event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top
        }, 1000);
    });

    $().UItoTop({
        easingType: 'easeOutQuart'
    });

    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items: 3,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 1000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    $('.play').on('click', function () {
        owl.trigger('play.owl.autoplay', [1000])
    });

    $('.stop').on('click', function () {
        owl.trigger('stop.owl.autoplay')
    });

    
});

angular.module("myApp" , []).controller("myCtrl", function($scope){
    $scope.produkter = [
        {id:'', namn:'', pris:8000},
        {id:'', namn:'', pris:9000},
        {id:'', namn:'', pris:5000},
        {id:'', namn:'', pris:12000},
        {id:'', namn:'', pris:15000},
    ] ;
    $scope.orderByMe = function(x , desc=false){
        $scope.myOrderBy = x;
        // Lägg till "-" för att sortera stigande (högsta pris högst upp)
        if(desc){
            $scope.myOrderBy = "-" + x;
        }
    }
})