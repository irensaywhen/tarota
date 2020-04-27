(function($){

    $(window).on('load', function(){

        //Caching

        $schedule = $('.profile_order_form_appointment-schedule');
        $serviceSelect = $('#profile_order_form_service');

        //Timepicker 
        
        $('.profile_order_form_appointment-time').timepicker({
            timeFormat: 'HH:mm',
            interval: 30,
            minTime: '10:00',
            maxTime: '23:30',
            defaultTime: '11',
            startTime: '10:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });

        //Selection of appointment time and date

        $('.profile_order_form-appointment-select').click(function(event){

            $schedule.css({
                display: '-webkit-box',
                display: '-ms-flexbox',
                display: 'flex',
            })
        });

        $('.profile_order_form-appointment-now').click(function(event){

            $schedule.css('display', 'none');
        });

        //Select service

        let selectedService = $serviceSelect.val();

        $('.profile_order_form_service-type').css('display', 'none');

        $('#' + selectedService).css('display', 'block');

        $serviceSelect.change(function(){
            
            $('#' + selectedService).css('display', 'none');

            $('.profile_order_form-appointment-now').click();

            selectedService = $(this).val();

            $('#' + selectedService).css('display', 'block');
        });

        $('#profile_order-now-button').click(function(event){
            event.preventDefault();
            $('html, body').animate({
                scrollTop: $('.profile_order').offset().top
            }, 2000);
        })
    })

    
})(jQuery);