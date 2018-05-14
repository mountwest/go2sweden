$(document).ready(function () {

    $('#apisearch').on('click', function () {

        var data =
            {
                fromDestination: $('#fromDestination').val().trim(),
                toDestination: $('#toDestination').val().trim(),
            };

        if (data.fromDestination !== '' && data.toDestination !== '') {
            $.ajax(
                {
                    url: 'http://free.rome2rio.com/api/1.4/json/Search?key=S2Q8spaR&oName=' + data.fromDestination + '&dName=' + data.toDestination + '&noRideshare',
                    type: 'GET',
                    dataType: "json",
                    processData: false,
                    cache: false
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    alert("Something went wrong (" + textStatus + ")");
                }).done(function (result, textStatus, jqXHR) {
                    let names = result.routes;
                    $("#names").empty();
                    return names.map(function (city) {
                        $('#names').append('<li><span>' + city.name + " " + city.totalDuration + '</span></li>' );
                    })
                });
        }
    });

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


