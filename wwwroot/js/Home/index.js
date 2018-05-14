$(document).ready(function () {

    $('#apisearch').on('click', function () {
        alert('click');
                
        function append(parent, el) {
            return parent.appendChild(el);
        }

        var data =
            {
                fromDestination: $('#fromDestination').val().trim(),
                toDestination: $('#toDestination').val().trim()
            };

        if (data.fromDestination !== '' && data.toDestination !== '') {
            $.ajax(
                {
                    url: 'http://free.rome2rio.com/api/1.4/json/Search?key=S2Q8spaR&oName=' + data.fromDestination + '&dName=' + data.toDestination + '&noRideshare',
                    data: JSON.stringify(data),
                    type: 'POST',
                    contentType: "application/json; charset=utf-8",
                    processData: false,
                    cache: false
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    helper.ajaxError(jqXHR, textStatus, errorThrown, this.url, this.data);
                }).done(function (result, textStatus, jqXHR) {
                    'localhost:5000/search'.format(jsContext.rootURL);
                });

            const ul = document.getElementById('names');

            fetch(url)
                .then((resp) => resp.json())
                .then(function (data) {
                    let names = data.routes;
                    return names.map(function (city) {
                        let li = createNode('li'),
                            span = createNode('span');
                        span.innerHTML = `${city.name} ${city.totalDuration}`;
                        append(li, span);
                        append(ul, li);
                    })
                })
                .catch(function (error) {
                    console.log(JSON.stringify(error));
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


