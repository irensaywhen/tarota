(function($) {
    "use strict";

    var tpj = jQuery;
    var revapi24;


    // on ready function
    jQuery(document).ready(function($) {



        // ===== Scroll to Top ==== 
        $(window).scroll(function() {
            if ($(this).scrollTop() >= 100) {
                $('#return-to-top').fadeIn(200);
            } else {
                $('#return-to-top').fadeOut(200);
            }
        });
        $('#return-to-top').on('click', function() {
            $('body,html').animate({
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


        // -------------------------------------------------------------
        // Shuffle
        // -------------------------------------------------------------

        $(window).on('load',function() {

            if ($('#gridWrapper').length > 0) {

                /* initialize shuffle plugin */
                var $grid = $('#gridWrapper');

                $grid.shuffle({
                    itemSelector: '.service-wrapper' // the selector for the items in the grid
                });

                /* reshuffle when user clicks a filter item */
                $('#filter a').on('click', function(e) {
                    e.preventDefault();

                    // set active class
                    $('#filter a').removeClass('active');
                    $(this).addClass('active');

                    // get group name from clicked item
                    var groupName = $(this).attr('data-group');

                    // reshuffle grid
                    $grid.shuffle('shuffle', groupName);


                });
            }
        });
		
    });

})(jQuery);