(function($){

    $(document).ready(function(){

        // ===== Scroll to Top ==== 
        $(window).scroll(function() {

            if ($(this).scrollTop() >= 100) {

                $('#return-to-top').fadeIn(200);

            } else {

                $('#return-to-top').fadeOut(200);
            }
        });

        $('#return-to-top').on('click', function() {

            $('body, html').animate({
                scrollTop: 0
            }, 500);
        });


        // Menu js for Position fixed
        $(window).scroll(function() {

            var window_top = $(window).scrollTop() + 1;

            if (window_top > 160) {

                $('.header-navigation-wrapper').addClass('menu_fixed animated fadeInDown');
                
            } else {
                $('.header-navigation-wrapper').removeClass('menu_fixed animated fadeInDown');
            }
        });
    })
})(jQuery)